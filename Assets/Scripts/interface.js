let interface = {
  board: document.getElementsByClassName('board')[0],
  gO: document.getElementById('gameOver'),
  idSeq: 0,
  techs: [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
  ],

  flipCard: function (event) {
    if (event.target.className == 'icon') {return}
    let card = event.target.parentElement
    if (!game.solvedCard(card)) {
      card.className += ' flip'
      game.cardsOnPlay.push(card.id)
      if (game.cardsOnPlay.length > 1) {
        if(!game.checkSolvedPair()){
          interface.unflipCards()
        }
      }
    }
  },

  unflipCards: function () {
    setTimeout(() => {
      game.cardsOnPlay.forEach(id => {
        let card = document.getElementById(id)
        card.className = "card rendered"
      });
      game.cardsOnPlay = []
    }, 800);
  },

  cardHTMLModel: function (id, tech, order) {
    return `
    <div id="${id}" class="card" data-icon="${tech}" style="order: ${order}">
      <div class="front">
        <img class="icon" src="./Assets/Images/${tech}.png">
      </div>
      <div class="back">
        &lt/&gt
      </div>
    </div>
    `
  },

  renderCards: function () {
    return new Promise((resolve, reject) => {
      try {
        game.cards.forEach(card => {
          interface.board.innerHTML += card.innerHTML
        })
        resolve()
      } catch (error) {
        console.log(error)
        reject()
      }
    })
  },

  placeCards: function () {
    let cards = document.getElementsByClassName('card')
    let tim = 0
    for (let card of cards) {
      tim += 50
      setTimeout(() => {
        card.className += " rendered"
      }, tim);
    }
  },

  gameOver: function () {
    setTimeout(() => {
      this.gO.style = "display: flex;"
    }, 1000);
  },

  restartGame: function () {
    this.gO.style = "display: none;"
    this.board.innerHTML = ""
    this.idSeq = 0
    game.cards = []
    game.cardsOnPlay = []

    onload()
  }

}

onload = async function () {
  await game.createCards()
  await interface.renderCards()
  interface.placeCards()
  let renderedCards = document.getElementsByClassName('card')
  for (let card of renderedCards) {
    card.addEventListener('click', interface.flipCard)
  }
}
