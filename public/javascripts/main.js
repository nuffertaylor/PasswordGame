$(document).on("click", ".returnHome", function() {
    $("#registration").hide("slow");
    $("#loggingIn").hide("slow");
    $("#welcome").hide("slow");
    $("#homePage").show("slow");
    // or just use
    //document.location.reload();
});

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$(document).ready(function() {

    //transitions between the three main pages
    $("#createUser").on("click", function() {
        $("#homePage").hide("slow");
        $("#registration").show("show");
    });

    $("#logIn").click(function() {
        $("#homePage").hide("slow");
        $("#loggingIn").show("slow");

    });

    //Login
    $("#submitLogIn").click(function() {
        $("#failure").empty();
        var username = $("#user1").val();
        var welcomeMsg = "<h3>Welcome " + username + "</h3>";
        var hackedMsg = '<h3>The account ' + username + ' has been compromised.</h3>' +
            '<button class="btn returnButton returnHome">Return</button>';
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
                        $("#welcome").empty();
                        $("#welcome").append(welcomeMsg);
                        $("#loggingIn").hide("slow");
                        $("#welcome").show("slow");
                        $("#hackTime").load("crack.html")
                        setCookie("username", someJSON.username, 2);
                    }
                    else if (data == "hacked") {
                        $("#welcome").empty();
                        $("#welcome").append(hackedMsg);
                        $("#loggingIn").hide("slow");
                        $("#welcome").show("slow");
                        $("#user1").val("");
                        $("#pass1").val("");
                    }
                    else if (data == "failure") {
                        $("#failure").html("Username or Password is Incorrect");
                        var username = $("#user1").val("");
                        var password = $("#pass1").val("");
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
        else if (password.length > 8) {
            alert("i'm sorry, but your password is too secure. please keep your password under 8 characters.");
            $("#pass").val("");
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
                        $("#user").val("");
                        $("#pass").val("");
                    }
                    else if (data == "failure") {
                        alert("sorry, that username is taken.");
                    }
                }
            });
        }
    });
});
