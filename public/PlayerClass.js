class Player{
    constructor()
    {
        this.name = arguments[0];
        this.saldo = arguments[1];
        this.cards = [];
    }
    points()
    {
        let points = 0;
        for(let i = 0; i < this.cards.length; i++)
        {
            points += this.cards[i].points;           
        }
        
        if(points > 21)
        {
            for(let j = 0; j < this.cards.length; j++)
            {
                if(this.cards[j].value === "Ace")
                {
                    return points - 10;
                }
            }
        }
        return points;
    }
    reset()
    {
        this.cards = [];
    }
}

class Dealer extends Player{
    constructor()
    {
        super();
    }
}