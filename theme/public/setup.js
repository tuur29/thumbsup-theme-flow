$(document).ready(function() {
    $("#media").lightGallery({
        thumbWidth: 80,
        controls: true,
        loop : false,
        download: true,
        counter: true,
        videojs: true,
        exThumbImage: 'data-exthumbimage',
        // Custom options
        mode: 'lg-slide',
        speed: 200,
        hideBarsDelay: 4500,
        closable: false,
        hideControlOnEnd: true,
        preload: 2,
        swipeThreshold: 30,
        // Custom plugin options
        thumbContHeight: 168,
        thumbWidth: 100,
        showThumbByDefault: false,
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

    // Remember scroll position
    if (window.location.hash) {
        // Scroll to previous place
        const distance = parseInt(window.location.hash.slice(1));
        setTimeout(() => {
            if (distance) {
                window.scrollTo({top: distance, behavior: "auto"});
            }
        }, 250);
    }
    // Put scroll position in history so page can scroll down when going back
    setInterval(() => {
        history.replaceState({}, window.title, "#"+(window.pageYOffset || window.scrollY));
    }, 1500);
});
