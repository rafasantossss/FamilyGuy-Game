const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');

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


class Entidade{
    #gravidade
    constructor(x,y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5
    }
    get gravidade(){
    return this.#gravidade
}
}
class personagem extends Entidade{
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.velocidadey = velocidadey;
    }
}
class obstaculo extends Entidade{
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.velocidadex = velocidadex;
    }
}

const x = new Entidade(10,20,30,40)
console.log(x.gravidade); 

function loop() {
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
        }
    }