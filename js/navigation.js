(function () {
    if (document.getElementById('sidebar')) document.body.classList.add('library-shell');
    const areaIcons = { create: 'fas fa-palette', learn: 'fas fa-graduation-cap', life: 'fas fa-mug-hot', setup: 'fas fa-desktop' };
    function iconLink(href, label, icon, className, active) {
        const link = document.createElement('a');
        link.href = href;
        link.className = className;
        link.setAttribute('aria-label', label);
        const image = document.createElement('i');
        image.className = icon;
        image.setAttribute('aria-hidden', 'true');
        const text = document.createElement('span');
        text.className = 'navigation-label';
        text.textContent = label;
        link.append(image, text);
        if (active) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
        return link;
    }
    function renderNavigation() {
        const mount = document.getElementById('sidebar');
        if (!mount || !window.AR_NAVIGATION) return;
        const active = window.AR_VIEWS && window.AR_VIEWS[window.AR_ACTIVE_VIEW];
        const area = active && window.AR_NAVIGATION.find(item => item.id === active.area);
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const home = currentPage === 'index.html';
        const page = window.AR_PAGES && window.AR_PAGES[document.body.dataset.page];
        const title = active ? active.title : page ? page.title : home ? '首页' : '分类';
        const rail = document.createElement('nav');
        rail.className = 'area-rail';
        rail.setAttribute('aria-label', '主要区域');
        rail.append(iconLink('index.html', 'AR Library / 首页', 'fas fa-book', 'rail-link rail-home', home));
        window.AR_NAVIGATION.forEach(item => rail.append(iconLink(item.items[0].href, item.label,
            areaIcons[item.id] || 'fas fa-folder', 'rail-link', Boolean(area && area.id === item.id))));
        const sidebar = document.createElement('nav');
        sidebar.id = 'library-sidebar';
        sidebar.className = 'sidebar';
        sidebar.setAttribute('aria-label', '分类与当前页面');
        const searchSlot = document.createElement('div');
        searchSlot.id = 'navigation-search-slot';
        sidebar.append(searchSlot);
        const body = document.createElement('div');
        body.className = 'navigation-body';
        sidebar.append(body);
        const mobileAreas = document.createElement('div');
        mobileAreas.className = 'mobile-area-list';
        mobileAreas.append(iconLink('index.html', '首页', 'fas fa-home', 'area-link', home));
        const mobileAreaEntries = document.createElement('div');
        mobileAreaEntries.className = 'mobile-area-entries';
        const areaHeading = document.createElement('h2');
        areaHeading.className = 'navigation-heading';
        areaHeading.textContent = '区域';
        mobileAreaEntries.append(areaHeading);
        window.AR_NAVIGATION.forEach(item => mobileAreaEntries.append(iconLink(item.items[0].href, item.label,
            areaIcons[item.id] || 'fas fa-folder', 'area-link', Boolean(area && area.id === item.id))));
        mobileAreas.append(mobileAreaEntries);
        body.append(mobileAreas);
        const heading = document.createElement('h2');
        heading.className = 'navigation-heading';
        heading.textContent = area ? area.label : '资源目录';
        body.append(heading);
        const views = document.createElement('div');
        views.className = 'navigation-views';
        if (area) {
            area.items.forEach(item => views.append(iconLink(item.href, item.label, item.icon || 'fas fa-bookmark',
                'sidebar-link', new URL(item.href, window.location.href).searchParams.get('view') === window.AR_ACTIVE_VIEW)));
        } else {
            window.AR_NAVIGATION.forEach(item => views.append(iconLink(item.items[0].href, item.label,
                areaIcons[item.id] || 'fas fa-folder', 'directory-area-link', false)));
        }
        body.append(views);
        const sections = window.AR_RESOURCE_SECTIONS || [];
        if (sections.length) {
            const directory = document.createElement('div');
            directory.className = 'navigation-page';
            const pageHeading = document.createElement('h2');
            pageHeading.className = 'navigation-heading';
            pageHeading.textContent = active ? '当前页面' : '当前兼容页面';
            directory.append(pageHeading);
            if (active && active.domains) {
                const tree = document.createElement('div');
                tree.className = 'navigation-art-tree';
                directory.append(tree);
                function targetLink(id, label, level, current, exact, count) {
                    const link = document.createElement('a');
                    link.className = `navigation-section navigation-art-target navigation-art-${level}`;
                    link.href = `#${id}`;
                    if (current) link.classList.add('active');
                    if (exact) link.setAttribute('aria-current', 'location');
                    const text = document.createElement('span');
                    text.textContent = label;
                    link.append(text);
                    if (count !== undefined) {
                        const total = document.createElement('span');
                        total.className = 'navigation-count';
                        total.textContent = count;
                        link.append(total);
                    }
                    return link;
                }
                function updateTree(state) {
                    const focusedHref = tree.contains(document.activeElement) ? document.activeElement.getAttribute('href') : null;
                    tree.replaceChildren();
                    active.domains.forEach(domain => {
                        const current = domain.id === state.domainId;
                        tree.append(targetLink(domain.id, domain.title, 'domain', current,
                            domain.id === state.targetId));
                        if (!current) return;
                        domain.groups.forEach(group => {
                            if (group.title) tree.append(targetLink(group.id, group.title, 'group',
                                group.id === state.groupId, group.id === state.targetId));
                            group.sectionIds.forEach(id => {
                                const section = sections.find(item => item.id === id);
                                if (!section) return;
                                const link = targetLink(id, section.title, 'section', id === state.sectionId,
                                    id === state.sectionId, section.resources.length);
                                if (group.title) link.classList.add('navigation-art-grouped-section');
                                tree.append(link);
                            });
                        });
                    });
                    if (focusedHref) [...tree.querySelectorAll('a')].find(link => link.getAttribute('href') === focusedHref)?.focus({ preventScroll: true });
                }
                document.addEventListener('ar:domain-rendered', event => updateTree(event.detail));
                updateTree({ domainId: active.domains[0].id, targetId: '' });
            } else {
                sections.forEach(section => {
                    const link = document.createElement('a');
                    link.className = 'navigation-section';
                    link.href = `#${section.id}`;
                    const label = document.createElement('span');
                    label.textContent = section.title;
                    const count = document.createElement('span');
                    count.className = 'navigation-count';
                    count.textContent = section.resources.length;
                    link.append(label, count);
                    directory.append(link);
                });
                document.body.classList.add('navigation-has-sections');
            }
            body.append(directory);
        }
        const toolbar = document.createElement('div');
        toolbar.className = 'navigation-toolbar';
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'mobile-navigation-toggle';
        toggle.textContent = `${title} · 导航`;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', sidebar.id);
        const toolbarSearch = document.createElement('div');
        toolbarSearch.id = 'toolbar-search-slot';
        toolbar.append(toggle, toolbarSearch);
        function closeNavigation(restoreFocus = false) {
            sidebar.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            if (restoreFocus) toggle.focus({ preventScroll: true });
        }
        toggle.addEventListener('click', () => {
            const open = toggle.getAttribute('aria-expanded') !== 'true';
            sidebar.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && sidebar.classList.contains('is-open') && !event.target.closest('dialog')) {
                closeNavigation(true);
            }
        });
        sidebar.addEventListener('click', event => {
            const link = event.target.closest('a.navigation-section');
            if (link && sidebar.classList.contains('is-open') && event.button === 0 &&
                !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) closeNavigation(true);
        });
        const desktop = window.matchMedia('(min-width: 1200px)');
        const mobile = window.matchMedia('(max-width: 768px)');
        function resetNavigation() {
            const focusHidden = sidebar.contains(document.activeElement) && !desktop.matches;
            closeNavigation(focusHidden);
            if (desktop.matches && document.activeElement === toggle) {
                const destination = sidebar.querySelector('.sidebar-link.active, .directory-area-link');
                if (destination) destination.focus({ preventScroll: true });
            }
        }
        desktop.addEventListener('change', resetNavigation);
        mobile.addEventListener('change', resetNavigation);
        mount.replaceWith(rail, toolbar, sidebar);
        if (document.body.dataset.auth === 'protected' && window.ARAuth && window.ARAuth.hasAccessToday()) {
            const search = document.createElement('script');
            search.src = 'js/resource-search.js';
            document.head.append(search);
        }
    }
    document.addEventListener('DOMContentLoaded', renderNavigation);
})();
