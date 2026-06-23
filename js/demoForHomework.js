var slideIndex = 0;
var timer = null;
var isPaused = false;

showSlides();

function showSlides() {
    var slides = document.querySelectorAll('.carousel-images img');
    var dots = document.querySelectorAll('.dot');

    slides.forEach(function(slide) { slide.style.display = 'none'; });
    dots.forEach(function(dot) { dot.classList.remove('active'); });

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('active');

    if (!isPaused) {
        timer = setTimeout(showSlides, 3000);
    }
}

function prevSlide() {
    clearTimeout(timer);
    slideIndex--;
    if (slideIndex < 1) {
        slideIndex = document.querySelectorAll('.carousel-images img').length;
    }
    updateSlide();
    if (!isPaused) {
        timer = setTimeout(showSlides, 3000);
    }
}

function nextSlide() {
    clearTimeout(timer);
    slideIndex++;
    if (slideIndex > document.querySelectorAll('.carousel-images img').length) {
        slideIndex = 1;
    }
    updateSlide();
    if (!isPaused) {
        timer = setTimeout(showSlides, 3000);
    }
}

function updateSlide() {
    var slides = document.querySelectorAll('.carousel-images img');
    var dots = document.querySelectorAll('.dot');
    slides.forEach(function(slide) { slide.style.display = 'none'; });
    dots.forEach(function(dot) { dot.classList.remove('active'); });
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('active');
}

function currentSlide(n) {
    var slides = document.querySelectorAll('.carousel-images img');
    var dots = document.querySelectorAll('.dot');

    slides.forEach(function(slide) { slide.style.display = 'none'; });
    dots.forEach(function(dot) { dot.classList.remove('active'); });

    slideIndex = n;

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('active');

    clearTimeout(timer);
    if (!isPaused) {
        timer = setTimeout(showSlides, 3000);
    }
}

// 鼠标悬停暂停，离开继续
document.addEventListener('DOMContentLoaded', function() {
    var carousel = document.querySelector('.carousel');

    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            isPaused = true;
            clearTimeout(timer);
        });

        carousel.addEventListener('mouseleave', function() {
            isPaused = false;
            timer = setTimeout(showSlides, 3000);
        });
    }

    // 导航栏滚动高亮
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('.navLink');
    var homeLink = document.getElementById('homeLink');

    function changeNavLink() {
        var scrollPos = window.scrollY + window.innerHeight / 2;

        navLinks.forEach(function(link) { link.classList.remove('linkActive'); });
        if (homeLink) homeLink.classList.remove('linkActive');

        if (sections.length > 0 && scrollPos < sections[0].offsetTop) {
            if (homeLink) homeLink.classList.add('linkActive');
            return;
        }

        sections.forEach(function(section, index) {
            var sectionTop = section.offsetTop;
            var sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                if (navLinks[index]) navLinks[index].classList.add('linkActive');
            }
        });
    }

    window.addEventListener('scroll', changeNavLink);
});
