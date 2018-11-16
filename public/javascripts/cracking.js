//label the table

function userToHack(user)
{
    console.log(user);
    console.log(getCookie("username"));
    if (user != getCookie("username"))
    {
        $("#welcome").hide("slow");
        $("#hackedUserInfo").hide("slow");
        $("#guessResponse").empty();
        $("#guessContainer").show("slow");
        //$("#whoYoureAttacking").hide("slow");
        $("#whoYoureAttacking").empty();
        $("#whoYoureAttacking").append(user);
        //$("#whoYoureAttacking").show("slow");
        var someJSON = new Object();
        someJSON.username = user;
        var sendJSON = JSON.stringify(someJSON);
        $.ajax(
        {
            url: "/passLength",
            type: "POST",
            data: sendJSON,
            contentType: "application/json; charset=utf-8",
            success: function(data)
            {
                console.log("this password has " + data + " characters.");
                for (var i = 0; i < data; i++)
                {

                    //change "far" to "fas" to make the circle solid white
                    var html = '<i class="far fa-circle" style="color:white"></i>';

                    $("#guessResponse").append(html);
                }
            }
        });
    }
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

function userHacked(user)
{

    $("#hackedUserInfo").empty();
    $("#guessContainer").hide("slow");
    $("#hackedUserInfo").show("slow");
    $.getJSON("/userList", function(data)
    {
        for (var i = 0; i < data.length; i++)
        {
            if (data[i].username == user)
            {
                var numOfHacked = data[i].usersHacked;
                $("#hackedUserInfo").append("<div class='info'><h4>The account " + user + " has been compromised.</h4>" +
                    "<h5><i>Before they were compromised, they cracked " + numOfHacked + " accounts.</i></h5></div>");
                break;
            }
        }
    });


}

function thisUserHacked(user)
{

    $("#hackedUserInfo").empty();
    $("#guessContainer").hide("slow");
    $("#hackedUserInfo").show("slow");
    $.getJSON("/userList", function(data)
    {
        for (var i = 0; i < data.length; i++)
        {
            if (data[i].username == user)
            {
                var numOfHacked = data[i].usersHacked;
                $("#hackedUserInfo").append("<div class='info'><h4>Your account \"" + user + "\" has been compromised.</h4>" +
                    "<h5><i>Before you were compromised, you cracked " + numOfHacked + " accounts.</i></h5></div>");
                break;
            }
        }
    });


}



function loadBox()
{
    $("#listOfUsers").empty();
    $("#listOfUsers").append('<thead>' +
        '    <tr>' +
        '        <th scope="col">Rank</th>' +
        '        <th scope="col">Username</th>' +
        '        <th scope="col">Number Hacked</th>' +
        '    </tr>' +
        '</thead>');

    var theList;
    $.getJSON("/userList", function(data)
    {
        console.log("UserList);")
        console.log(data);
        console.log(data[0]);
        console.log(data[1]);
        console.log(data[2]);
        theList = data;
        theList.shift();
        theList.sort(function(a, b) { return b.usersHacked - a.usersHacked });
        console.log("LoadBox list");
        console.log(theList);
        for (var i = 0; i < theList.length; i++)
        {
            $("#listOfUsers").append("<tbody>");
            console.log("loadbox: " + getCookie("username"));
            if (theList[i].hacked)
            {
                var html = '<tr><th scope="row">' + i + '</th><td class = "hackedUser" onclick = "userHacked(\'' + theList[i].username + '\')">' + theList[i].username + '</td><td>' + theList[i].usersHacked + '</td></tr>';
                $("#listOfUsers").append(html);
            }
            else if (theList[i].username == getCookie("username"))
            {
                var html = '<tr><th scope="row">' + i + '</th><td class = "thisUser" onclick = "userToHack(\'' + theList[i].username + '\')">' + theList[i].username + " (you)" + '</td><td>' + theList[i].usersHacked + '</td></tr>';
                $("#listOfUsers").append(html);
            }
            else
            {
                var html = '<tr><th scope="row">' + i + '</th><td class = "unhackedUser" onclick = "userToHack(\'' + theList[i].username + '\')">' + theList[i].username + '</td><td>' + theList[i].usersHacked + '</td></tr>';
                $("#listOfUsers").append(html);

            }
            $("#listOfUsers").append("</tbody>");
        }

        //this piece of code alphabetizes the list

        var list, i, switching, b, shouldSwitch;
        list = document.getElementById("listOfUsers");
        switching = true;
        /*Make a loop that will continue until
        no switching has been done:
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            b = list.getElementsByTagName("LI");
            //Loop through all list-items:
            for (i = 0; i < (b.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                check if the next item should
                switch place with the current item:
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    if next item is alphabetically
                    lower than current item, mark as a switch
                    and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                If a switch has been marked, make the switch
                and mark the switch as done:
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
            }
        }*/
    });
}

$(document).ready(function()
{

    loadBox();
    $()
    
    
    $("#passGuessForm").submit( function(event) {
        event.preventDefault();
        document.getElementById("submitPassword").click();
        return false;
    });

    $("#submitPassword").on("click", function()
    {
        $("#hackedUserInfo").empty();
        $("#wronginputText").empty();
        var pass = $("#passwordGuess").val();
        if (!pass)
        {
            $("#wronginputText").empty();
            console.log("password is empty");
            $("#wronginputText").append("no password input");
            return;
        }
        var user = $("#whoYoureAttacking").html();
        var curUser = getCookie("username");
        var someJSON = new Object();
        someJSON.username = user;
        someJSON.password = pass;
        someJSON.hackerUsername = curUser;
        var sendJSON = JSON.stringify(someJSON);
        $.ajax(
        {
            url: "/tryHack",
            type: "POST",
            data: sendJSON,
            contentType: "application/json; charset=utf-8",
            success: function(data)
            {
                console.log(data);
                if (data.status == "success")
                {
                    console.log("you guessed the password, nice");
                    $("#guessResponse").empty();
                    userHacked(user);
                    /*for (var i = 0; i < data.l; i++) {
                        
                        //var html = '<i class="fas fa-circle" style="color:green">';
                        //$("#guessResponse").append(html);
                    }*/
                }
                else if (data.status == "you are hacked")
                {
                    $("#guessResponse").empty();
                    thisUserHacked(getCookie("username"));
                }
                else if (data.status == "wrong length")
                {
                    $("#wronginputText").empty();
                    console.log("password length is wrong");
                    console.log(data);
                    $("#wronginputText").html("PIN is not the right length (should be " + data.l + " characters)");

                }
                else
                {
                    $("#guessResponse").empty();
                    for (var i = 0; i < data.right; i++)
                    {
                        var html = '<i class="fas fa-circle" style="color:green">';
                        $("#guessResponse").append(html);
                    }
                    for (var i = 0; i < data.partial; i++)
                    {
                        var html = '<i class="fas fa-circle" style="color:red">';
                        $("#guessResponse").append(html);
                    }
                    for (var i = 0; i < data.wrong; i++)
                    {
                        var html = '<i class="far fa-circle" style="color:white"></i>';
                        $("#guessResponse").append(html);
                    }
                }
                loadBox();
            }
        });
    });
});
