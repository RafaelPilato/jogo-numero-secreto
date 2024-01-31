let listaDeNumerosSorteados = [];
let limiteNumero = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let conteudo = document.querySelector(tag);
    conteudo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial(){
    exibirTextoNaTela('h1', "Jogo do número Secreto!");
    exibirTextoNaTela('p', "Escolha um número entre 1 e 100!");
}

mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', "Parabens!!!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let textoTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', textoTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if(chute > numeroSecreto){
        exibirTextoNaTela('p', "Digite um número menor.");
        tentativas++;
        limparCampo();
    } else if(chute < numeroSecreto){
        exibirTextoNaTela('p', "Digite um número maior.");
        tentativas++;
        limparCampo();
    }

}    

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumero + 1);
    let limparListaSorteados = listaDeNumerosSorteados.length;

    if (limparListaSorteados == limiteNumero){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}