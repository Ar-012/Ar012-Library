(function () {
    const ACCESS_KEY = "ar_library_authenticated";

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
        window.location.href = "password.html";
        return false;
    }

    window.ARAuth = { checkAuth, grantAuth, clearAuth, hasAccessToday, getTodayKey };

    document.addEventListener("DOMContentLoaded", () => {
        if (document.body.dataset.auth === "protected") {
            checkAuth();
        }
    });
})();
