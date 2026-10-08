(function () {
    const ACCESS_KEY = "ar_library_authenticated";
    const RETURN_PAGES = new Set([
        "index.html", "library.html", "404.html", "3d-art.html", "ai-art.html",
        "concept-art.html", "costume-fashion-design.html", "daily-essentials.html",
        "development.html", "game-design.html", "games.html", "gun-design-reference.html",
        "history.html", "installation-software.html", "video-film.html",
        "visual-communication.html", "work-tools-collaboration.html"
    ]);

    function resolveReturnTarget(value) {
        if (typeof value !== "string" || !value || /[\s\\\u0000-\u001f\u007f]/.test(value) ||
            value.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(value)) return "index.html";
        try {
            const base = new URL(".", window.location.href);
            const target = new URL(value, base);
            if (target.origin !== base.origin || !target.pathname.startsWith(base.pathname)) return "index.html";
            const page = target.pathname.slice(base.pathname.length);
            if (!RETURN_PAGES.has(page)) return "index.html";
            return target.pathname + target.search + target.hash;
        } catch (error) {
            return "index.html";
        }
    }

    function getReturnTarget() {
        return resolveReturnTarget(new URLSearchParams(window.location.search).get("returnTo"));
    }

    function getTodayKey() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function getStoredAccess() {
        try {
            return JSON.parse(localStorage.getItem(ACCESS_KEY));
        } catch (error) {
            clearAuth();
            return null;
        }
    }

    function hasAccessToday() {
        const accessData = getStoredAccess();
        return Boolean(accessData && accessData.granted === true && accessData.date === getTodayKey());
    }

    function grantAuth() {
        localStorage.setItem(ACCESS_KEY, JSON.stringify({
            granted: true,
            date: getTodayKey()
        }));
    }

    function clearAuth() {
        localStorage.removeItem(ACCESS_KEY);
    }

    function checkAuth() {
        if (hasAccessToday()) return true;
        clearAuth();
        const target = resolveReturnTarget(window.location.pathname + window.location.search + window.location.hash);
        window.location.replace(`password.html?returnTo=${encodeURIComponent(target)}`);
        return false;
    }

    window.ARAuth = { checkAuth, grantAuth, clearAuth, hasAccessToday, getTodayKey, resolveReturnTarget, getReturnTarget };

    document.addEventListener("DOMContentLoaded", () => {
        if (document.body.dataset.auth === "protected") {
            checkAuth();
        }
    });
})();
