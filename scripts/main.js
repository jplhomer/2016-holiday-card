(function() {
    var $modals = document.querySelector('.modals');

    document.querySelectorAll('[data-modal-trigger]').forEach((link) => {
        var target = link.dataset.modalTrigger;
        var matchingModal = $modals.querySelector('[data-for="' + target + '"]');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            $modals.classList.add('active');
            matchingModal.classList.add('active');
            new MediaElementPlayer(matchingModal.querySelector('video'));
            trackEvent('modal', 'open', target);
            jQuery(window).trigger('resize');
        });
    });

    $modals.querySelector('[data-modal-close]').addEventListener('click', (el) => {
        el.preventDefault();

        closeModal();
    });

    $modals.addEventListener('click', (e) => {
        if ( e.target != $modals ) return;
        closeModal();
    });

    document.querySelectorAll('.video video').forEach((video) => new MediaElementPlayer(video));

    document.querySelectorAll('video').forEach((video) => {
        video.addEventListener('play', () => {
            trackEvent('video', 'play', video.dataset.title);
        });
    });

    var closeModal = function() {
        $modals.classList.remove('active');
        $modals.querySelectorAll('.modal').forEach((modal) => modal.classList.remove('active'));
        $modals.querySelectorAll('video').forEach((video) => video.pause());
    };

    var trackEvent = function(eventCategory, eventAction, eventLabel) {
        // console.log(eventCategory, eventAction, eventLabel);

        if ( typeof ga != 'undefined' ) {
            ga('send', 'event', eventCategory, eventAction, eventLabel);
        }
    };
})();
