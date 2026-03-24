<script lang="ts">
export const meta = {
  title: 'WAL Internals: How NumStore Survives a Crash',
  date: '2025-10-12',
}
export const summary = 'A deep dive into NumStore\'s write-ahead log: segment layout, fsync strategies, and how two-phase commit works under the hood.'
</script>

<script lang="ts" setup>
import Ref from '../Ref.vue'
</script>

<template>
  <article class="prose max-w-3xl mx-auto px-6 py-12">
    <h1>{{ meta.title }}</h1>
    <p class="text-gray-500 text-sm">{{ meta.date }}</p>

    <p>
      Every write to NumStore is durable before the caller sees a success response. The mechanism that
      makes this true is the <strong>write-ahead log (WAL)</strong>. This post explains its on-disk
      layout, the fsync strategy, and how two-phase commit is implemented on top of it.
    </p>

    <h2>Segment layout</h2>
    <p>
      The WAL lives in a dedicated subdirectory (<code>wal/</code>) and is broken into fixed-size
      <em>segments</em> (default 64 MiB). Each segment is a flat sequence of frames:
    </p>

    <pre class="bg-gray-900 text-green-300 rounded p-4 overflow-x-auto text-sm"><code>+──────────────────────+
│  Frame header (24 B) │
│    magic   : u32     │
│    type    : u8      │  BEGIN | WRITE | COMMIT | ROLLBACK
│    txn_id  : u64     │
│    payload_len : u32 │
│    checksum : u32    │
+──────────────────────+
│  Payload (variable)  │
+──────────────────────+</code></pre>

    <p>
      The <code>checksum</code> is CRC-32C over the header fields and payload. On recovery, any frame
      with a bad checksum is treated as the end of the written log.
    </p>

    <h2>fsync strategy</h2>
    <p>
      NumStore supports three sync modes, configurable per-database:
    </p>
    <ul>
      <li>
        <strong><code>none</code></strong> — no explicit sync; fastest, but data may be lost on an OS
        crash (power failure). Useful for ephemeral workloads.
      </li>
      <li>
        <strong><code>fdatasync</code></strong> — syncs data pages but not inode metadata. Safe on
        most Linux filesystems; faster than full fsync.
      </li>
      <li>
        <strong><code>fsync</code></strong> (default) — full barrier. Required on macOS and on
        filesystems that reorder writes.
      </li>
    </ul>

    <h2>Two-phase commit</h2>
    <p>
      Explicit transactions in NumStore use a lightweight two-phase commit so that a crash mid-way
      through a commit leaves the database consistent:
    </p>
    <ol>
      <li>
        <strong>Phase 1 (prepare)</strong> — all modified pages are written as <code>WRITE</code>
        frames; a <code>COMMIT_PREPARE</code> frame is appended and the WAL is fsynced.
      </li>
      <li>
        <strong>Phase 2 (apply)</strong> — pages are copied from WAL to the main tree file; a
        <code>COMMIT_DONE</code> frame is appended.
      </li>
    </ol>
    <p>
      On recovery, any transaction with a <code>COMMIT_PREPARE</code> but no <code>COMMIT_DONE</code>
      is re-applied. Any transaction without a <code>COMMIT_PREPARE</code> is rolled back. This
      means recovery is idempotent: running it twice is safe.
    </p>

    <h2>Segment recycling</h2>
    <p>
      Once all transactions in a segment have been applied to the tree and a checkpoint has
      completed, the segment is truncated and recycled for the next batch of writes. The
      checkpointer runs automatically after every 1,000 committed frames, or can be triggered
      manually with <code>db.checkpoint()</code>.
    </p>

    <h2>Further reading</h2>
    <p>
      The design draws heavily from SQLite's WAL mode <Ref id="sqlite-wal" /> and the ARIES
      recovery algorithm <Ref id="mohan92" />. Write-buffering trade-offs are covered in
      Graefe <Ref id="graefe04" />.
    </p>
  </article>
</template>
