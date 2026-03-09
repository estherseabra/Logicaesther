class Conta{
    constructor( marca, modelo, cor, armazenamento, bateria)(
        this, marca = marca; 
        this, modelo = modelo; 
        this, cor = cor;
        this, armazenamento = armazenamento; 
    )
    ligarcelular(){
        this.ligado = true
    }
    mostrarbateria(){
        return "essa é a porcentagem do seu celular$(this.bateria)"
    }
    carregadorCelular(porcentagem){
        this.bateria += porcentagem
    }
}