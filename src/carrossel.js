// Código para os botões de navegação do carrossel

const sliderImages = document.querySelectorAll('.slider-image');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentSlide = 0;
let sliderInterval; // Correção: Declarando a variável do timer

function hideSlider(){
    sliderImages.forEach(item => item.classList.remove('on'))
}
function showSlider(){
    sliderImages[currentSlide].classList.add('on')
}

function nextSlider(){
    hideSlider()
    if(currentSlide === sliderImages.length - 1){
        currentSlide = 0
    } else{
        currentSlide++
    }
    showSlider()
}

function prevSlider(){
    hideSlider()
    if(currentSlide === 0){
        currentSlide = sliderImages.length - 1
    } else{
        currentSlide--
    }
    showSlider();
}

// Código para iniciar o timer do carrossel
function startSliderTimer() {
    sliderInterval = setInterval(nextSlider, 5000); 
}
// Reseta o timer quando o usuário clica manualmente
function resetSliderTimer() {
    clearInterval(sliderInterval);
    startSliderTimer();
}
nextButton.addEventListener('click', () => {
    nextSlider();
    resetSliderTimer(); 
});
prevButton.addEventListener('click', () => {
    prevSlider();
    resetSliderTimer(); 
});

startSliderTimer();
