$(document).ready(function() {
    $.getJSON("/userList", function(data){
        for (var i = 1; i < data.length; i++){
            var html = '<li class="nav-item" id = "userToHack">' + data[i] + '</li>'
            $("#listOfUsers").append(html);
        }
    });
    
});