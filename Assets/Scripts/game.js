let game = {
  cards: [],
  cardsOnPlay: [],

  createCards: function () {
    return new Promise((resolve, reject) => {
      try {
        interface.techs.forEach(tech => {
          for (let i = 0; i < 2; i++) {
            //Creates 2 cards for each tech
            let order = Math.round(Math.random() * 100)
            let card = {
              id: interface.idSeq,
              tech: tech,
              solved: false,
              innerHTML: interface.cardHTMLModel(interface.idSeq, tech, order)
            }
            game.cards.push(card) //Pushes card created into cards array (see game.js)
            interface.idSeq += 1
          }
        })
        resolve()
      } catch (error) {
        console.log(error)
        reject()
      }
    })
  },

  solvedCard: function (card) {
    let res = this.cards[card.id].solved
    return res
  },

  checkSolvedPair: function () {
    let card1 = this.cards[this.cardsOnPlay[0]]
    let card2 = this.cards[this.cardsOnPlay[1]]
    if (card1.tech == card2.tech && card1.id != card2.id) {
      card1.solved = true
      card2.solved = true
      this.cardsOnPlay=[]
      if(!this.checkVictory()) {
        return true
      }
    } else {
      return false
    }
  },

  checkVictory: function () {
    let solvedCounter = 0
    this.cards.forEach(card => {
      if (card.solved==true) {solvedCounter += 1}
    });
    if (solvedCounter == 20) {
      interface.gameOver()
      return true
    } else {return false}
  }
}