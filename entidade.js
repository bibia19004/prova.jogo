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