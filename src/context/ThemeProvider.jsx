// src/context/ThemeProvider.jsx
'use client'
import useStore from "@/store/useStore";
import { useEffect } from "react";


const ThemeProvider = ({ children }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return children;
};

export default ThemeProvider;
