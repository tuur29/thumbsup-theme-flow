$(document).ready(function() {
    $("#media").lightGallery({
        thumbWidth: 80,
        controls: true,
        loop : false,
        download: true,
        counter: true,
        videojs: true,
        exThumbImage: 'data-exthumbimage',
    });

    // Init justified gallery for albums
    $("#albums").justifiedGallery({
        // selector: '.albumList'
        margins: 10,
        rowHeight: 300,
        maxRowHeight: 325,
    });

    // Init justified gallery for photos
    $("#media").justifiedGallery({
        selector: '.albumList',
        margins: 10,
        rowHeight: 250,
        maxRowHeight: 275,
    });
});
