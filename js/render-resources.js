(function () {
    let activeRoot = null;
    let activeSections = [];
    let disclosureId = 0;

    function fontIcon(className) {
        const icon = document.createElement("i");
        icon.className = className;
        icon.setAttribute("aria-hidden", "true");
        return icon;
    }

    function iconFallback(slot) {
        slot.replaceChildren(fontIcon("fas fa-link"));
        slot.dataset.fallback = "true";
    }

    function validateIcons() {
        document.querySelectorAll(".resource-icon-slot > i").forEach(icon => {
            const content = getComputedStyle(icon, "::before").content;
            if (["none", "normal", "", '\"\"', "''"].includes(content) && !icon.parentElement.dataset.fallback) {
                iconFallback(icon.parentElement);
            }
        });
    }

    function queueIconValidation() {
        requestAnimationFrame(validateIcons);
    }

    function makeIcon(resource) {
        const slot = document.createElement("span");
        slot.className = "resource-icon-slot";
        slot.setAttribute("aria-hidden", "true");
        if (resource.iconImage) {
            const image = document.createElement("img");
            image.className = "icon";
            image.alt = resource.alt || resource.name || "";
            image.addEventListener("error", () => iconFallback(slot), { once: true });
            image.src = resource.iconImage;
            slot.appendChild(image);
        } else {
            slot.appendChild(fontIcon(resource.icon || "fas fa-link"));
        }
        return slot;
    }

    function createResource(resource) {
        const element = document.createElement(resource.url ? "a" : "div");
        element.className = "resource-link";
        element.dataset.resourceId = resource.id;

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
        if (resource.name.length > 16) title.title = resource.name;
        content.appendChild(title);

        const description = document.createElement("div");
        description.className = "resource-description";
        description.textContent = resource.description || "";
        if (description.textContent.length > 24) description.title = description.textContent;
        content.appendChild(description);

        element.appendChild(content);
        if (!resource.url) {
            const missing = document.createElement("span");
            missing.className = "resource-description";
            missing.textContent = "（暂未记录链接）";
            content.appendChild(missing);
        }
        const extraLinks = (resource.links || []).filter(link => link.url !== resource.url);
        const catalog = new Map((window.AR_CATALOG || []).map(item => [item.id, item]));
        const related = (resource.relatedResources || []).map(id => catalog.get(id)).filter(Boolean);
        if (!extraLinks.length && !(resource.reviewNotes || []).length && !related.length) return element;
        const wrapper = document.createElement("div");
        wrapper.className = "resource-entry";
        wrapper.appendChild(element);
        if (related.length) {
            wrapper.classList.add("resource-with-related");
            const row = document.createElement("div");
            row.className = "resource-main-row";
            row.appendChild(element);
            const button = document.createElement("button");
            button.type = "button";
            button.className = "resource-disclosure";
            button.textContent = "⌄";
            button.setAttribute("aria-expanded", "false");
            button.setAttribute("aria-label", `展开 ${resource.name} 的相关资源`);
            const panel = document.createElement("div");
            panel.id = `related-resources-${++disclosureId}`;
            panel.className = "related-resources";
            panel.hidden = true;
            button.setAttribute("aria-controls", panel.id);
            const heading = document.createElement("p");
            heading.className = "related-resources-title";
            heading.textContent = "相关资源";
            panel.appendChild(heading);
            const list = document.createElement("ul");
            related.forEach(item => {
                const li = document.createElement("li");
                const entry = document.createElement(item.url ? "a" : "span");
                entry.textContent = item.name;
                entry.dataset.relatedResourceId = item.id;
                if (item.url) {
                    entry.href = item.url;
                    entry.target = "_blank";
                    entry.rel = "noopener noreferrer";
                }
                li.appendChild(entry);
                list.appendChild(li);
            });
            panel.appendChild(list);
            button.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();
                const expanded = button.getAttribute("aria-expanded") !== "true";
                button.setAttribute("aria-expanded", String(expanded));
                button.setAttribute("aria-label", `${expanded ? "收起" : "展开"} ${resource.name} 的相关资源`);
                panel.hidden = !expanded;
            });
            row.appendChild(button);
            wrapper.append(row, panel);
        }
        extraLinks.forEach(item => {
            const link = document.createElement("a");
            link.className = "resource-alternate";
            link.href = item.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = `${item.label} · 其他原始入口`;
            wrapper.appendChild(link);
        });
        (resource.reviewNotes || []).forEach(note => {
            const text = document.createElement("p");
            text.className = "resource-review";
            text.textContent = note;
            wrapper.appendChild(text);
        });
        return wrapper;
    }

    function createSection(section) {
        const card = document.createElement("section");
        card.className = "section-card";
        if (section.id) card.id = section.id;

        const title = document.createElement(section.headingTag || "h2");
        title.className = "section-title";
        if (section.icon) {
            const icon = document.createElement("i");
            icon.className = section.icon;
            title.appendChild(icon);
            title.appendChild(document.createTextNode(" "));
        }
        if (section.href) {
            const link = document.createElement("a");
            link.href = section.href;
            link.textContent = section.title;
            title.appendChild(link);
        } else {
            title.appendChild(document.createTextNode(section.title));
        }
        const count = document.createElement("span");
        count.className = "section-count";
        count.textContent = ` · ${(section.resources || []).length}`;
        title.appendChild(count);
        card.appendChild(title);

        const group = document.createElement("div");
        group.className = "link-group";
        (section.resources || []).forEach((resource) => group.appendChild(createResource(resource)));
        card.appendChild(group);
        return card;
    }

    function renderSectionColumns(root, sections) {
        // Sections keep their source order; CSS grids only the resources inside each section.
        root.replaceChildren(...sections.map(createSection));
    }

    // Only views with explicit domains use this presentation; other views retain their layout.
    function renderDomain(scrollToHash = false) {
        const domains = window.AR_RESOURCE_DOMAINS;
        const hash = window.location.hash.slice(1);
        const targetId = (window.AR_SECTION_ALIASES || {})[hash] || hash;
        const domain = domains.find(item => item.id === targetId || item.groups.some(group =>
            group.id === targetId || group.sectionIds.includes(targetId))) || domains[0];
        activeRoot.classList.add("domain-content");
        activeRoot.replaceChildren();
        activeRoot.style.gridTemplateColumns = "none";
        const heading = document.createElement("h2");
        heading.id = domain.id;
        heading.className = "domain-heading";
        heading.textContent = domain.title;
        const domainIds = new Set(domain.groups.flatMap(group => group.sectionIds));
        const count = activeSections.filter(section => domainIds.has(section.id))
            .reduce((total, section) => total + section.resources.length, 0);
        const notice = document.getElementById("catalog-notice");
        if (notice) notice.textContent = `共 ${activeSections.reduce((total, section) => total + section.resources.length, 0)} 项资源 · ${domain.title} ${count} 项`;
        activeRoot.appendChild(heading);
        domain.groups.forEach(group => {
            const panel = document.createElement("section");
            panel.id = group.id;
            panel.className = "domain-group";
            if (group.title) {
                const title = document.createElement("h3");
                title.className = "domain-heading";
                title.textContent = group.title;
                panel.appendChild(title);
            }
            const sections = group.sectionIds.map(id => activeSections.find(section => section.id === id));
            const grid = document.createElement("div");
            grid.className = "right-panel";
            panel.appendChild(grid);
            activeRoot.appendChild(panel);
            renderSectionColumns(grid, sections.map(section => ({
                ...section, headingTag: group.title ? "h4" : "h3"
            })));
        });
        queueIconValidation();
        // Normalize old section bookmarks to a surviving section without adding a history entry.
        if (targetId !== hash) history.replaceState(null, "", `#${targetId}`);
        const targetGroup = domain.groups.find(group => group.id === targetId || group.sectionIds.includes(targetId));
        document.dispatchEvent(new CustomEvent("ar:domain-rendered", { detail: {
            domainId: domain.id,
            groupId: targetGroup ? targetGroup.id : null,
            sectionId: targetGroup && targetGroup.sectionIds.includes(targetId) ? targetId : null,
            targetId
        } }));
        if (scrollToHash && targetId && !domains.some(item => item.id === targetId)) {
            const target = document.getElementById(targetId);
            if (target) target.scrollIntoView();
        }
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
            if (window.AR_RESOURCE_DOMAINS) {
                document.getElementById("section-index")?.remove();
                renderDomain(true);
                return;
            }
            renderSectionColumns(root, activeSections);
            queueIconValidation();
            if (window.location.hash) {
                const target = document.getElementById(window.location.hash.slice(1));
                if (target) target.scrollIntoView();
            }
        } catch (error) {
            console.error("Resource render failed:", error);
            root.innerHTML = '<div class="section-card"><h2 class="section-title"><i class="fas fa-exclamation-circle"></i> 资源加载失败</h2><div class="link-group"><div class="link-subtitle">请检查当前页面的数据文件。</div></div></div>';
        }
    }

    // Art navigation reuses the renderer's hash/alias resolution, without native anchor scrolling.
    document.addEventListener("click", event => {
        if (!activeRoot || !window.AR_RESOURCE_DOMAINS || event.defaultPrevented ||
            event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target.closest("#library-sidebar .navigation-art-target, #section-index a");
        if (!link) return;
        const targetId = link.hash.slice(1);
        if (!window.AR_RESOURCE_DOMAINS.some(domain => domain.id === targetId ||
            domain.groups.some(group => group.id === targetId || group.sectionIds.includes(targetId)))) return;
        event.preventDefault();
        if (window.location.hash !== link.hash) history.pushState(null, "", link.hash);
        renderDomain(true);
    });
    window.addEventListener("popstate", () => {
        if (activeRoot && window.AR_RESOURCE_DOMAINS) renderDomain(true);
    });

    window.addEventListener("load", queueIconValidation);
    if (document.fonts) document.fonts.ready.then(queueIconValidation);
    document.addEventListener("DOMContentLoaded", renderResources);
    window.addEventListener("hashchange", () => {
        if (activeRoot && window.AR_RESOURCE_DOMAINS) renderDomain(true);
    });
})();
