// Código para os botões de navegação do carrossel

const sliderOpiniao = document.querySelectorAll('.sliderOpn');
const Buttonprev = document.getElementById('botaoAnterior');
const Buttonnext = document.getElementById('botaoProximo');

let currentSlide = 0;
let sliderInterval; // Correção: Declarando a variável do timer

function hideSlider(){
    sliderOpiniao.forEach(item => item.classList.remove('ativo'))
}
function showSlider(){
    sliderOpiniao[currentSlide].classList.add('ativo')
}

function nextSlider(){
    hideSlider()
    if(currentSlide === sliderOpiniao.length - 1){
        currentSlide = 0
    } else{
        currentSlide++
    }
    showSlider()
}

function prevSlider(){
    hideSlider()
    if(currentSlide === 0){
        currentSlide = sliderOpiniao.length - 1
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
Buttonnext.addEventListener('click', () => {
    nextSlider();
    resetSliderTimer(); 
});
Buttonprev.addEventListener('click', () => {
    prevSlider();
    resetSliderTimer(); 
});

startSliderTimer();
