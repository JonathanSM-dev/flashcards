/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(214.3 31.8% 91.4%)",
        input: "hsl(214.3 31.8% 91.4%)",
        ring: "hsl(215 20.2% 65.1%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 47.4% 11.2%)",
        primary: {
          DEFAULT: "hsl(222.2 47.4% 11.2%)",
          foreground: "hsl(210 40% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(210 40% 96.1%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        dark: {
          background: "#121212",    // Fundo principal 
          surface: "#1E1E1E",       // Superfícies elevadas
          card: "#2D2D2D",          // Cartões
          primary: "#BB86FC",       // Botões e elementos principais
          secondary: "#03DAC5",     // Elementos secundários
          accent: "#CF6679",        // Destaques
          text: {
            primary: "#E1E1E1",     // Texto principal
            secondary: "#AAAAAA",   // Texto secundário
            muted: "#777777"        // Texto atenuado
          },
          border: "#333333"         // Bordas
        }
      },
    },
  },
  plugins: [],
}