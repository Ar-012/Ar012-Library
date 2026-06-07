(function () {
    const STORAGE_KEY = "ar_library_skin";
    const DEFAULT_THEME = "obsidian";
    const AVAILABLE_THEMES = new Set([DEFAULT_THEME]);

    function setTheme(theme) {
        const selectedTheme = AVAILABLE_THEMES.has(theme) ? theme : DEFAULT_THEME;

        document.body.dataset.arcTheme = selectedTheme;
        localStorage.setItem(STORAGE_KEY, selectedTheme);

        document.querySelectorAll(".skin-button").forEach((button) => {
            const isActive = button.dataset.arcTheme === selectedTheme;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;

        document.querySelectorAll(".skin-button").forEach((button) => {
            button.addEventListener("click", () => setTheme(button.dataset.arcTheme));
        });

        setTheme(savedTheme);
    });
})();
