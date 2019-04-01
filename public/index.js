$(document).ready(function () {
    $("#registerbtn").click(function () {
        let name = document.querySelector("#usernametb").value;
        let passw = document.querySelector("#passwordtb").value;

        let obj = { "username": name, "password": passw };
        $.post('/registeruser/', obj, function (response) {

        })
        alert("Registry was succesful!");
    })
    $("#login").click(function(){
        $.get('/getusers/', function(users){
            let name = document.querySelector("#usernametb").value;
            let passw = document.querySelector("#passwordtb").value;
            for(let user of users)
            {
                if(user.username == name && user.password == passw)
                {
                    $(".userbtns").show();
                    $("#betinfo").css("display", "flex");
                    $("#login").hide();
                    $("#logout").show();
                    $("#registerbtn").hide();
                    $("#loginbox").hide();
                    player1 = new Player(user.username, user.balance);
                    $("#playerbalanceamount").text(player1.saldo);
                    $("#addbalance").show();
                    return;
                }
            }
            alert("Username or password is incorrect.");        
        })
    })
    $("#logout").click(function(){
        let name = player1.name;
        let balance = player1.saldo;

        let obj = { "username": name, "balance": balance };
        $.post('/updateuser/', obj, function (response) {

        })
        player1.reset();
        dealer.reset();
        $("#playercards").empty();
        $("#dealercards").empty();
        $("#playerpointstxt").empty();
        $("#dealerpointstxt").empty();
        $(".userbtns").hide();
        $("#betinfo").css("display", "none");
        $("#login").show();
        $("#logout").hide();
        $("#registerbtn").show();
        $("#loginbox").show();
        $("#playerbalanceamount").text("");
        $("#addbalance").show();
    })
})

