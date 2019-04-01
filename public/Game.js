"use strict"; 
var deck1 = new deck();
var player1 = new Player("hojme", 100);
const dealer = new Dealer();
$(document).ready(setup);

function setup() {
    $("#betplus").click(function () {
        $("#betamount").text(parseInt($("#betamount").text()) + 50);
    })
    $("#betmin").click(function () {
        if ($("#betamount").text() > 50) {
            $("#betamount").text(parseInt($("#betamount").text()) - 50);
        }
    })
    $("#newgame").click(function () {
        newgame();
    })
    $("#newgame").hide();
    $(".userbtns").hide();
    $("#addbalance").click(function(){
        player1.saldo += 100;
        $("#playerbalanceamount").text(player1.saldo);
    })
    $("#addbalance").hide();
    $("#placebet").click(function () {
        if (player1.saldo >= parseInt($("#betamount").text())) {
            dealstartinghands();
            $("#stand").prop("disabled", false);
            $("#hitme").prop("disabled", false);
            $("#placebet").prop("disabled", true);
        }
        else{
            alert("Your balance is to low.");
        }
    })
    $("#hitme").click(hitMe);
    $("#stand").click(function(){
        $("#stand").prop("disabled", true);
        $("#hitme").prop("disabled", true);
        dealerMoves();
    });
    $("#playerbalanceamount").text(player1.saldo);
    $("#stand").prop("disabled", true);
    $("#hitme").prop("disabled", true);
}

function hitMe() {
    player1.cards.push(deck1.deal());
    updatePlayerCards();
    checkpoints();
}
function dealstartinghands() {
    deck1 = new deck();
    for (let i = 0; i < 2; i++) {
        player1.cards[i] = deck1.deal();
        updatePlayerCards();
    }
    dealer.cards[0] = deck1.deal();
    showdealerstartinghand();
    updatepoints();
    checkforblackjack();
}
function updatePlayerCards() {
    $("#playercards").append("<img src=\"Bilder/Kortlek/" + player1.cards[player1.cards.length - 1].cardurl + "\"/>");
    updatepoints();
}
function updateDealerCards() {
    $("#dealercards").append("<img src=\"Bilder/Kortlek/" + dealer.cards[dealer.cards.length - 1].cardurl + "\"/>");
    updatepoints();
}
function showdealerstartinghand(){
    $("#dealercards").append("<img src=\"Bilder/Kortlek/" + dealer.cards[dealer.cards.length - 1].cardurl + "\"/>");
    $("#dealercards").append("<img id=\"cardback\" src=\"Bilder/Kortlek/redback.png\"/>");
}
function updatepoints() {
    $("#playerpointstxt").text(player1.points());
    $("#dealerpointstxt").text(dealer.points());
}

function dealerMoves() {
    $("#cardback").remove();
    dealer.cards.push(deck1.deal());
    updateDealerCards();
    while (dealer.points() < 16 && dealer.points() < player1.points()) {
        dealer.cards.push(deck1.deal());
        updateDealerCards();
    }
    displaywinner();
}

function displaywinner() {
    $("#endofroundmessage").css("display", "flex");
    if (player1.points() <= dealer.points() && dealer.points() < 22) {
        $("#endofroundmessage").text("Dealer wins!");
        player1.saldo -= parseInt($("#betamount").text());
    }
    else if (player1.points() > 21) {
        $("#endofroundmessage").text("Dealer wins!");
        player1.saldo -= parseInt($("#betamount").text());
    }
    else {
        $("#endofroundmessage").text("You won!");
        player1.saldo += parseInt($("#betamount").text());
    }
    $(".userbtns").prop("disabled", true);
    $("#newgame").show();
}
function dealerwins(){
    dealer.cards[1] = deck1.deal();
    $("#cardback").remove();
    $("#dealercards").append("<img src=\"Bilder/Kortlek/" + dealer.cards[dealer.cards.length - 1].cardurl + "\"/>");
    updatepoints();
}

function checkpoints() {
    if (player1.points() == 21 && player1.cards.length == 2) {
        dealerwins();
        displaywinner();
    }
    else if (player1.points() > 21) {
        dealerwins();
        displaywinner();
    }
}
function newgame() {
    player1.reset();
    dealer.reset();
    $("#playerbalanceamount").text(player1.saldo);
    $("#newgame").hide();
    $(".userbtns").prop("disabled", false);
    $("#endofroundmessage").css("display", "none");
    $("#playercards").empty();
    $("#dealercards").empty();
    $("#playerpointstxt").empty();
    $("#dealerpointstxt").empty();
    $("#stand").prop("disabled", true);
    $("#hitme").prop("disabled", true);
    $("#placebet").prop("disabled", false);
}
function checkforblackjack(){
    if(player1.points() == 21)
    {
        $("#endofroundmessage").css("display", "flex");
        $("#endofroundmessage").text("Black Jack!");
        player1.saldo += parseInt($("#betamount").text() * 1.5);
        $(".userbtns").prop("disabled", true);
        $("#newgame").show();
    }
}
