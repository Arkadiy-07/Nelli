
const slides = Array.from(document.querySelectorAll('.slide'));

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

const presentation = document.querySelector('.presentation');

let currentSlide = 0;
let touchStartX = 0;
let touchStartY = 0;

function showSlide(index) {
    if (slides.length === 0) return;

    currentSlide = Math.max(0, Math.min(index, slides.length - 1));

    slides.forEach((slide, i) => {
        const isActive = i === currentSlide;

        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
    });

    const progress = ((currentSlide + 1) / slides.length) * 100;

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}% просмотрено`;

    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === slides.length - 1;
}

prevButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        showSlide(currentSlide + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        showSlide(currentSlide - 1);
    } else if (event.key === 'Home') {
        showSlide(0);
    } else if (event.key === 'End') {
        showSlide(slides.length - 1);
    }
});

presentation.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

presentation.addEventListener('touchend', (event) => {
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;

    if (
        Math.abs(deltaX) > 55 &&
        Math.abs(deltaX) > Math.abs(deltaY) * 1.2
    ) {
        showSlide(currentSlide + (deltaX < 0 ? 1 : -1));
    }
}, { passive: true });

showSlide(0);
