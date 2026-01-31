type Theme = "light" | "dark" | "system";

export const setTheme = (theme: Theme) => {
  switch (theme) {
    case "light":
    case "dark":
      localStorage.theme = theme;
      break;
    case "system":
      localStorage.removeItem("theme");
  }

  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
};
