// Helper function to create a reproducable random integer
// Source: http://indiegamr.com/generate-repeatable-random-numbers-in-js/

let seed = 0; // not random when seed = 0
function getSeededRandom() {
    var max = max || 1;
    var min = min || 0;

    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280;

    return min + rnd * (max - min);
}

function doubleClickHandler(event) {
    let change = 0;
    if (event.screenX < window.innerWidth / 2) { // left, back
        change = -30;
    } else {
        change = 30;
    }
    this.currentTime(this.currentTime() + change);
}

$(document).ready(function() {
    let initialized = false;

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
        swipeThreshold: 40,
        getCaptionFromTitleOrAlt: false,
        videojsOptions: {
            fluid: true,
            userActions: { touchStart: doubleClickHandler }, // TODO: doubleClick event is doesn't work on mobile
            controlBar: {
                volumePanel: {
                    inline: false
                }
            }
        },
        share: false,
        pager: false,
        hash: false,
        thumbContHeight: 120,
        thumbWidth: 100,
        showThumbByDefault: false,
        videoMaxWidth: 'initial',
        pause: 5000,
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

    // Update history state with current variables
    function pushState() {
        if (!initialized) return;
        const offset = window.pageYOffset || window.scrollY;
        const filter = document.querySelector('#filter').value;
        if (offset || filter || seed) {
            history.replaceState(
                { offset: offset, filter: filter, seed: seed },
                window.title,
                '#' + offset + '|' + filter + '|' + seed
            );
        } else if (window.location.hash !== '#') {
            history.replaceState({}, window.title, '#');
        }
    }
    setInterval(pushState, 1500);

    // Filter albums by caption name
    function filter(query) {
        document.querySelectorAll('.justified-gallery > a').forEach(function(el) {
            const caption = el.querySelector('h3').innerText;
            if (caption.includes(query) || query.length < 2) {
                el.classList.remove('filtered');
            } else {
                el.classList.add('filtered');
            }
        });
        $('#albums').justifiedGallery({ filter: ':not(.filtered)' });
        window.scrollTo({ top: 0 });
        pushState();
    }

    // Randomize album sorting
    function randomize(inputSeed) {
        if (seed) {
            $('#albums').justifiedGallery({sort: function(a, b){
                return a.querySelector('h3').innerText < b.querySelector('h3').innerText ? -1 : 1;
            }});
            seed = 0;
            document.querySelector('#randomize').innerHTML = "Randomize";
        } else {
            const originalSeed = parseFloat(inputSeed) || Math.random(); // create new seed if not supplied
            seed = originalSeed;
    
            const gallery = document.querySelector('.justified-gallery');
            const elements = Array.from(gallery.children).sort(function () { return getSeededRandom(seed) - 0.5; });
    
            gallery.innerHTML = '';
            elements.forEach(el => gallery.appendChild(el));
            seed = originalSeed;
            $('#albums').justifiedGallery();
            document.querySelector('#randomize').innerHTML = "Sort alphabetically";
        }

        window.scrollTo({ top: 0 });
        pushState();
    }

    // Add event listeners or hide controls
    if (document.querySelector('#albums').children.length) {
        document.querySelector('#filter').addEventListener('change', function(event) { filter(event.target.value); });
        document.querySelector('#randomize').addEventListener('click', randomize);
    } else {
        document.querySelector('#controls').style.display = 'none';
    }

    // Recall saved variables
    let scrollOffset = 0;
    if (window.location.hash) {
        const parts = window.location.hash.slice(1).split('|');

        if (parseInt(parts[0])) { // offset
            scrollOffset = parseInt(parts[0]);
        }
        if (parts[1]) { // filter
            document.querySelector('#filter').value = parts[1];
            filter(parts[1]);
        }
        if (parseFloat(parts[2])) { // seed
            randomize(parts[2]);
        }
    }
    $("#albums").justifiedGallery().on('jg.complete', function () {
        if (!initialized) {
            setTimeout(function(){
                if (scrollOffset) window.scrollTo({ top: scrollOffset });
                initialized = true;
            }, 250);
        }
    });
});
