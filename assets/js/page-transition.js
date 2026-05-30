(function () {
    const FADE_CLASS = 'page-transition';
    const DURATION = 220;

    function shouldHandleLink(link) {
        if (!link) return false;

        const href = link.getAttribute('href');
        if (!href) return false;
        if (href.startsWith('#')) return false;
        if (link.target && link.target.toLowerCase() === '_blank') return false;
        if (link.hasAttribute('download')) return false;

        try {
            const destination = new URL(link.href, window.location.href);
            if (destination.origin !== window.location.origin) return false;
            if (destination.pathname === window.location.pathname && destination.search === window.location.search) return false;
            return true;
        } catch (error) {
            return false;
        }
    }

    document.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!shouldHandleLink(link)) return;

        event.preventDefault();
        document.body.classList.add(FADE_CLASS);

        setTimeout(() => {
            window.location.href = link.href;
        }, DURATION);
    });
})();
