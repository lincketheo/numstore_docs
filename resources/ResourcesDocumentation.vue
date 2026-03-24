<template>
  <main class="max-w-3xl mx-auto px-6 py-12 space-y-12">

    <section class="space-y-3">
      <h1 class="text-3xl font-bold">Documentation</h1>
      <p class="text-gray-700">
        NumStore is a numeric-first embedded database built for systems workloads. It exposes a simple
        key/value interface over an R+ tree core <Ref id="sellis87" /> and ships with a write-ahead
        log <Ref id="sqlite-wal" />, Python bindings, and Java bindings.
      </p>
    </section>

    <!-- Installation -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold border-b pb-2">Installation</h2>

      <h3 class="text-lg font-medium">Python</h3>
      <pre class="bg-gray-900 text-green-300 rounded p-4 overflow-x-auto text-sm"><code>pip install numstore</code></pre>

      <h3 class="text-lg font-medium">Java (Maven)</h3>
      <pre class="bg-gray-900 text-green-300 rounded p-4 overflow-x-auto text-sm"><code>&lt;dependency&gt;
  &lt;groupId&gt;dev.numstore&lt;/groupId&gt;
  &lt;artifactId&gt;numstore-jvm&lt;/artifactId&gt;
  &lt;version&gt;1.0.0&lt;/version&gt;
&lt;/dependency&gt;</code></pre>

      <h3 class="text-lg font-medium">From source</h3>
      <pre class="bg-gray-900 text-green-300 rounded p-4 overflow-x-auto text-sm"><code>git clone https://github.com/yourorg/numstore.git
cd numstore
make && make install</code></pre>
    </section>

    <!-- Quick Start -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold border-b pb-2">Quick Start</h2>

      <h3 class="text-lg font-medium">Python</h3>
      <pre class="bg-gray-900 text-green-300 rounded p-4 overflow-x-auto text-sm"><code>import numstore

db = numstore.open("mydb")

# Insert a record
db.put(key=42, value={"sensor": "temp", "reading": 98.6})

# Point lookup
record = db.get(42)
print(record)  # {"sensor": "temp", "reading": 98.6}

# Range scan
for rec in db.range(10, 50):
    print(rec)

db.close()</code></pre>

      <h3 class="text-lg font-medium">Java</h3>
      <pre class="bg-gray-900 text-green-300 rounded p-4 overflow-x-auto text-sm"><code>import dev.numstore.DB;
import dev.numstore.Record;

try (DB db = DB.open("mydb")) {
    db.put(42L, Map.of("sensor", "temp", "reading", 98.6));

    Record r = db.get(42L);
    System.out.println(r);

    db.range(10L, 50L).forEach(System.out::println);
}</code></pre>
    </section>

    <!-- Configuration -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold border-b pb-2">Configuration</h2>
      <p class="text-gray-700">
        NumStore is configured via a <code class="bg-gray-100 px-1 rounded">numstore.toml</code> file placed in the
        database directory, or by passing options at open time.
      </p>
      <pre class="bg-gray-900 text-green-300 rounded p-4 overflow-x-auto text-sm"><code># numstore.toml

[storage]
page_size     = 4096     # bytes; must be a power of two
cache_pages   = 1024     # number of pages to hold in memory

[wal]
sync_mode     = "fsync"  # "none" | "fdatasync" | "fsync"
segment_bytes = 67108864 # 64 MiB per WAL segment

[tree]
max_fanout    = 128      # maximum children per internal node
fill_factor   = 0.75     # target fill ratio on splits</code></pre>

      <p class="text-gray-700 text-sm">
        Options passed programmatically override the config file.
      </p>
    </section>

    <!-- Write-Ahead Log -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold border-b pb-2">Transactions &amp; WAL</h2>
      <p class="text-gray-700">
        Every write goes through the write-ahead log <Ref id="mohan92" /> before being applied to the
        tree. NumStore supports explicit transactions with two-phase commit semantics.
      </p>
      <pre class="bg-gray-900 text-green-300 rounded p-4 overflow-x-auto text-sm"><code>import numstore

db = numstore.open("mydb")

with db.transaction() as txn:
    txn.put(1, {"value": 100})
    txn.put(2, {"value": 200})
    txn.delete(99)
    # commits on __exit__; rolls back on exception

db.close()</code></pre>
    </section>

    <!-- API Reference -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold border-b pb-2">API Reference</h2>

      <div class="space-y-6">
        <div class="space-y-1">
          <code class="text-base font-bold bg-gray-100 px-2 py-1 rounded">DB.open(path, **options) → DB</code>
          <p class="text-gray-700 text-sm pl-2">
            Open or create a database at <em>path</em>. Options override any values in
            <code>numstore.toml</code>.
          </p>
        </div>

        <div class="space-y-1">
          <code class="text-base font-bold bg-gray-100 px-2 py-1 rounded">db.put(key: int, value: dict)</code>
          <p class="text-gray-700 text-sm pl-2">
            Insert or replace the record at <em>key</em>. Keys must be non-negative integers.
          </p>
        </div>

        <div class="space-y-1">
          <code class="text-base font-bold bg-gray-100 px-2 py-1 rounded">db.get(key: int) → dict | None</code>
          <p class="text-gray-700 text-sm pl-2">
            Retrieve the record at <em>key</em>, or <code>None</code> if absent.
          </p>
        </div>

        <div class="space-y-1">
          <code class="text-base font-bold bg-gray-100 px-2 py-1 rounded">db.delete(key: int)</code>
          <p class="text-gray-700 text-sm pl-2">
            Remove the record at <em>key</em>. No-op if the key does not exist.
          </p>
        </div>

        <div class="space-y-1">
          <code class="text-base font-bold bg-gray-100 px-2 py-1 rounded">db.range(lo: int, hi: int) → Iterator[dict]</code>
          <p class="text-gray-700 text-sm pl-2">
            Iterate all records with keys in <code>[lo, hi]</code>, in ascending key order.
          </p>
        </div>

        <div class="space-y-1">
          <code class="text-base font-bold bg-gray-100 px-2 py-1 rounded">db.transaction() → Txn</code>
          <p class="text-gray-700 text-sm pl-2">
            Begin an explicit transaction. Use as a context manager; commits on exit, rolls back on
            exception.
          </p>
        </div>

        <div class="space-y-1">
          <code class="text-base font-bold bg-gray-100 px-2 py-1 rounded">db.close()</code>
          <p class="text-gray-700 text-sm pl-2">
            Flush pending writes, sync the WAL, and release all file locks.
          </p>
        </div>
      </div>
    </section>

    <!-- Further reading -->
    <section class="space-y-2">
      <h2 class="text-2xl font-semibold border-b pb-2">Further Reading</h2>
      <ul class="list-disc pl-6 space-y-1 text-gray-700">
        <li><RouterLink class="underline" to="/resources/references">References</RouterLink> — academic papers and prior art behind NumStore's design</li>
        <li><RouterLink class="underline" to="/resources/blog">Blog</RouterLink> — release notes, performance deep-dives, and internals posts</li>
        <li><RouterLink class="underline" to="/downloads/current">Downloads</RouterLink> — latest release tarballs and checksums</li>
      </ul>
    </section>

  </main>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import Ref from './Ref.vue'
</script>
