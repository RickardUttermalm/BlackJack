class card {
    constructor(value, suite, points) {
        this.value = value;
        this.suite = suite;
        this.points = points;
        this.cardurl = this.value + "_" + this.suite + ".png";
    }
}
class deck {
    constructor() {
        this.deck = [];
        let suites = ["of_hearts", "of_diamonds", "of_spades", "of_clubs"];
        let values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
        let points = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
        for (let i = 0; i < suites.length; i++) {
            for (let j = 0; j < values.length; j++) {
                this.deck.push(new card(values[j], suites[i], points[j]));
            }
        }
        let rnd;
        for (var i = this.deck.length - 1; i > 0; i--) {
            rnd = Math.floor(Math.random() * i);
            [this.deck[i], this.deck[rnd]] = [this.deck[rnd], this.deck[i]];
        }
    }
    deal() {
        return this.deck.pop();
    }
}
