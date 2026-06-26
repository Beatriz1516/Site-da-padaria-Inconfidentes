const sliderImages = document.querySelectorAll('.slider-image');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentSlide = 0;

function hideSlider(){
    sliderImages.forEach(item => item.classList.remove('on'))
}
function showSlider(){
    sliderImages[currentSlide].classList.add('on')
}


function nextSlider(){
    hideSlider()
    if(currentSlide === sliderImages.length -1){
        currentSlide = 0
    } else{
        currentSlide++
    }
    showSlider()
}
function prevSlider(){
    hideSlider()
    if(currentSlide === 0){
        currentSlide = sliderImages.length -1
    } else{
        currentSlide--
    }
    showSlider();
}


prevButton.addEventListener('click', prevSlider)
nextButton.addEventListener('click', nextSlider)