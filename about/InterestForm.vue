<!--
  Interest / mailing-list sign-up form.
  Uses FormSubmit.co to deliver submissions to your inbox — no backend needed.

  SETUP:
    1. Replace YOUR_EMAIL_HERE with your real email address in the <form action>.
    2. On the first submission FormSubmit will send you a one-time confirmation email.
    3. After confirming, all future submissions land directly in your inbox.

  Optional FormSubmit fields (hidden inputs) already included:
    _subject  – email subject line
    _next     – redirect URL after submit (set to /about/contact?sent=1)
    _captcha  – set to "false" to disable the default CAPTCHA
-->
<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Stay in the loop</h2>
    <p class="text-gray-700 text-sm">
      Leave your email and we'll reach out when there are new releases, early-access programmes,
      or notable updates.
    </p>

    <form
      action="https://formsubmit.co/YOUR_EMAIL_HERE"
      method="POST"
      class="space-y-3"
    >
      <!-- FormSubmit config -->
      <input type="hidden" name="_subject" value="NumStore — interest sign-up">
      <input type="hidden" name="_next" value="/about/contact?sent=1">
      <input type="hidden" name="_captcha" value="false">
      <!-- Honeypot anti-spam -->
      <input type="text" name="_honey" style="display:none">

      <div class="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          class="border rounded px-3 py-2 text-sm flex-1"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          class="border rounded px-3 py-2 text-sm flex-1"
        />
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Anything you'd like us to know? (optional)"
          rows="3"
          class="w-full border rounded px-3 py-2 text-sm"
        ></textarea>
      </div>

      <button
        type="submit"
        class="bg-gray-900 text-white text-sm px-5 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        Notify me
      </button>
    </form>
  </section>
</template>
