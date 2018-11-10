function userToHack(user) {
    $("#welcome").hide("slow");
    $("#guessResponse").empty();
    $("#guessContainer").show("slow");
    //$("#whoYoureAttacking").hide("slow");
    $("#whoYoureAttacking").empty();
    $("#whoYoureAttacking").append(user);
    //$("#whoYoureAttacking").show("slow");
    var someJSON = new Object();
    someJSON.username = user;
    var sendJSON = JSON.stringify(someJSON);
    $.ajax({
        url: "/passLength",
        type: "POST",
        data: sendJSON,
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            console.log("this password has " + data + " characters.");
            for (var i = 0; i < data; i++) {
                var html = '<i class="far fa-circle"></i>';
                $("#guessResponse").append(html);
            }
        }
    });
}

function userHacked(user) {
    $("#hackedUserInfo").empty();
    $("#hackedUserInfo").append("<h4>The account " + user + " has already been compromised.</h4>" +
        "<h5>Before they were compromised, they cracked [insert number here] accounts.</h5>");
}

$(document).ready(function() {

    $.getJSON("/userList", function(data) {
        for (var i = 1; i < data.length; i++) {
            if (data.hacked) {
                var hackedUser = '<li class="nav-item" onclick = "userHacked(\'' + data[i].username + '\')><s style="color:red">' + data[i].username + '</s></li>'
                $("#listOfUsers").append(html);
            }
            else {
                var html = '<li class="nav-item" onclick = "userToHack(\'' + data[i].username + '\')">' + data[i].username + '</li>';
                $("#listOfUsers").append(html);
            }
        }
    });

    $("#submitPassword").click(function() {
        var pass = $("#passwordGuess").val();
        if (!pass) {
            $("#wronginputText").empty();
            console.log("password is empty");
            $("#wronginputText").append("no password input");
            return;
        }
        var user = $("#whoYoureAttacking").html();
        var someJSON = new Object();
        someJSON.username = user;
        someJSON.password = pass;
        var sendJSON = JSON.stringify(someJSON);
        $.ajax({
            url: "/tryHack",
            type: "POST",
            data: sendJSON,
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                console.log(data);
                if (data.status == "success") {
                    console.log("you guessed the password, nice");
                }
                else if (data.status == "wrong length") {
                    $("#wronginputText").empty();
                    console.log("password length is wrong");
                    $("#wronginputText").html("password is not the right length");
                }
                else {
                    $("#guessResponse").empty();
                    for (var i = 0; i < data.right; i++) {
                        var html = '<i class="fas fa-circle" style="color:green">';
                        $("#guessResponse").append(html);
                    }
                    for (var i = 0; i < data.partial; i++) {
                        var html = '<i class="fas fa-circle" style="color:red">';
                        $("#guessResponse").append(html);
                    }
                    for (var i = 0; i < data.wrong; i++) {
                        var html = '<i class="far fa-circle"></i>';
                        $("#guessResponse").append(html);
                    }
                }
            }
        });
    });
});
