programa {
  funcao inicio() {
    escreva("=== Programa para saber se um ano é bissexto=== ")

    // variáveis
    inteiro anoAtual

    // entrada
    escreva("\nDigite o ano atual ")
    leia(anoAtual)

    // processamento e saída
    se( anoAtual < 1000){
      escreva("Escreva um ano 1000 d.C.")
    } senao se (anoAtual % 4 == 0){
      escreva("O ano ", anoAtual, " é bissexto")
    } senao se (anoAtual % 4 == 1){
      escreva("Faltam 3 anos para o ano bissexto")
    } senao se(anoAtual % 4 == 2){
      escreva("Faltam 2 anos para o ano bissexto")
    } senao{
      escreva("Falta um ano para o ano bissexto")
    }
  }
}
