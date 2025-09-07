import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Base colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Glass morphism
        glass: {
          bg: "hsl(var(--glass-bg))",
          border: "hsl(var(--glass-border))",
        },
        
        // Neon colors
        neon: {
          blue: "hsl(var(--neon-blue))",
          purple: "hsl(var(--neon-purple))",
          orange: "hsl(var(--neon-orange))",
          red: "hsl(var(--neon-red))",
        },
        
        // Primary brand colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        
        // Secondary colors
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          glow: "hsl(var(--secondary-glow))",
        },
        
        // Theme variants
        light: {
          bg: "hsl(var(--light-bg))",
          fg: "hsl(var(--light-fg))",
        },
        dark: {
          bg: "hsl(var(--dark-bg))",
          fg: "hsl(var(--dark-fg))",
        },
        gray: {
          bg: "hsl(var(--gray-bg))",
          fg: "hsl(var(--gray-fg))",
        },
        
        // Interactive elements
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },
        
        // Button colors
        button: {
          glass: "hsl(var(--button-glass))",
          "glass-hover": "hsl(var(--button-glass-hover))",
          border: "hsl(var(--button-border))",
        },
        
        // Input colors
        input: {
          DEFAULT: "hsl(var(--input))",
          border: "hsl(var(--input-border))",
          focus: "hsl(var(--input-focus))",
        },
      },
      
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-neon': 'var(--gradient-neon)',
        'gradient-orange': 'var(--gradient-orange)',
        'gradient-glow': 'var(--gradient-glow)',
      },
      
      boxShadow: {
        'neon': 'var(--shadow-neon)',
        'purple': 'var(--shadow-purple)',
        'glass': 'var(--shadow-glass)',
        'glow-intense': 'var(--glow-intense)',
      },
      
      fontFamily: {
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        glass: "var(--radius-glass)",
      },
      
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "floating": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "var(--shadow-neon)" },
          "50%": { boxShadow: "var(--glow-intense)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "blur-to-clear": {
          from: { filter: "blur(10px)", opacity: "0" },
          to: { filter: "blur(0px)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "floating": "floating 6s ease-in-out infinite",
        "floating-delayed": "floating 6s ease-in-out infinite 2s",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "blur-to-clear": "blur-to-clear 0.8s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
