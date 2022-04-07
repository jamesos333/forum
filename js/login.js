//processes the login form if submitted
$(document).ready(function () {
    $("#login").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        console.log( username ); 
        console.log( password ); 
    });
});