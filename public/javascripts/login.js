//not being used currently

$(document).ready(function()
{
    $("#submitLogIn").click(function()
    {
        $("#failure").empty();
        var username = $("#user").val();
        var password = $("#pass").val();
        if (!username)
        {
            alert("You're missing a username!");
        }
        else if (!password)
        {
            alert("You're missing a password!");
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
                        //print welcome
                    }
                    else if (data == "hacked")
                    {
                        //print your account has been compromised
                    }
                    else if (data == "failure")
                    {
                        $("#failure").html("Username or Password is Incorrect");
                        var username = $("#user").val("");
                        var password = $("#pass").val("");
                    }
                }
            });
        }
    });

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
            alert("You're missing a password!");
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
                    }
                    else if (data == "failure")
                    {
                        alert("sorry, that username is taken.");
                    }
                }
            });
        }
    })
});
