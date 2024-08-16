// Variáveis da bolinha
let xBolinha = 400;
let yBolinha = 225;
let diametro = 25;
let raio = diametro / 2;

// Velociddade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;

//Tamanho Raquete
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Posição Minha Raquete
let xRaquete = 5;
let yRaquete = 175;

//Posição Raquete Oponente
let xRaqueteOponente = 785;
let yRaqueteOponente = 200;

let colidiu = false;

//Placar Jogo
let meusPontos = 0;
let pontosOponente = 0;

//Linha Central
let xLinha1 = 400;
let yLinha1 = 0;
let xLinha2 = 400;
let yLinha2 = 450;

//Sons do Jogo
let raquetada;
let ponto;
let trilha;

function preload(){
 trilha = loadSound("trilha.mp3");
 ponto = loadSound("ponto.mp3");
 raquetada = loadSound("raquetada.mp3")
  }

function setup() {
  createCanvas(800, 450);
  trilha.loop();
}

function draw() {
  background(25);

  //Divisão campo
  linhaCentral();

  //bolinha
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();

  //Raquetes
  //Minha Raquete
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);

  //Raquete Oponente
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);

  //Placar
  mostraPlacar();
  marcaPonto();
}

//Funções

//Linha divisória
function linhaCentral() {
  line(xLinha1, yLinha1, xLinha2, yLinha2);
  stroke(255, 250, 250);
 }

//Função Bolinha
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

//Função Raquete
function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(87)) {
    yRaquete -= 10;
  }
  if (keyIsDown(83)) {
    yRaquete += 10;
  }
}

//Movimenta Raquete Oponente
function movimentaRaqueteOponente() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }
}

//Verificação de Colisão com a Raquete
function verificaColisaoRaquete(x, y) {
  if (
    xBolinha - raio < xRaquete + raqueteComprimento &&
    yBolinha - raio < yRaquete + raqueteAltura &&
    yBolinha + raio > yRaquete
  ) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura,
    xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

//Pontuação
function mostraPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(24);
  fill(color(255, 140, 0));
  rect(275, 27, 50, 30);
  fill(255);
  text(meusPontos, 300, 50);
  fill(color(255, 140, 0));
  rect(475, 27, 50, 30);
  fill(255);
  text(pontosOponente, 500, 50);
 }

function marcaPonto() {
  if(xBolinha > 785) {
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 15) {
    pontosOponente += 1;
  ponto.play();
  }
}
