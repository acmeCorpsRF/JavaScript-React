// 1) необходимо реализовать галерею на основе этого макета (не обязательно пиксель в пиксель)
//
// https://www.figma.com/file/HRSMjDYFrZzrK9HO555Km9/Untitled?node-id=0%3A1
//
//
//     2) При достижении крайнего положения галлерея должна проскролиться в другой конец.
//     Слайдер должен быть респонсивным и подстраиваться под разное кол-во слайдов.
//
//
// 3) Точки внизу должны менять свои стили в зависимости от текущего слайда
// и они должны быть кликабельны.
//
// 4) *По нажатию на слайд данные должны открываться в модальном окне.
// При нажатии на серый край модального окна оно должно закрываться.

let slider = document.getElementById('slider'),
    carousel = document.getElementById('carousel'),
    swiper = document.createElement('div'),
    listPoster = document.querySelectorAll('.poster'),
    elementWidth = document.querySelector('.poster').offsetWidth + 17,
    totalWidthElements = 0,
    btnPrev = document.createElement('button'),
    btnNext = document.createElement('button'),
    dots = document.createElement('ul');


function moveSlider(e) {
    let swiperStart = swiper.offsetLeft,
        swiperWidth = swiper.offsetWidth,
        currentSelection = document.querySelector('.chosen'),
        posters = document.querySelectorAll('.poster');
    if (swiperStart % elementWidth == 0) {
        if (this == btnPrev && swiperStart <= 0) {
            if (Math.abs(swiperStart) !== swiperWidth - elementWidth) {
                swiper.style.left = swiperStart - elementWidth + 'px';
                currentSelection.classList.remove('chosen');
                currentSelection.nextSibling.classList.add('chosen');
            } else if (Math.abs(swiperStart) == swiperWidth - elementWidth) {
                swiper.style.left = 0 + 'px';
                currentSelection.classList.remove('chosen');
                posters[0].classList.add('chosen');
            }
        }
        if (this == btnNext) {
            if (swiperStart < 0) {
                swiper.style.left = swiperStart + elementWidth + 'px';
                currentSelection.classList.remove('chosen');
                currentSelection.previousSibling.classList.add('chosen');
            } else if (swiperStart == 0) {
                swiper.style.left = -(swiperWidth - elementWidth) + 'px';
                currentSelection.classList.remove('chosen');
                posters[posters.length - 1].classList.add('chosen');
            }
        }
    }
    enumeration();
}

function setChoice(e) {
    let listDots = document.querySelectorAll('.item'),
        allPosters = document.querySelectorAll('.poster');
    listDots.forEach((dot, index) => {
        (e.target == dot) ? dot.classList.add('active') : dot.classList.remove('active');
        if (dot.classList.contains('active')) {
            allPosters.forEach((poster, i) => {
                if (index == i) {
                    poster.classList.add('chosen');
                    swiper.style.left = -elementWidth * i + 'px';
                } else {
                    poster.classList.remove('chosen');
                }
            });
        }
    })
}

function enumeration() {
    let listDots = document.querySelectorAll('.item'),
        allPosters = document.querySelectorAll('.poster');
    allPosters.forEach((poster, index) => {
        if (poster.classList.contains('chosen')) {
            listDots.forEach((dot, i) => {
                (index == i) ? dot.classList.add('active') : dot.classList.remove('active');
            })
        }
    })
}

function createModal() {
    let shadow = document.createElement('div'),
        slide = this.cloneNode(true);
    shadow.className = 'shadow';
    slide.className = 'slide';
    slide.removeAttribute('style');
    document.body.append(shadow);
    shadow.append(slide);
    shadow.addEventListener('click', function (e) {
        (e.target == this) ? this.remove() : false;
    });
}

slider.style.overflow = 'hidden';
swiper.className = 'swiper';
carousel.classList.add('action');
carousel.prepend(swiper);
btnPrev.className = 'prev';
btnPrev.innerHTML = '&lt;';
btnNext.className = 'next';
btnNext.innerHTML = '&gt;';
dots.className = 'dots';
dots.id = 'dots';
for (let c = 0; c < listPoster.length; c++) {
    totalWidthElements += elementWidth;
    let node = listPoster[c].cloneNode(true),
        dotsItem = document.createElement('li');
    dotsItem.className = 'item';
    dotsItem.addEventListener('click', setChoice);
    node.style.width = elementWidth + 'px';
    node.addEventListener('click', createModal);
    if (c == 0) {
        node.classList.add('chosen');
        dotsItem.classList.add('active');
    }
    swiper.append(node);
    listPoster[c].remove();
    dots.append(dotsItem);
}
slider.append(btnPrev);
slider.append(btnNext);
slider.append(dots);
swiper.style.width = totalWidthElements + 'px';
btnPrev.addEventListener('click', moveSlider);
btnNext.addEventListener('click', moveSlider);