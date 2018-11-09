function userToHack(user) {
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



});
