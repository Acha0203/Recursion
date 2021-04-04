class Card {
    constructor(suit, value, intValue) {
        this.suit = suit;
        this.value = value;
        this.intValue = intValue;
    }

    getCardString() {
        return this.suit + this.value + "(" + this.intValue + ")";
    }
}

class Deck {
    constructor() {
        this.deck = Deck.generateDeck();
    }

    static generateDeck() {
        let newDeck = [];
        const suits = ["♣︎", "♦︎", "❤︎", "♠︎"];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                let intValue = (values[j] === "A") ? 14: j + 1;
                newDeck.push(new Card(suits[i], values[j], intValue));
            }
        }
        return newDeck;
    }

    draw() {
        return this.deck.pop();
    }

    printDeck() {
        console.log("Displaying cards...");
        for (let i = 0; i < this.deck.length; i++) {
            console.log(this.deck[i].getCardString());
        }
    }

    shuffulDeck() {
        let deckSize = this.deck.length;
        for (let i = deckSize - 1; i >= 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }
}

class Dealer {
    static startGame() {
        let table = {
            "players":[],
            "deck":new Deck()
        }

        table["deck"].shuffulDeck();

        for (let i = 0; i < 2; i++) {
            let playerCard = [];
            for (let j = 0; j < 5; j++) {
                playerCard.push(table["deck"].draw());
            }
            table["players"].push(playerCard);
        }

        return table;
    }

    static printTableInformation(table) {
        for (let i = 0; i < table["players"].length; i++) {
            console.log("Player " + (i + 1) + " hand is:");
            for (let j = 0; j < table["players"][i].length; j++) {
                console.log(table["players"][i][j].getCardString());
            }
        }        
    }

    // Pair of cardsの勝者を返す。
    static winnerPairOfCards(table) {
        let player1Cards = HelperFunctions.getHashmapOfCards(table["players"][0]);
	    let player2Cards = HelperFunctions.getHashmapOfCards(table["players"][1]);
	    let numberOfP1Cards = Object.keys(player1Cards).length;
	    let numberOfP2Cards = Object.keys(player2Cards).length;

	    while (numberOfP1Cards > 0 || numberOfP2Cards > 0) {
            let p1StrongestCards = HelperFunctions.getStrongestCards(player1Cards);
            let p2StrongestCards = HelperFunctions.getStrongestCards(player2Cards);
		    let p1MaxNumber = p1StrongestCards[0];
		    let p2MaxNumber = p2StrongestCards[0];
		    let p1StrongestRank = p1StrongestCards[1];
		    let p2StrongestRank = p2StrongestCards[1];

		    if (p1MaxNumber > p2MaxNumber) {
                return "player 1 is the winner";
            } else if (p1MaxNumber < p2MaxNumber) {
                return "player 2 is the winner";
            } else {
                if (p1StrongestRank > p2StrongestRank) {
			        return "player 1 is the winner";
		        } else if (p1StrongestRank < p2StrongestRank) {
                    return "player 2 is the winner";
                } else {
                    delete player1Cards[p1StrongestRank];
			        delete player2Cards[p2StrongestRank];
			        numberOfP1Cards = Object.keys(player1Cards).length;
			        numberOfP2Cards = Object.keys(player2Cards).length;
                }
            }
        }
	    return "It is a draw";
    }
}

class HelperFunctions {
    // string[] player -> hashmap hashmapOfCards{rank: number}
    static getHashmapOfCards(player) {
        let hashmapOfCards = {};
        let ranksOfCards = [];

        for (let i = 0; i < player.length; i++) {
            ranksOfCards.push(player[i].intValue);
        }

        for (let i = 0; i < ranksOfCards.length; i++) {
            if (hashmapOfCards[ranksOfCards[i]] === undefined) hashmapOfCards[ranksOfCards[i]] = 1;
            else hashmapOfCards[ranksOfCards[i]]++;
        }
    
    return hashmapOfCards;
}

    // hashmap cards{rank: number} -> int[] strongestCards
    // 手札の中の最も枚数が多いランクとその枚数を配列 strongestCards で返す
    static getStrongestCards(cards) {
	    let keys = Object.keys(cards);
	    let strongestRank = 0;
	    let maxNumber = 0;
	    let strongestCards = [];

	    for (let i = 0; i < keys.length; i++) {
		    if (cards[keys[i]] >= maxNumber && parseInt(keys[i], 10) >= strongestRank) {
			    maxNumber = cards[keys[i]];
			    strongestRank = parseInt(keys[i], 10);
		    }
	    }

	    strongestCards.push(maxNumber);
	    strongestCards.push(strongestRank);
	    return strongestCards;
    }
}

let table1 = Dealer.startGame();
Dealer.printTableInformation(table1);
console.log(Dealer.winnerPairOfCards(table1));