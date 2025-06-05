// Variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Elementos DOM
const elements = {
    btnReiniciar: document.getElementById('reiniciar'),
    btnJogarNovamente: document.getElementById('joganovamente'),
    resposta: document.getElementById('resposta')
};

// Configurações de imagens
const images = {
    smile: {
        src: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg",
        id: "imagem"
    },
    sad: {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTlA5EO1JUZy9S6Ja3lUX_F2Cwz2ruLdAecg&s",
        id: "imagemn"
    }
};

// Funções auxiliares
function createImage(config) {
    const img = new Image(100);
    img.id = config.id;
    img.src = config.src;
    return img;
}

function removeImageIfExists(id) {
    const img = document.getElementById(id);
    if (img) img.remove();
}

function resetDivs() {
    const divs = document.getElementsByTagName("div");
    for (let i = 0; i < divs.length; i++) {
        if (/^[0-5]$/.test(divs[i].id)) {
            divs[i].className = "inicial";
        }
    }
}

// Funções principais
function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    
    jogarNovamente();
    atualizaPlacar(0, 0);
    
    elements.btnJogarNovamente.className = 'visivel';
    elements.btnReiniciar.className = 'invisivel';
}

function jogarNovamente() {
    jogar = true;
    resetDivs();
    removeImageIfExists(images.smile.id);
    removeImageIfExists(images.sad.id);
}

function atualizaPlacar(acertos, tentativas) {
    desempenho = tentativas > 0 ? (acertos / tentativas) * 100 : 0;
    elements.resposta.innerHTML = `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

function acertou(obj) {
    obj.className = "acertou";
    removeImageIfExists(images.smile.id);
    obj.appendChild(createImage(images.smile));
}

function errou(obj) {
    obj.className = "errou";
    removeImageIfExists(images.sad.id);
    obj.appendChild(createImage(images.sad));
}

function verifica(obj) {
    if (!jogar) return alert('Clique em "Jogar novamente"');
    
    jogar = false;
    tentativas++;
    
    if (tentativas === 6) {
        elements.btnJogarNovamente.className = 'invisivel';
        elements.btnReiniciar.className = 'visivel';
    }
    
    const sorteado = Math.floor(Math.random() * 3);
    
    if (obj.id == sorteado) {
        acertou(obj);
        acertos++;
    } else {
        errou(obj);
        acertou(document.getElementById(sorteado));
    }
    
    atualizaPlacar(acertos, tentativas);
}

// Event listeners
elements.btnJogarNovamente.addEventListener('click', jogarNovamente);
elements.btnReiniciar.addEventListener('click', reiniciar);