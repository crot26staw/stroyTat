'use strict';

//Слайдер
const carouselDots = document.querySelector('.work-header-carousel-dots');
const sliderWrap = document.querySelector('.work-header-sliders-wrapepr');
const sliders = document.querySelector('.work-header-sliders');
const slides = document.querySelectorAll('.work-header-slides');
const widthSlides = window.getComputedStyle(sliderWrap).width;
const next = document.querySelector('.work-header-sliders-arrow-next');
const prew = document.querySelector('.work-header-sliders-arrow-prew');

let index = 0;
let offset = 0;

sliders.style.width = 100 * slides.length + '%';

function deleteNotDigits(str){     //Получаем чисто число из строки
    return +str.replace(/\D/g, '');
}

function nextSlide(next, offset, widthSlides, slides, sliders, index, dot) {
    next.addEventListener('click', () =>{
        if(offset == deleteNotDigits(widthSlides) * (slides.length - 1)) {
            offset = 0;
        } else{
            offset = offset + deleteNotDigits(widthSlides);
        }
        sliders.style.transform = `translateX(-${offset}px)`;
    
        if(index == slides.length - 1){
            index = 0;
        } else {
            index ++;
        }
    
        removeActiveDot(dot);
        addActiveDot(dot, index);
    });
}
nextSlide(next, offset, widthSlides, slides, sliders, index);

function prewSlide(prew, offset, widthSlides, slides, sliders, index, dot){
    prew.addEventListener('click', () =>{
        if(offset == 0){
            offset = deleteNotDigits(widthSlides) * (slides.length - 1);
        } else {
            offset = offset - deleteNotDigits(widthSlides);
        }
        sliders.style.transform = `translateX(-${offset}px)`;
    
        if(index == 0) {
            index = slides.length - 1;
        } else {
            index --;
        }
        
        removeActiveDot(dot);
        addActiveDot(dot, index);
    });
}
prewSlide(prew, offset, widthSlides, slides, sliders, index);

let dots;
for(let i = 0; i < slides.length; i++){           // Добавляем доты динамически
    dots = document.createElement('div');
    dots.classList.add('work-header-carousel-dot');
    carouselDots.append(dots);
}

const dot = document.querySelectorAll('.work-header-carousel-dot');

function removeActiveDot (dot) {
    dot.forEach(item =>{
        item.classList.remove('work-header-carousel-dot-active');
    });
}

function addActiveDot (dot, i) {
    dot[i].classList.add('work-header-carousel-dot-active');
}
addActiveDot(dot, index);

dot.forEach(function (item, i) {            //Листаем слайд по нажатию на дот
    item.addEventListener('click', () =>{
        index = i;
        removeActiveDot(dot);
        addActiveDot(dot, index);

        offset = deleteNotDigits(widthSlides) * index;

        sliders.style.transform = `translateX(-${offset}px)`;

    });
});

//Второй слайдер

const reviewsWrapper = document.querySelector('.reviews-carousel-wrapper');
const reviewsWidht = window.getComputedStyle(reviewsWrapper).width;
const reviewsSlireds = document.querySelector('.reviews-carousel-sliders');
const reviewsSlides = document.querySelectorAll('.reviews-carousel-slides');
const reviewsArrow = document.querySelectorAll('.reviews-carousel-arrow');
const reviewsNext = document.querySelector('.reviews-carousel-arrow-next');
const reviewsPrew = document.querySelector('.reviews-carousel-arrow-prew');

let reviewsIndex = 0;
let reviewsOffset = 0;

function deleteNotDigits(str){  
    return +str.replace(/\D/g, '');
}

nextSlide(reviewsNext, reviewsOffset, reviewsWidht, reviewsSlides, reviewsSlireds, reviewsIndex);
prewSlide(reviewsPrew, reviewsOffset, reviewsWidht, reviewsSlides, reviewsSlireds, reviewsIndex);


//Выезжающие ответы

const ArrowBtn = document.querySelectorAll('.answers-stage-title-arrow-img');
const answDescr = document.querySelectorAll('.answers-stage-descr');

answDescr.forEach(item => {
    item.classList.remove('answers-stage-descr-show');
    item.classList.add('answers-stage-descr-hide');
});

ArrowBtn.forEach(function (item, i) {
    item.addEventListener('click', () =>{
        item.classList.toggle('answers-stage-title-arrow-img-revers');
        answDescr[i].classList.toggle('answers-stage-descr-show');
        answDescr[i].classList.toggle('answers-stage-descr-hide');
    });
});

