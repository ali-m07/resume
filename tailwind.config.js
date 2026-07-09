/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        navy: {
          900: "#0b1220", // hero deep
          800: "#0f172a",
          700: "#1e293b",
        },
        accent: {
          DEFAULT: "#3b82f6", // primary blue
          600: "#2563eb",
          400: "#60a5fa",
        },
        ink: "#0f172a",       // headings on light
        muted: "#64748b",     // secondary text
        line: "#e2e8f0",      // hairline rules
        canvas: "#f8fafc",    // page background
        card: "#ffffff",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
        hero: "0 20px 60px -20px rgba(2,6,23,0.6)",
      },
    },
  },
  plugins: [],
}
