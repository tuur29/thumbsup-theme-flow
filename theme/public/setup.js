$(document).ready(function() {
    $("#media").lightGallery({
        controls: true,
        loop : false,
        download: true,
        counter: true,
        videojs: true,
        exThumbImage: 'data-exthumbimage',
        // Custom options
        mode: 'lg-slide',
        speed: 200,
        hideBarsDelay: 3000,
        closable: false,
        hideControlOnEnd: true,
        preload: 2,
        swipeThreshold: 30,
        getCaptionFromTitleOrAlt: false,
        // Custom plugin options
        thumbContHeight: 120,
        thumbWidth: 100,
        showThumbByDefault: false,
        videoMaxWidth: 'initial',
        pause: 3000,
        zoom: true,
        scale: 0.5,
    });

    // Init justified gallery for albums
    $("#albums").justifiedGallery({
        // selector: '.albumList'
        margins: 10,
        rowHeight: 225,
        maxRowHeight: "150%",
    });

    // Init justified gallery for photos
    $("#media").justifiedGallery({
        selector: '.albumList',
        margins: 5,
        rowHeight: 165,
        maxRowHeight: "150%",
    });

    // Filter albums by caption name
    if (document.querySelector('#albums').children.length) {
        document.querySelector('#filter').addEventListener('change', function(event) {
            const query = event.target.value;
            document.querySelectorAll('.justified-gallery > a').forEach(function(el) {
                const caption = el.querySelector('h3').innerText;
                if (caption.includes(query) || query.length < 2) {
                    el.classList.remove('filtered');
                } else {
                    el.classList.add('filtered');
                }
            });
            $('#albums').justifiedGallery({ filter: ':not(.filtered)' });
        });
    } else {
        document.querySelector('#filter').style.display = 'none';
    }

    // Recall saved scroll position
    if (window.location.hash) {
        const parts = window.location.hash.slice(1).split('|');

        if (parts[1]) { // filter
            document.querySelector('#filter').value = parts[1];
            document.querySelector('#filter').dispatchEvent(new Event('change'));
        }
        if (parts[0]) { // offset
            setTimeout(function(){ window.scrollTo({ top: parseInt(parts[0]) }) }, 250);
        }
    }

    // Update history state with current variables
    setInterval(function() {
        const offset = window.pageYOffset || window.scrollY;
        const filter = document.querySelector('#filter').value;
        if (offset || filter || window.location.hash) {
            history.replaceState(
                {offset: offset, filter: filter},
                window.title,
                '#' + offset + '|' + filter
            );
        }
    }, 1500);
});
