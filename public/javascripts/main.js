$(document).ready(function() {

    $("#createUser").click(function() {
        $("#mainPage").empty();
    });

    /*$("#logIn").click(function() {
        console.log("i am clicked");
        $("#mainPage").empty();
        var html = '<div class="form-group"> <form id="commentForm" action="">' +
            '<label for="name">Username: </label><br><input type="text" id="user" placeholder="username">' +
            '</div><div class="form-group"> <label for="comment">Password: </label><br>' +
            '<input type="password" id="pass" placeholder="password"> </form></div>' +
            '<button class = "btn btn-primary" id = "submitLogIn">Log In</button>' +
            '<button class="btn btn-secondary" id ="returnHome">Return</button>';
        $('#mainPage').append(html);
    });

    $("#returnHome").click(function() {
        console.log("anybody there?");
        $("#mainPage").empty();
        var homeHTML = '<h2>Hackerman</h2><button id = "createUser" class="btn btn-secondary">Create User</button>' +
            '<button id = "logIn" class="btn btn-info">Log In</button>';
        $('#mainPage').append(homeHTML);
    });*/
});
