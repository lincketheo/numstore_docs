<script lang="ts" setup>
export const meta = {
  title: 'Python Bindings: Design Choices and Pitfalls',
  date: '2025-09-20',
}
export const summary = 'Why we chose ctypes over Cython, how we manage the GIL, and a walkthrough of the Python API surface.'
</script>

<template>
  <article class="prose max-w-3xl mx-auto px-6 py-12">
    <h1>{{ meta.title }}</h1>
    <p class="text-gray-500 text-sm">{{ meta.date }}</p>

    <p>
      When we sat down to write Python bindings for NumStore, the first decision was how to bridge C
      and Python. The usual suspects are Cython, CFFI, and ctypes. We picked <strong>ctypes</strong>
      because it ships with the standard library (zero extra build dependencies), and our ABI surface
      is stable enough that we don't need generated header parsing.
    </p>

    <h2>Why not Cython?</h2>
    <p>
      Cython produces fast code, but it adds a compilation step that complicates packaging. NumStore
      already ships pre-built shared libraries for each platform; adding a Cython compilation step
      during <code>pip install</code> would mean bundling a C compiler or distributing additional
      wheels. ctypes lets us ship a single pure-Python package that loads the platform library at
      import time.
    </p>

    <h2>The GIL</h2>
    <p>
      NumStore's C core is thread-safe internally. Most ctypes calls release the GIL automatically
      because ctypes marks foreign function calls as <code>CDECL</code> / <code>WINAPI</code> and
      CPython drops the GIL before invoking them. The one exception is our iterator protocol: we hold
      a cursor open across multiple Python calls, so we use a <code>threading.Lock</code> on the
      Python side to serialize access.
    </p>

    <h2>API walkthrough</h2>
    <p>Here is the minimal open/put/get/close cycle:</p>

    <pre class="bg-gray-900 text-green-300 rounded p-4 overflow-x-auto text-sm"><code>import numstore

db = numstore.open("mydb", cache_pages=512)
db.put(1, {"x": 3.14, "label": "pi"})
record = db.get(1)   # {"x": 3.14, "label": "pi"}
db.close()</code></pre>

    <p>
      The <code>value</code> argument is serialised to MessagePack before being handed to C, so any
      JSON-compatible Python dict will round-trip cleanly. Custom types require a codec registered
      with <code>numstore.register_codec()</code>.
    </p>

    <h2>Error handling</h2>
    <p>
      C errors map to a small exception hierarchy rooted at <code>numstore.NumStoreError</code>.
      The subclasses mirror the C error codes:
    </p>
    <ul>
      <li><code>NotFoundError</code> — key absent on <code>get()</code></li>
      <li><code>CorruptionError</code> — page checksum mismatch</li>
      <li><code>LockError</code> — another process holds the write lock</li>
      <li><code>IOError</code> — underlying OS I/O failure</li>
    </ul>

    <h2>What's next</h2>
    <p>
      We're evaluating <strong>CFFI</strong> for an async-friendly variant that cooperates better
      with <code>asyncio</code>. Watch this blog for updates.
    </p>
  </article>
</template>
