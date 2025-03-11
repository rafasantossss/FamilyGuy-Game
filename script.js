const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');

const chaoY = canvas.height - 50;

const personagem = {
    x: 100,
    y: chaoY - 150,
    largura: 110,
    altura: 150,
    velocidadeX: 0,
    aceleracao: 0.5,
    desaceleracao: 0.5,
    velocidadey: 0,
    pulando: false,
    larguraPulo: 115,
    alturaPulo: 120,
    imagemAndando: 0,
    imagemPadrao: true,
};

const obstaculo = {
    x: 900,
    y: chaoY - 150,
    largura: 100,
    altura: 150,
    velocidade: Math.random() * (6 - 3) + 3 
};

const lois = {
    x: 1200,
    y: chaoY - 150,
    largura: 150,
    altura: 150,
    velocidade: Math.random() * (6 - 3) + 3  
};

const gravidade = 0.5;

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

const imgLois = new Image();
imgLois.src = 'lois.png';

const imgPersonagemAndando = [
    new Image(),
    new Image(),
    new Image(),
];
imgPersonagemAndando[0].src = '1.png';
imgPersonagemAndando[1].src = '2.png';
imgPersonagemAndando[2].src = '3.png';

let gameOver = false;

let teclas = {
    esquerda: false,
    direita: false,
    espaco: false
};

const FPS = 60;
let lastFrameTime = 0;
let deltaTime = 0;

let velocidadeQueda = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !personagem.pulando) {
        personagem.velocidadey = 15;
        personagem.pulando = true;
    }
    if (e.code === 'KeyD') {
        teclas.direita = true;
    }
    if (e.code === 'KeyA') {
        teclas.esquerda = true;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyS') {
        velocidadeQueda = 5;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyS') {
        velocidadeQueda = 0;
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

function desenharPersonagem() {
    ctx.save();

    if (personagem.pulando) {
        if(teclas.esquerda){
            ctx.scale(-1, 1);
            ctx.drawImage(imgPersonagemPulo, -personagem.x - personagem.largura, personagem.y, personagem.largura, personagem.altura);
            ctx.restore();
        } else {
            ctx.drawImage(imgPersonagemPulo, personagem.x, personagem.y, personagem.largura, personagem.altura);
        }
    } else {
        if (teclas.direita || teclas.esquerda) {
            // Se o personagem está andando, alterna entre as imagens de caminhada
            const imagemAndando = imgPersonagemAndando[Math.floor(Date.now() / 100) % 3];

            if (teclas.esquerda) {
                ctx.scale(-1, 1);
                ctx.drawImage(imagemAndando, -personagem.x - personagem.largura, personagem.y, personagem.largura, personagem.altura);
                ctx.restore();
            } else {
                ctx.drawImage(imagemAndando, personagem.x, personagem.y, personagem.largura, personagem.altura);
            }
        } else {
            // Se o personagem não está andando, usa a imagem padrão
            ctx.drawImage(imgPersonagem, personagem.x, personagem.y, personagem.largura, personagem.altura);
        }
    }
}

function atualizarPersonagem() {
    if (teclas.direita) {
        personagem.velocidadeX += personagem.aceleracao;
    } else if (teclas.esquerda) {
        personagem.velocidadeX -= personagem.aceleracao;
    } else {
        personagem.velocidadeX *= personagem.desaceleracao;
    }

    if (personagem.velocidadeX > 5) personagem.velocidadeX = 5;
    if (personagem.velocidadeX < -5) personagem.velocidadeX = -5;

    personagem.x += personagem.velocidadeX;

    if (personagem.pulando) {
        personagem.velocidadey -= gravidade;
        personagem.velocidadey -= velocidadeQueda;
        personagem.y -= personagem.velocidadey;

        if (personagem.y >= chaoY - personagem.altura) {
            personagem.y = chaoY - personagem.altura;
            personagem.velocidadey = 0;
            personagem.pulando = false;
        }
    }
}

function desenharObstaculo() {
    ctx.drawImage(imgInimigo, obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidade;
    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.velocidade += Math.random() * (0.4 - 0.2) + 0.1;
    }

    if (obstaculo.velocidade > 12) obstaculo.velocidade = 12;
}

function desenharLois() {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(imgLois, -lois.x - lois.largura, lois.y, lois.largura, lois.altura);
    ctx.restore();
}

function atualizarLois() {
    lois.x -= lois.velocidade;
    if (lois.x <= 0 - lois.largura) {
        lois.x = canvas.width;
        lois.velocidade += Math.random() * (0.6 - 0.3) + 0.1;
    }

    if (lois.velocidade > 12) lois.velocidade = 12;
}

function verificarColisão() {
    const margem = 25;
    if (
        personagem.x + margem < obstaculo.x + obstaculo.largura - margem &&
        personagem.x + personagem.largura - margem > obstaculo.x + margem &&
        personagem.y + margem < obstaculo.y + obstaculo.altura - margem &&
        personagem.y + personagem.altura - margem > obstaculo.y + margem
    ) {
        gameOver = true;
    }
    if (
        personagem.x + margem < lois.x + lois.largura - margem &&
        personagem.x + personagem.largura - margem > lois.x + margem &&
        personagem.y + margem < lois.y + lois.altura - margem &&
        personagem.y + personagem.altura - margem > lois.y + margem
    ) {
        gameOver = true;
    }
}

function fundo() {
    ctx.drawImage(imgFundo, 0, 0, canvas.width, canvas.height);
}

function loop() {
    deltaTime = performance.now() - lastFrameTime;
    if (deltaTime >= 500 / FPS) {
        if (!gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fundo();
            desenharPersonagem();
            verificarColisão();
            desenharObstaculo();
            atualizarObstaculo();
            atualizarPersonagem();
            desenharLois();
            atualizarLois();

            lastFrameTime = performance.now();
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(imgMorte, 0, 0, canvas.width, canvas.height);
            ctx.font = '40px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText('Você morreu!', 100, canvas.height / 2);
        }
    }
    requestAnimationFrame(loop);
}

function reiniciarJogo() {
    if (gameOver) {
        gameOver = false;
        personagem.x = 100;
        personagem.y = chaoY - 150;
        personagem.velocidadey = 0;
        personagem.pulando = false;
        obstaculo.x = 900;
        obstaculo.velocidade = Math.random() * (6 - 3) + 3; 
        lois.velocidade = Math.random() * (6 - 3) + 3; 
        lois.x = 1200;
        loop(performance.now());
    }
}

canvas.addEventListener('click', reiniciarJogo);

imgPersonagem.onload = imgInimigo.onload = imgPersonagemPulo.onload = imgLois.onload = () => {
    canvas.addEventListener('click', () => {
        loop(performance.now());
    });
};
