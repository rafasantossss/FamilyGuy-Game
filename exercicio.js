class veiculo{
    constructor(tipo, marca, cor, velocidade, passageiros){
        this.tipo = tipo
        this. marca = marca
        this.cor = cor
        this.velocidade = velocidade
        this.passageiros = passageiros
    }
    acelerar = function(){
        this.velocidade += 10
        console.log(this.velocidade)
    }
        freiar = function(){
            if(this.velocidade > 0){
            this.velocidade -= 5
            console.log(this.velocidade)
        }else{
            console.log('Carro ta parado tanso')
        }
    }
}
    const carro = new veiculo(
   'suv',
    'mercedez',
    'cinza',
     0,
    '2'
    )

    console.log(carro)
    carro.freiar()
    carro.acelerar()
    carro.acelerar()
    carro.acelerar()
    carro.acelerar()
    carro.freiar()
    carro.freiar()
    carro.freiar()    