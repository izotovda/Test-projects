'use strict'

class Slider {

  galleryElems = [];
  
  shift = 0;

  animationDuration = 0.2;

  isMoving = false;

  slider
  galleryWrapper;
  galleryContainer;
  buttonNext;
  buttonPrev;

  constructor(images) {  
    this.gallery = [...images];
  }

  create() {

    this.constructSliderBody();

    for (const i of this.gallery) {
      const item = createItem(i);

      this.galleryContainer.append(item);

      this.galleryElems.push(item);

      if (this.galleryElems.length > 9) item.classList.add('hidden');
    }

    this.galleryElems[0].classList.add('selected');

    let currentIndex = 0;
    let firstIndex = 0;
    let lastIndex = 8;

    const itemWidth = this.galleryElems[1].offsetLeft - this.galleryElems[0].offsetLeft;

    // Event: onclick ButtonNext
    this.buttonNext.addEventListener('click', () => {
      if (this.isMoving) return;

      if (currentIndex == this.gallery.length - 1) return;

      selectNextElem(this.galleryElems, currentIndex);
      currentIndex += 1;

      if (this.galleryElems[currentIndex].getBoundingClientRect().right >= this.galleryWrapper.getBoundingClientRect().right) {

        transformElem(this.galleryContainer, this.animationDuration, this.shift -= itemWidth);

        this.isMoving = true;
      }
    });

    // Event: onclick ButtonPrev
    this.buttonPrev.addEventListener('click', () => {
      if (this.isMoving) return;

      if (currentIndex == 0) return;

      selectPrevElem(this.galleryElems, currentIndex);
      currentIndex -= 1;

      if (this.galleryElems[currentIndex].getBoundingClientRect().left <= this.galleryWrapper.getBoundingClientRect().left) {
        
        transformElem(this.galleryContainer, this.animationDuration, this.shift += itemWidth);

        this.isMoving = true;
      }
    });

    // Event: onTransitionend
    this.galleryContainer.addEventListener('transitionend', () => {
      if (currentIndex == lastIndex && lastIndex != this.gallery.length - 1) {
        
        lastIndex += 1;
        this.galleryElems[lastIndex].classList.remove('hidden');
        
        this.galleryElems[firstIndex].classList.add('hidden');
        firstIndex += 1;

        transformElem(this.galleryContainer, 0, this.shift += itemWidth);

      } else if (currentIndex == firstIndex && firstIndex !=0) {

        firstIndex -= 1;
        this.galleryElems[firstIndex].classList.remove('hidden');

        this.galleryElems[lastIndex].classList.add('hidden');
        lastIndex -= 1;

        transformElem(this.galleryContainer, 0, this.shift -= itemWidth);
      }

      this.isMoving = false;
    });
  }

  constructSliderBody() {
    this.slider = document.createElement('div');
    this.slider.classList.add('slider');
  
    this.buttonPrev = document.createElement('button');
    this.buttonPrev.classList.add('slider__button', 'slider__button-prev'); 
    this.buttonPrev.textContent = "⇦";
  
    this.buttonNext = document.createElement('button');
    this.buttonNext.classList.add('slider__button', 'slider__button-next'); 
    this.buttonNext.textContent = "⇨";
  
    this.galleryWrapper = document.createElement('div');
    this.galleryWrapper.classList.add('slider__gallery-wrapper');
  
    this.galleryContainer = document.createElement('div');
    this.galleryContainer.classList.add('slider__gallery-container');
  
    this.slider.append(this.buttonPrev);
    this.slider.append(this.buttonNext);
    this.slider.append(this.galleryWrapper);
  
    this.galleryWrapper.append(this.galleryContainer);
  
    document.body.append(this.slider);
  }
}


function createItem(content) {
  const item = document.createElement('div');
  item.classList.add('slider__gallery-item');
  item.textContent = content; 

  return item;
}


function transformElem(elem, duration, shift) {
  elem.style.transition = `${duration}s all`;
  elem.style.transform = `translateX(${shift}px)`;
}


function selectNextElem(galleryArray, Index) {
  galleryArray[Index].classList.remove('selected');
  galleryArray[Index + 1].classList.add('selected');
};


function selectPrevElem(galleryArray, Index) {
  galleryArray[Index].classList.remove('selected');
  galleryArray[Index - 1].classList.add('selected');
};


let images = [];
for (let i = 1; i <= 15; i++) images.push(i);

let slider = new Slider(images);
slider.create();