// Import the styles so Vite processes them
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app');
  
  if (app) {
    app.innerHTML = `
      <div class="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
        <div class="max-w-md w-full bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700 text-center">
          <h1 class="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Vite + TS + Tailwind
          </h1>
          <p class="text-slate-400 mb-6">
            A lightweight, high-performance boilerplate for static websites.
          </p>
          <button id="counter-btn" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all rounded-lg font-medium shadow-lg shadow-blue-500/20">
            Clicks: <span id="counter-val">0</span>
          </button>
        </div>
      </div>
    `;

    // Simple interactive logic
    setupCounter();
  }
});

function setupCounter() {
  const button = document.querySelector<HTMLButtonElement>('#counter-btn');
  const counterVal = document.querySelector<HTMLSpanElement>('#counter-val');
  let count = 0;

  if (button && counterVal) {
    button.addEventListener('click', () => {
      count++;
      counterVal.textContent = count.toString();
    });
  }
}
