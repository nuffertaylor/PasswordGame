$(document).ready(function() {
    $("#submitLogIn").click(function() {
        var username = $("#user").val();
        var password = $("#pass").val();
        if (!username) {
            alert("You're missing a username!");
        }
        else if (!password) {
            alert("You're missing a password!");
        }
        else {
            var someJSON = "{username :" + username + " password : " + password + "}";
            $.post("/login", someJSON, function(data) {
                console.log("successfully sent data");
                console.log(data);
                if (data == "success") {
                    //print welcome

                }
                else if (data == "hacked") {
                    //print your account has been compromised
                }
                else if (data == "failure") {

                }
            });
        }
    });

    $("#registerUser").click(function() {
        var username = $("#user").val();
        var password = $("#pass").val();
        if (!username) {
            alert("You're missing a username!");
        }
        else if (!password) {
            alert("You're missing a password!");
        }
        else {
            var someJSON = "{username :" + username + " password : " + password + "}";
            $.post("/register", someJSON, function(data) {
                console.log("successfully sent data");
                console.log(data);
                if (data == "success") {
                    alert("congrats, you're registered " + username);
                }
                else if (data == "failure") {
                    alert("sorry, that username is taken.");
                }
            });
        }
    })
});
