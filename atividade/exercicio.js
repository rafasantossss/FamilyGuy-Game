class veiculo{
    #velocidade;
    constructor(tipo, marca, cor, velocidade, passageiros){
        this.tipo = tipo
        this. marca = marca
        this.cor = cor
        this.#velocidade = velocidade
        this.passageiros = passageiros
    }
    acelerar = function(){
        this.#velocidade += 10
        console.log(this.#velocidade)
    }
        freiar = function(){
            if(this.#velocidade > 0){
            this.#velocidade -= 5
            console.log(this.#velocidade)
        }else{
            console.log('Carro ta parado tanso')
        }
    }
}

class Aviao extends veiculo{
    #mach;
    constructor(tipo, marca, cor, mach, passageiros, companhia){
        super(tipo, marca, cor, passageiros);
        this.companhia = companhia;
        this.#mach = mach;


}
        acelerar = function(){
            this.#mach += 0.1
            console.log(this.#mach)
        }
        freiar = function(){
            if(this.#mach > 0){
            this.#mach -= 0.05
            console.log(this.#mach)
        }else{
            console.log(' ta parado tanso')
        }
    }
    getMach = function(){
        return this.#mach
    }
 }


class Barco extends veiculo{
    #nos;
    constructor(tipo, marca, cor, nos, passageiros, marina){
        super(tipo, marca, cor, passageiros);
        this.marina = marina;
        this.#nos = nos;

    }
        acelerar = function(){
            this.#nos += 2
            console.log(this.#nos)
        }
        freiar = function(){
            if(this.#nos > 0){
            this.#nos -= 1
            console.log(this.#nos)
        }else{
            console.log(' ta parado tanso')
        }
    }
 }

    const carro = new veiculo('suv','mercedez','cinza',0,'2')
    console.log(carro)
    carro.acelerar()
    carro.freiar()  
    const aviao = new Aviao('comercial', 'boing', 'branco', 0, 0, 'gol')
    console.log(aviao)
    aviao.acelerar()
    aviao.freiar()
    const barco = new Barco('lancha', 'titanic', 'preto', 0, 0, 'marina azul')
    console.log(barco)
    barco.acelerar()
    barco.freiar()
    console.log(aviao.getMach())