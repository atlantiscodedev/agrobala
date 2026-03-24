document.addEventListener('DOMContentLoaded', function () {

    var navbar = document.getElementById('navbar');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
        var y = window.scrollY;
        if (y > 60) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        lastScroll = y;
    });

    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offset = navbar.offsetHeight + 20;
                var top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { revealObs.observe(el); });

    var catBtns = document.querySelectorAll('.menu-cat-btn');
    var menuItems = document.querySelectorAll('.menu-item');

    catBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            catBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var cat = btn.getAttribute('data-cat');

            menuItems.forEach(function (item) {
                if (cat === 'all' || item.getAttribute('data-cat') === cat) {
                    item.style.display = 'flex';
                    item.style.opacity = '0';
                    setTimeout(function () { item.style.opacity = '1'; }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery-item').forEach(function (item) {
        item.addEventListener('click', function () {
            var src = item.getAttribute('data-src');
            if (src) {
                lightboxImg.src = src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });

    var track = document.getElementById('reviewsTrack');
    var dots = document.querySelectorAll('.reviews-dot');
    var currentSlide = 0;
    var totalSlides = dots.length;
    var autoInterval;

    function goToSlide(n) {
        currentSlide = n;
        track.style.transform = 'translateX(-' + (n * 100) + '%)';
        dots.forEach(function (d, i) {
            d.classList.toggle('active', i === n);
        });
    }

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            goToSlide(parseInt(dot.getAttribute('data-slide')));
            resetAuto();
        });
    });

    function autoSlide() {
        autoInterval = setInterval(function () {
            goToSlide((currentSlide + 1) % totalSlides);
        }, 12000);
    }

    function resetAuto() {
        clearInterval(autoInterval);
        autoSlide();
    }

    autoSlide();

    var form = document.getElementById('contactForm');
    form.addEventListener('submit', function (e) {
        var name = document.getElementById('formName').value.trim();
        var email = document.getElementById('formEmail').value.trim();
        var msg = document.getElementById('formMsg').value.trim();

        if (!name || !email || !msg) {
            e.preventDefault();
            alert('Proszę wypełnić wszystkie wymagane pola.');
            return;
        }

        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email)) {
            e.preventDefault();
            alert('Proszę podać prawidłowy adres email.');
        }
    });

    menuItems.forEach(function (item, i) {
        item.style.transitionDelay = (i * 0.05) + 's';
    });
});
