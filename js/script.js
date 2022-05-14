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