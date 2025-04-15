class Entidade {
    constructor(x, y, largura, altura, cor) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;
    }

    desenhar() {
        ctx.fillStyle = this.cor;
        ctx.beginPath();
        ctx.moveTo(this.x + this.largura / 2, this.y);
        ctx.lineTo(this.x, this.y + this.altura);
        ctx.lineTo(this.x + this.largura, this.y + this.altura);
        ctx.closePath();
        ctx.fill();
    }

    colidiuCom(outro) {
        return (
            this.x < outro.x + outro.largura &&
            this.x + this.largura > outro.x &&
            this.y < outro.y + outro.altura &&
            this.y + this.altura > outro.y
        );
    }
}
class Jogador extends Entidade {
    constructor(x, y) {
        super(x, y, 40, 40, 'lime');
    }

    mover() {
        if (teclas['ArrowLeft']) this.x -= 3;
        if (teclas['ArrowRight']) this.x += 3;
        this.x = Math.max(0, Math.min(canvas.width - this.largura, this.x));
    }
}
class Tiro extends Entidade {
    constructor(x, y) {
        super(x, y, 5, 10, 'white');
        this.vel = 8;
    }

    atualizar() {
        this.y -= this.vel;
    }
}
class Alien extends Entidade {
    constructor(x, y, vel) {
        super(x, y, 40, 40, 'red');
        this.vel = vel;
    }

    atualizar() {
        this.y += this.vel;
    }
}
const jogador = new Jogador(canvas.width / 2 - 20, canvas.height - 40);

function atirar() {
    const agora = Date.now();
    if (agora - tempoUltimoTiro > 300) {
        const xTiro = jogador.x + jogador.largura / 2 - 2.5;
        tiros.push(new Tiro(xTiro, jogador.y));
        tempoUltimoTiro = agora;
        somTiro.play();
    }
}
function criarAlien() {
    const x = Math.random() * (canvas.width - 40);
    aliens.push(new Alien(x, 0, velocidadeAlien));
}