$(document).ready(function() {

//transitions between the three main pages
    $("#createUser").click(function() {
        $("#homePage").hide("slow");
        $("#registration").show("show");
    });

    $("#logIn").click(function() {
        $("#homePage").hide("slow");
        $("#loggingIn").show("slow");

    });

    $(".returnHome").click(function() {
        $("#registration").hide("slow");
        $("#loggingIn").hide("slow");
        $("#homePage").show("slow");
    });
    
    
//Login
    $("#submitLogIn").click(function() {
        $("#failure").empty();
        var username = $("#user1").val();
        var welcomeMsg = "<h3>Welcome " + username + "</h3>";
        var hackedMsg = "<h3>The account " + username + " has been compromised.</h3>";
        var password = $("#pass1").val();
        if (!username) {
            alert("You're missing a username!");
        }
        else if (!password) {
            alert("You're missing a password!");
        }
        else {
            var someJSON = new Object();
            someJSON.username = username;
            someJSON.password = password;
            console.log(someJSON);
            var sendJSON = JSON.stringify(someJSON);
            console.log(sendJSON);
            $.ajax({
                url: "/login",
                type: "POST",
                data: sendJSON,
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    console.log("successfully sent data");
                    console.log(data);
                    if (data == "success") {
                        $("#welcome").append(welcomeMsg);
                        $("#loggingIn").hide("slow");
                        $("#welcome").show("slow");
                        $("#hackTime").load("crack.html")
                    }
                    else if (data == "hacked") {
                        $("#welcome").append(hackedMsg);
                        $("#loggingIn").hide("slow");
                        $("#welcome").show("slow");
                    }
                    else if (data == "failure") {
                        $("#failure").html("Username or Password is Incorrect");
                        var username = $("#user").val("");
                        var password = $("#pass").val("");
                    }
                }
            });
        }
    });

//registration
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
            var someJSON = new Object();
            someJSON.username = username;
            someJSON.password = password;
            console.log(someJSON);
            var sendJSON = JSON.stringify(someJSON);
            console.log(sendJSON);

            $.ajax({
                url: "/register",
                type: "POST",
                data: sendJSON,
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    console.log("successfully sent data");
                    if (data == "success") {
                        alert("congrats, you're registered " + username);
                    }
                    else if (data == "failure") {
                        alert("sorry, that username is taken.");
                    }
                }
            });
        }
    });
});
