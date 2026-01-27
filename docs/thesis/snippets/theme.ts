type Theme = "light" | "dark" | "system";

export const setTheme = (theme: Theme) => {
  localStorage.theme = theme;
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
};
