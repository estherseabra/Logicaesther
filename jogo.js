<!DOCTYPE html>
<html>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <div class="card text-center">
            <div class="card-header">RPG da Esther</div>
            <div class="card-body" id="tela"style="background-image: url('assets/background.gif')">
            <p class="card-text"> Turno 1 </p>
            <div class="row">
                <div class="col text-start" id="col-heroi">
                    <ul class="list-group float-start text-center" style="width: 225px;">
                        <li id="titulo-heroi" class="list-group-item" style="background-color: rgba(0, 255, 255, 0);">⚔️</li>
                        <li id="nome-heroi" class="list-group-item" style="background-color: rgba(0, 255, 255, 0) ;">Eren</li>
                        <li id="" class="list-group-item" style="background-color: rgba(0, 255, 255, 0);">❤️ <progress id="hp-heroi" value="100" max="100"
                                style="accent-color: red;"></progress></li>
                        <li id="" class="list-group-item" style="background-color: rgba(0, 255, 255, 0);">🧪 <progress id="mp-heroi" value="100"
                                max="100"></progress></li>
                        <li id="" class="list-group-item" style="background-color: rgba(0, 255, 255, 0);">⚡<progress id="en-heroi" value="0" max="100"
                                style="accent-color: orange;"></progress></li>
                    </ul>
                </div>
                <div class="col" id="col-boss">
                    <ul class="list-group float-end" style="width: 225px;">
                        <li id="titulo-boss" class="list-group-item" style="background-color: rgba(0, 255, 255, 0);">⚔️</li>
                        <li id="nome-boss" class="list-group-item" style="background-color: rgba(0, 255, 255, 0);">Titã</li>
                        <li id="" class="list-group-item" style="background-color: rgba(0, 255, 255, 0);">❤️ <progress id="hp-boss" value="100" max="100"
                                style="accent-color: red;"></progress></li>
                        <li id="" class="list-group-item" style="background-color: rgba(0, 255, 255, 0);">🧪 <progress id="en-boss" value="100"
                                max="100"></progress></li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col text-end" id="col-botoes">
                    <img src="assets/samurai1.gif" width="300px" height="250px">
                </div>
                <div class="col text-start" id="col-msg">
                    <img src="assets/eskeleto_boss.gif" width="300px" height="250px">
                </div>
                <div class="btn-group" id="controles">
                </div>
            </div>
            <div class="card-footer"></div>
        </div> <!-- card -->
    </div> <!-- container -->
</body>
<script src="jogo.js"></script>
</html>



class Personagem {
    constructor(nome, titulo, hp, mana, energia) {
        this.nome = nome;
        this.titulo = titulo;
        this.hp = hp;
        this.mana = mana;
        this.energia = energia;
    }
    atacar(alvo, habilidade) {
        //veriificar se tem mana e energia
        if (this.mana >= habilidade.custo
            && this.energia >= habilidade.energia) {
            // dano no alvo
            alvo.hp -= habilidade.dano;
            // debitar mana
            if (habilidade.custo > 0) {
                this.mana -= habilidade.custo;
                this.energia += 50;
            }
            // esvaziar energia
            if (habilidade.energia > 0) {
                this.energia = 0;
            }
            //retornar mensagem
            return `${this.nome} usou ${habilidade.nome}`;
        } else {
            return ` Sem mana para usar ${habilidade.nome}`;
        }
    }
    boss_atacar(alvo){
        if(this.energia == 100){
            alvo.hp -= 15;
            this.energia = 0 ;

        } else {
            this.energia += 50;
        }
    };

}

class Habilidade {
    constructor(id, nome, dano, custo, energia) {
        this.id = id;
        this.nome = nome;
        this.dano = dano;
        this.custo = custo;
        this.energia = energia;
    }

}

//instaciar (criar) os objetos
let hero = new Personagem("Anabelle", "Herói", 100, 100, 0);
let boss = new Personagem("Caçador de almas", "Boss", 100, 0, 50);

document.getElementById("nome-heroi").textContent = `${hero.nome}`;
document.getElementById("titulo-heroi").textContent = `🗡️ ${hero.titulo}`;

document.getElementById("nome-boss").textContent = `${boss.nome}`;
document.getElementById("titulo-boss").textContent = `💀🪄 ${boss.titulo}`;

const atualizarInterface = (mensagem) => {
    console.log(hero.mana)
    document.getElementById("hp-heroi").value = hero.hp;
    document.getElementById("mp-heroi").value = hero.mana;
    document.getElementById("en-heroi").value = hero.energia;
    //barras boss
    document.getElementById("hp-boss").value = boss.hp;
    document.getElementById("en-boss").value = boss.energia;

}


//criar habilidade e botões
let container = document.getElementById("controles");
let listaHabilidades = [
    new Habilidade(1, "Ataque", 4, 0, 0),
    new Habilidade(2, "Skill", 8, 10, 0),
    new Habilidade(3, "Ultimate", 15, 0, 100)
];

listaHabilidades.forEach(hab => {
    let btn = document.createElement("button");
    btn.innerText = hab.nome;
    btn.classList.add("btn");
    container.appendChild(btn);
    btn.onclick = () => {
        let mensagem = hero.atacar(boss, hab);
        atualizarInterface(mensagem);
        boss.boss_atacar(hero);
    }
}); 

