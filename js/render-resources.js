(function () {
    let activeRoot = null;
    let activeSections = [];
    let activeColumnCount = 0;
    let resizeTimer = null;

    function makeIcon(resource) {
        if (resource.iconImage) {
            const image = document.createElement("img");
            image.className = "icon";
            image.src = resource.iconImage;
            image.alt = resource.alt || resource.name || "";
            return image;
        }

        const icon = document.createElement("i");
        icon.className = resource.icon || "fas fa-link";
        return icon;
    }

    function createResource(resource) {
        const element = document.createElement(resource.url ? "a" : "div");
        element.className = "resource-link";

        if (resource.url) {
            element.href = resource.url;
            if (/^https?:\/\//.test(resource.url)) {
                element.target = "_blank";
                element.rel = "noopener noreferrer";
            }
        }

        element.appendChild(makeIcon(resource));

        const content = document.createElement("div");
        content.className = "resource-content";

        const title = document.createElement("div");
        title.className = "resource-title";
        title.textContent = resource.name;
        content.appendChild(title);

        const description = document.createElement("div");
        description.className = "resource-description";
        description.textContent = resource.description || "";
        content.appendChild(description);

        element.appendChild(content);
        return element;
    }

    function createSection(section) {
        const card = document.createElement("div");
        card.className = "section-card";

        const title = document.createElement("h2");
        title.className = "section-title";
        if (section.icon) {
            const icon = document.createElement("i");
            icon.className = section.icon;
            title.appendChild(icon);
            title.appendChild(document.createTextNode(" "));
        }
        title.appendChild(document.createTextNode(section.title));
        card.appendChild(title);

        const group = document.createElement("div");
        group.className = "link-group";
        (section.resources || []).forEach((resource) => group.appendChild(createResource(resource)));
        card.appendChild(group);
        return card;
    }

    function getColumnCount(root) {
        const count = Number.parseInt(getComputedStyle(root).getPropertyValue("--resource-column-count"), 10);
        return Number.isFinite(count) && count > 0 ? count : 1;
    }

    function getShortestColumn(columns) {
        return columns.reduce((shortest, column) => (column.scrollHeight < shortest.scrollHeight ? column : shortest));
    }

    function renderSectionColumns(root, sections) {
        const columnCount = Math.min(getColumnCount(root), Math.max(sections.length, 1));
        activeColumnCount = columnCount;
        root.innerHTML = "";

        const columns = Array.from({ length: columnCount }, () => {
            const column = document.createElement("div");
            column.className = "content-section";
            root.appendChild(column);
            return column;
        });

        sections.forEach((section, index) => {
            const card = createSection(section);
            const column = index < columnCount ? columns[index] : getShortestColumn(columns);
            column.appendChild(card);
        });
    }

    function renderPageMeta(pageKey) {
        const meta = window.AR_PAGES && window.AR_PAGES[pageKey];
        if (!meta) return;

        document.title = `${meta.title} | AR Library`;
        const title = document.getElementById("page-title");
        const subtitle = document.getElementById("page-subtitle");
        const breadcrumb = document.getElementById("breadcrumb");
        const footer = document.getElementById("page-footer");
        const favicon = document.getElementById("favicon");

        if (title) title.textContent = meta.title;
        if (subtitle) subtitle.textContent = meta.subtitle || "";
        if (breadcrumb) breadcrumb.innerHTML = `<a href="index.html">首页</a> / <span>${meta.breadcrumb || meta.title}</span>`;
        if (footer) footer.textContent = meta.footer || "AR Library";
        if (favicon && meta.favicon) {
            favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${meta.favicon}</text></svg>`;
        }
    }

    function renderResources() {
        const root = document.getElementById("resource-root");
        if (!root) return;

        const pageKey = document.body.dataset.page;
        renderPageMeta(pageKey);

        try {
            if (!Array.isArray(window.AR_RESOURCE_SECTIONS)) {
                throw new Error("AR_RESOURCE_SECTIONS is missing or invalid.");
            }
            activeRoot = root;
            activeSections = window.AR_RESOURCE_SECTIONS;
            renderSectionColumns(root, activeSections);
        } catch (error) {
            console.error("Resource render failed:", error);
            root.innerHTML = '<div class="section-card"><h2 class="section-title"><i class="fas fa-exclamation-circle"></i> 资源加载失败</h2><div class="link-group"><div class="link-subtitle">请检查当前页面的数据文件。</div></div></div>';
        }
    }

    document.addEventListener("DOMContentLoaded", renderResources);
    window.addEventListener("resize", () => {
        if (!activeRoot || !activeSections.length) return;
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
            if (getColumnCount(activeRoot) !== activeColumnCount) {
                renderSectionColumns(activeRoot, activeSections);
            }
        }, 120);
    });
})();
