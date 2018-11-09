function userToHack(user) {
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

$(document).ready(function() {

    $.getJSON("/userList", function(data) {
        for (var i = 1; i < data.length; i++) {
            var html = '<li class="nav-item" onclick = "userToHack(\'' + data[i] + '\')">' + data[i] + '</li>';
            $("#listOfUsers").append(html);
        }
    });

    $("#submitPassword").click(function() {
        var user = $("#whoYoureAttacking").html();
        var pass = $("#passwordGuess").val();
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

                }
                else if (data.status == "wrong length") {
                    alert("not the right length buddy");
                }
                else {
                    $("#guessResponse").empty();
                    for (var i = 0; i < data.wrong; i++) {
                        var html = '<i class="far fa-circle"></i>';
                        $("#guessResponse").append(html);
                    }
                    for (var i = 0; i < data.partial; i++) {
                        var html = '<i class="fas fa-circle" style="color:red">';
                        $("#guessResponse").append(html);
                    }
                    for (var i = 0; i < data.right; i++) {
                        var html = '<i class="fas fa-circle" style="color:green">';
                        $("#guessResponse").append(html);
                    }
                }
            }
        });
    });
});
