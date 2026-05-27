import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom palette sesuai DESIGN.md
        // Background
        "bg-warm": "#FBFBFA",
        
        // Primary (Sage Green Tua)
        "primary": "#4A6B5D",
        "primary-light": "#E8EFE9",
        
        // Text
        "text-dark": "#2D312E",
        "text-muted": "#717672",
        
        // Indicators
        "positive": "#3B7A57", // Hijau Daun
        "negative": "#C86B55", // Terracotta
        
        // Borders
        "border-light": "#E8E8E8",
      },
      backgroundColor: {
        "page": "#FBFBFA",
        "card": "#FFFFFF",
        "accent": "#4A6B5D",
        "accent-light": "#E8EFE9",
      },
      textColor: {
        "primary": "#2D312E",
        "secondary": "#717672",
        "success": "#3B7A57",
        "danger": "#C86B55",
      },
      borderColor: {
        "default": "#E8E8E8",
      },
      spacing: {
        "xs": "4px",
        "sm": "8px",
        "md": "12px",
        "lg": "16px",
        "xl": "24px",
        "2xl": "32px",
      },
      fontSize: {
        "xs": ["12px", { lineHeight: "16px" }],
        "sm": ["14px", { lineHeight: "20px" }],
        "base": ["16px", { lineHeight: "24px" }],
        "lg": ["18px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["32px", { lineHeight: "40px" }],
      },
      fontWeight: {
        "normal": "400",
        "medium": "500",
        "semibold": "600",
        "bold": "700",
      },
      borderRadius: {
        "md": "6px",
        "lg": "8px",
        "xl": "12px",
      },
      boxShadow: {
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      },
      maxWidth: {
        "container": "1280px",
      },
      minHeight: {
        "touch": "44px", // Minimum touch target size
      },
    },
  },
  plugins: [],
};

export default config;
