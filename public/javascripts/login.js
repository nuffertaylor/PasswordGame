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
            $.post("/login", someJSON, function(success) {
                console.log("successfully sent data");
            });
        }
    });
});
