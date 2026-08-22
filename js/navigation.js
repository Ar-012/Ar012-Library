(function () {
    function createLink(item, currentPage) {
        const link = document.createElement("a");
        link.href = item.href;
        link.className = "sidebar-link";
        if (item.href === currentPage) link.classList.add("active");

        if (item.icon) {
            const icon = document.createElement("i");
            icon.className = item.icon;
            link.appendChild(icon);
        }

        link.appendChild(document.createTextNode(item.label));
        return link;
    }

    function renderNavigation() {
        const mount = document.getElementById("sidebar");
        if (!mount || !window.AR_NAVIGATION) return;

        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const sidebar = document.createElement("div");
        sidebar.className = "sidebar";

        const logoArea = document.createElement("div");
        logoArea.className = "logo-area";
        logoArea.innerHTML = '<h1><a href="index.html" class="logo-link"><i class="fas fa-book"></i> AR Library</a></h1>';
        sidebar.appendChild(logoArea);

        window.AR_NAVIGATION.forEach((section, index) => {
            if (index > 0) {
                const divider = document.createElement("div");
                divider.className = "section-divider";
                sidebar.appendChild(divider);
            }

            const sectionEl = document.createElement("div");
            sectionEl.className = "sidebar-section";

            const header = document.createElement("h3");
            header.className = "section-header muted";
            header.textContent = section.label;
            sectionEl.appendChild(header);

            const content = document.createElement("div");
            content.className = "section-content";
            section.items.forEach((item) => content.appendChild(createLink(item, currentPage)));
            sectionEl.appendChild(content);
            sidebar.appendChild(sectionEl);
        });

        const footer = document.createElement("div");
        footer.className = "sidebar-footer";
        footer.innerHTML = '<p class="update-info"><i class="fas fa-code"></i> 个人使用</p><p class="copyright">© AR Library</p>';
        sidebar.appendChild(footer);

        mount.replaceWith(sidebar);
    }

    document.addEventListener("DOMContentLoaded", renderNavigation);
})();
