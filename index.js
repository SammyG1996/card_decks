let deck_id;
const btn = document.querySelector('button');

function getADeck() {
  return new Promise((resolve, reject) =>{
    const data = axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    resolve(data)
  })
}

function getCard() {
  return new Promise((resolve, reject) => {
    const data = axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    resolve(data)
  })
}

function createCard(data) {
  const img = document.createElement('img');
  img.src = data.data.cards[0].image;
  document.querySelector('body').appendChild(img)
}

getADeck()
.then((data) => {
  deck_id = data.data.deck_id
  return getCard();
})
.then((data) => {
  createCard(data)
})
.catch((err) => console.log(err))

// Now You need to create a button to call the getCard() function and display a new card
btn.addEventListener('click', () => {
  getCard()
  .then((data) => {
    createCard(data)
  })
})
