const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');

const chaoY = canvas.height - 50;

const personagem = {
    x: 100,
    y: chaoY - 150,
    largura: 110,
    altura: 150,
    velocidadeX: 0,  // Velocidade horizontal do personagem
    aceleracao: 0.5, // Aceleração para quando o personagem anda
    desaceleracao: 0.89 , // Fator de desaceleração para quando a tecla é solta
    velocidadey: 0,
    pulando: false,
    larguraPulo: 115,
    alturaPulo: 120
};

const obstaculo = {
    x: 900,
    y: chaoY - 150,
    largura: 100,
    altura: 150,
    velocidade: 1
};

const gravidade = 0.13;  // Gravidade suave

const imgMorte = new Image();
imgMorte.src = 'morte.jpg';

const imgInimigo = new Image();
imgInimigo.src = 'joe.png';

const imgPersonagem = new Image();
imgPersonagem.src = 'peter.png';

const imgPersonagemPulo = new Image();
imgPersonagemPulo.src = 'imagempulo.webp';

const imgFundo = new Image();
imgFundo.src = 'imagem.jpg';

let gameOver = false;

// Controla as teclas pressionadas
let teclas = {
    esquerda: false,
    direita: false,
    espaco: false
};

// Para controle de FPS
const FPS = 60;
let lastFrameTime = 0;
let deltaTime = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !personagem.pulando) {
        personagem.velocidadey = 8;  // Velocidade do pulo
        personagem.pulando = true;
    }
    if (e.code === 'KeyD') {
        teclas.direita = true;
    }
    if (e.code === 'KeyA') {
        teclas.esquerda = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyD') {
        teclas.direita = false;
    }
    if (e.code === 'KeyA') {
        teclas.esquerda = false;
    }
});

// Função para desenhar o personagem
function desenharPersonagem() {
    if (personagem.pulando) {
        ctx.drawImage(imgPersonagemPulo, personagem.x, personagem.y, personagem.larguraPulo, personagem.alturaPulo);
    } else {
        // Se estiver se movendo para a esquerda, inverte a imagem
        if (teclas.esquerda) {
            ctx.save(); // Salva o estado do contexto
            ctx.scale(-1, 1); // Inverte horizontalmente
            ctx.drawImage(imgPersonagem, -personagem.x - personagem.largura, personagem.y, personagem.largura, personagem.altura);
            ctx.restore(); // Restaura o estado original do contexto
        } else {
            ctx.drawImage(imgPersonagem, personagem.x, personagem.y, personagem.largura, personagem.altura);
        }
    }
}

// Função para atualizar a física do personagem
function atualizarPersonagem() {
    // Movimento horizontal suave
    if (teclas.direita) {
        personagem.velocidadeX += personagem.aceleracao;  // Aumenta a velocidade para a direita
    } else if (teclas.esquerda) {
        personagem.velocidadeX -= personagem.aceleracao;  // Aumenta a velocidade para a esquerda
    } else {
        // Desacelera se nenhuma tecla horizontal for pressionada
        personagem.velocidadeX *= personagem.desaceleracao;
    }

    // Limita a velocidade máxima
    if (personagem.velocidadeX > 2) personagem.velocidadeX = 2;
    if (personagem.velocidadeX < -2) personagem.velocidadeX = -2;

    // Atualiza a posição do personagem horizontalmente
    personagem.x += personagem.velocidadeX;

    // Movimento vertical (gravidade e pulo)
    if (personagem.pulando) {
        personagem.velocidadey -= gravidade;
        personagem.y -= personagem.velocidadey;

        if (personagem.y >= chaoY - personagem.altura) {
            personagem.y = chaoY - personagem.altura;
            personagem.velocidadey = 0;
            personagem.pulando = false;
        }
    }
}

// Função para desenhar o obstaculo
function desenharObstaculo() {
    ctx.drawImage(imgInimigo, obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

// Função para atualizar o movimento do obstaculo
function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidade;

    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.velocidade += 0.2;  // Aceleração mais lenta
    }
}

// Função para verificar colisão
function verificarColisão() {
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        gameOver = true;
    }
}

function fundo (){
    ctx.drawImage(imgFundo, 0, 0, canvas.width, canvas.height);
}
// Função principal do loop de animação
function loop(timestamp) {
    deltaTime = timestamp - lastFrameTime;
    // Só executa o loop se o tempo entre os frames for suficiente para manter o FPS constante
    if (deltaTime >= 100 / FPS) {
        if (!gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fundo();
            desenharPersonagem();
            verificarColisão();
            desenharObstaculo();
            atualizarObstaculo();
            atualizarPersonagem();

            lastFrameTime = timestamp; // Atualiza o tempo do último quadro
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(imgMorte, 0, 0, canvas.width, canvas.height);
            ctx.font = '40px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText('Você morreu! Clique para reiniciar', 100, canvas.height / 2);
        }
    }
    requestAnimationFrame(loop);  // Continuar chamando o loop
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    if (gameOver) {
        // Resetando as variáveis
        gameOver = false;
        personagem.x = 100;
        personagem.y = chaoY - 150;
        personagem.velocidadey = 0;
        personagem.pulando = false;
        obstaculo.x = 900;
        obstaculo.velocidade = 1;
        loop(performance.now());  
    }
}

// Adiciona evento de clique para reiniciar o jogo
canvas.addEventListener('click', reiniciarJogo);

// Aguardar as imagens carregarem e só iniciar o jogo depois do clique
imgPersonagem.onload = imgInimigo.onload = imgPersonagemPulo.onload = () => {
    canvas.addEventListener('click', () => {
        loop(performance.now());  // Inicia o jogo apenas após o clique
    });
};
