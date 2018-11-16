$(document).on("click", ".returnHome", function()
{
    $("#registration").hide("slow");
    $("#loggingIn").hide("slow");
    $("#welcome").hide("slow");
    $("#homePage").show("slow");
    // or just use
    //document.location.reload();
});

function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname)
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(document).ready(function()
{

    //transitions between the three main pages
    $("#createUser").on("click", function()
    {
        $("#homePage").hide("slow");
        $("#registration").show("show");
    });

    $("#logIn").click(function()
    {
        $("#homePage").hide("slow");
        $("#loggingIn").show("slow");

    });
    
    $("#registrationForm").submit( function(event) {
        event.preventDefault();
        //document.getElementById("registerUser").click();
        return false;
    });
    
    $("#loginForm").submit( function(event) {
        event.preventDefault();
        //document.getElementById("submitLogIn").click();
        return false;
    });

    //Login
    $("#submitLogIn").click(function()
    {
        $("#failure").empty();
        var username = $("#user1").val();
        var welcomeMsg = "<h3 class=\"my-2 title\">Welcome " + username + ". Select a username to begin hacking." + "</h3>";
        var hackedMsg = '<h3>The account ' + username + ' has been compromised.</h3>' +
            '<button class="btn returnButton returnHome">Return</button>';
        var password = $("#pass1").val();
        if (!username)
        {
            alert("You're missing a username!");
        }
        else if (!password)
        {
            alert("You're missing a PIN!");
        }
        else
        {
            var testJSON = new Object();
            testJSON.username = getCookie("username");
            console.log(testJSON);
            var sendtJSON = JSON.stringify(testJSON);
            console.log(sendtJSON);
            $.ajax(
            {
                url: "/checkHack",
                type: "POST",
                data: sendtJSON,
                contentType: "application/json; charset=utf-8",
                success: function(data)
                {
                    console.log("successfully sent data");
                    console.log(data);
                    var hacked = false;
                    if (data == "hacked")
                    {
                        hacked = true;
                    }

                    if (getCookie("username") != "")
                    {
                        if (getCookie("username") != username && !hacked)
                        {
                            alert("You cannot log in as another user.");
                        }
                        else
                        {

                            var someJSON = new Object();
                            someJSON.username = username;
                            someJSON.password = password;
                            console.log(someJSON);
                            var sendJSON = JSON.stringify(someJSON);
                            console.log(sendJSON);
                            $.ajax(
                            {
                                url: "/login",
                                type: "POST",
                                data: sendJSON,
                                contentType: "application/json; charset=utf-8",
                                success: function(data)
                                {
                                    console.log("successfully sent data");
                                    console.log(data);
                                    if (data == "success")
                                    {
                                        $("#welcome").empty();
                                        $("#welcome").append(welcomeMsg);
                                        $("#loggingIn").hide("slow");
                                        $("#welcome").show("slow");
                                        $("#hackTime").load("crack.html")
                                        console.log("this");
                                        console.log(someJSON.username);
                                        setCookie("username", someJSON.username, 2);

                                    }
                                    else if (data == "hacked")
                                    {
                                        $("#welcome").empty();
                                        $("#welcome").append(hackedMsg);
                                        $("#loggingIn").hide("slow");
                                        $("#welcome").show("slow");
                                        $("#user1").val("");
                                        $("#pass1").val("");
                                    }
                                    else if (data == "failure")
                                    {
                                        $("#failure").html("Username or Password is Incorrect");
                                        var username = $("#user1").val("");
                                        var password = $("#pass1").val("");
                                    }
                                }
                            });
                        }
                    }
                    else
                    {

                        var someJSON = new Object();
                        someJSON.username = username;
                        someJSON.password = password;
                        console.log(someJSON);
                        var sendJSON = JSON.stringify(someJSON);
                        console.log(sendJSON);
                        $.ajax(
                        {
                            url: "/login",
                            type: "POST",
                            data: sendJSON,
                            contentType: "application/json; charset=utf-8",
                            success: function(data)
                            {
                                console.log("successfully sent data");
                                console.log(data);
                                if (data == "success")
                                {
                                    $("#welcome").empty();
                                    $("#welcome").append(welcomeMsg);
                                    $("#loggingIn").hide("slow");
                                    $("#welcome").show("slow");
                                    $("#hackTime").load("crack.html")
                                    console.log("this");
                                    console.log(someJSON.username);
                                    setCookie("username", someJSON.username, 2);

                                }
                                else if (data == "hacked")
                                {
                                    $("#welcome").empty();
                                    $("#welcome").append(hackedMsg);
                                    $("#loggingIn").hide("slow");
                                    $("#welcome").show("slow");
                                    $("#user1").val("");
                                    $("#pass1").val("");
                                }
                                else if (data == "failure")
                                {
                                    $("#failure").html("Username or Password is Incorrect");
                                    var username = $("#user1").val("");
                                    var password = $("#pass1").val("");
                                }
                            }
                        });
                    }

                }
            });
        }
    });

    //registration
    $("#registerUser").click(function()
    {
        var username = $("#user").val();
        var password = $("#pass").val();
        if (!username)
        {
            alert("You're missing a username!");
        }
        else if (!password)
        {
            alert("You're missing a PIN!");
        }
        else if (isNaN(password))
        {
            alert("i'm sorry, but you can't put anything other than numbers in your PIN.");
            $("#pass").val("");
        }
        else if (password.length > 6 || password.length < 6)
        {
            alert("sorry, please keep your PIN to 6 characters.");
        }

        var testJSON = new Object();
        testJSON.username = getCookie("username");
        console.log(testJSON);
        var sendtJSON = JSON.stringify(testJSON);
        console.log(sendtJSON);
        $.ajax(
        {
            url: "/checkHack",
            type: "POST",
            data: sendtJSON,
            contentType: "application/json; charset=utf-8",
            success: function(data)
            {
                console.log("successfully sent data");
                console.log(data);
                var hacked = false;
                if (data == "hacked")
                {
                    hacked = true;
                }

                if (getCookie("username") != "" && !hacked)
                {
                    alert("You cannot make a new user until you are hacked!");
                }
                /* no longer needed as we're only doing PINS
                else if (password.length > 8) {
                    alert("i'm sorry, but your password is too secure. please keep your password under 8 characters.");
                    $("#pass").val("");
                }*/
                else
                {
                    var someJSON = new Object();
                    someJSON.username = username;
                    someJSON.password = password;
                    console.log(someJSON);
                    var sendJSON = JSON.stringify(someJSON);
                    console.log(sendJSON);

                    $.ajax(
                    {
                        url: "/register",
                        type: "POST",
                        data: sendJSON,
                        contentType: "application/json; charset=utf-8",
                        success: function(data)
                        {
                            console.log("successfully sent data");
                            if (data == "success")
                            {
                                alert("congrats, you're registered " + username);
                                $("#user").val("");
                                $("#pass").val("");
                                console.log("setCookie");
                                console.log(username);
                                setCookie("username", username, 2);
                            }
                            else if (data == "failure")
                            {
                                alert("sorry, that username is taken.");
                            }
                        }
                    });
                }

            }
        });



    });
});
