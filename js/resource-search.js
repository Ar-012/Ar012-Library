/* Search the current catalog; placements are derived from the current navigation. */
(function () {
    function placementsFor(views, navigation) {
        const placements = new Map();
        Object.entries(views).forEach(([key, view]) => {
            const area = navigation.find(item => item.id === view.area);
            view.sections.forEach(section => {
                const domain = (view.domains || []).find(item => item.groups.some(group => group.sectionIds.includes(section.id)));
                const group = domain && domain.groups.find(item => item.sectionIds.includes(section.id));
                const path = [area && area.label, view.title, domain && domain.title, group && group.title, section.title]
                    .filter(Boolean).filter((label, index, labels) => label !== labels[index - 1]).join(' → ');
                const href = `library.html?view=${encodeURIComponent(key)}#${encodeURIComponent(section.id)}`;
                section.resourceIds.forEach(id => {
                    if (!placements.has(id)) placements.set(id, []);
                    if (!placements.get(id).some(item => item.href === href)) placements.get(id).push({ path, href });
                });
            });
        });
        return placements;
    }

    function matchResources(catalog, input) {
        const query = input.trim().toLowerCase();
        if (!query) return [];
        const seen = new Set();
        return catalog.flatMap((resource, index) => {
            if (seen.has(resource.id)) return [];
            seen.add(resource.id);
            const name = resource.name.toLowerCase();
            const previousTitle = (resource.previousTitles || []).find(title => title.toLowerCase().includes(query));
            const rank = name === query ? 0 : name.startsWith(query) ? 1 : name.includes(query) ? 2 :
                previousTitle ? 3 : (resource.description || '').toLowerCase().includes(query) ? 4 : -1;
            return rank < 0 ? [] : [{ resource, rank, index, previousTitle: rank === 3 ? previousTitle : null }];
        }).sort((a, b) => a.rank - b.rank || a.index - b.index);
    }

    window.ARResourceSearch = { placementsFor, matchResources };
    if (document.body.dataset.auth !== 'protected' || !window.ARAuth.hasAccessToday()) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'resource-search-trigger';
    button.textContent = '搜索资源…';
    button.setAttribute('aria-haspopup', 'dialog');
    const desktop = window.matchMedia('(min-width: 1200px)');
    function placeTrigger() {
        const slot = document.getElementById(desktop.matches ? 'navigation-search-slot' : 'toolbar-search-slot');
        slot.append(button);
    }
    desktop.addEventListener('change', placeTrigger);
    placeTrigger();

    const dialog = document.createElement('dialog');
    dialog.className = 'resource-search-dialog';
    dialog.setAttribute('aria-labelledby', 'resource-search-heading');
    dialog.setAttribute('aria-modal', 'true');
    const header = document.createElement('div');
    header.className = 'resource-search-header';
    const heading = document.createElement('h2');
    heading.id = 'resource-search-heading';
    heading.textContent = '搜索资源';
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = '关闭';
    close.addEventListener('click', () => dialog.close());
    header.append(heading, close);
    const input = document.createElement('input');
    input.type = 'search';
    input.placeholder = '搜索资源…';
    input.setAttribute('aria-label', '资源名称或用途');
    input.autocomplete = 'off';
    input.addEventListener('keydown', event => {
        if (event.key === 'Enter') event.preventDefault();
    });
    const status = document.createElement('p');
    status.className = 'resource-search-status';
    status.setAttribute('role', 'status');
    const results = document.createElement('ul');
    results.className = 'resource-search-results';
    dialog.append(header, input, status, results);
    document.body.append(dialog);
    const placements = placementsFor(window.AR_VIEWS, window.AR_NAVIGATION);
    let loading;
    function render() {
        results.replaceChildren();
        results.scrollTop = 0;
        if (!input.value.trim()) {
            status.textContent = '输入名称或用途搜索资源';
            return;
        }
        if (!window.AR_CATALOG) {
            status.textContent = '正在加载资源…';
            return;
        }
        const matches = matchResources(window.AR_CATALOG, input.value);
        status.textContent = matches.length ? `找到 ${matches.length} 个资源` : '没有找到匹配的资源，尝试更短的关键词';
        matches.forEach(({ resource, previousTitle }) => {
            const item = document.createElement('li');
            item.dataset.resourceId = resource.id;
            const name = document.createElement(resource.url ? 'a' : 'span');
            name.className = 'resource-search-name';
            name.textContent = resource.name;
            if (resource.url) {
                name.href = resource.url;
                name.target = '_blank';
                name.rel = 'noopener noreferrer';
            }
            item.append(name);
            if (!resource.url) {
                const state = document.createElement('span');
                state.className = 'resource-search-note';
                state.textContent = ' · 暂无链接';
                item.append(state);
            }
            const description = document.createElement('p');
            description.textContent = resource.description || '';
            item.append(description);
            if (previousTitle) {
                const previous = document.createElement('p');
                previous.className = 'resource-search-note';
                previous.textContent = `曾用名：${previousTitle}`;
                item.append(previous);
            }
            (placements.get(resource.id) || []).forEach(placement => {
                const link = document.createElement('a');
                link.className = 'resource-search-placement';
                link.href = placement.href;
                link.textContent = placement.path;
                link.setAttribute('aria-label', `查看所在位置：${placement.path}`);
                item.append(link);
            });
            results.append(item);
        });
    }
    function ensureCatalog() {
        if (window.AR_CATALOG) return Promise.resolve();
        if (!loading) loading = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'data/catalog.js';
            script.onload = resolve;
            script.onerror = () => { loading = null; script.remove(); reject(new Error('catalog unavailable')); };
            document.head.append(script);
        });
        return loading;
    }
    button.addEventListener('click', () => {
        if (!window.ARAuth.checkAuth()) return;
        dialog.showModal();
        input.focus();
        render();
        ensureCatalog().then(render).catch(() => { status.textContent = '资源加载失败，请关闭后重试'; });
    });
    input.addEventListener('input', render);
    dialog.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            dialog.close();
        }
    });
    dialog.addEventListener('close', () => button.focus());
    render();
})();
