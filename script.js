'use strict';

// Seleciona elementos HTML do DOM
const score1EL = document.getElementById('score--1'); // Seleciona o elemento com o ID 'score--1'
const score0EL = document.querySelector('#score--0'); // Seleciona o elemento com o ID 'score--0'
const current0EL = document.getElementById('current--0'); // Seleciona o elemento com o ID 'current--0'
const current1EL = document.getElementById('current--1'); // Seleciona o elemento com o ID 'current--1'
const diceEl = document.querySelector('.dice'); // Seleciona o elemento com a classe 'dice'
const btnNew = document.querySelector('.btn--new'); // Seleciona o botão com a classe 'btn--new'
const btnRoll = document.querySelector('.btn--roll'); // Seleciona o botão com a classe 'btn--roll'
const btnHold = document.querySelector('.btn--hold'); // Seleciona o botão com a classe 'btn--hold'
const play0El = document.querySelector('.player--0'); // Seleciona o elemento com a classe 'player--0'
const play1El = document.querySelector('.player--1'); // Seleciona o elemento com a classe 'player--1'

// Variáveis do jogo
let scores, currentScore, activePlayer, playing;

// Função de inicialização do jogo
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Define os valores iniciais nos elementos HTML
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  // Esconde o dado
  diceEl.classList.add('hidden');

  // Remove as classes 'player--winner' e adiciona a classe 'player--active' para redefinir a aparência dos jogadores
  play0El.classList.remove('player--winner');
  play1El.classList.remove('player--winner');
  play0El.classList.add('player--active');
  play1El.classList.remove('player--active');
};

// Chama a função de inicialização para configurar o jogo no início
init();

// Função para alternar entre os jogadores
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  play0El.classList.toggle('player--active');
  play1El.classList.toggle('player--active');
};

// Função para rolar o dado quando o botão "Roll Dice" é clicado
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Gera um número aleatório de 1 a 6 (simulando um lançamento de dado)
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Exibe o valor do dado no elemento HTML correspondente
    diceEl.classList.remove('hidden');
    diceEl.src = `./src/dice-${dice}.png`;

    // 3. Verifica se o valor do dado é diferente de 1; se for verdade, adiciona o valor ao placar atual do jogador ativo
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Se o valor do dado for 1, muda para o próximo jogador
      switchPlayer();
    }
  }
});

// Função para "segurar" a pontuação atual quando o botão "Hold" é clicado
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Adiciona a pontuação atual ao placar do jogador ativo
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Verifica se a pontuação do jogador ativo é maior ou igual a 100; se for verdade, encerra o jogo
    if (scores[activePlayer] >= 100) {
      playing = false;

      // Adiciona a classe 'player--winner' ao jogador vencedor e remove a classe 'player--active'
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // Esconde o dado
      diceEl.classList.add('hidden');
    } else {
      // 3. Se não houver vencedor, muda para o próximo jogador
      switchPlayer();
    }
  }
});

// Função para reiniciar o jogo quando o botão "New Game" é clicado
btnNew.addEventListener('click', init);
