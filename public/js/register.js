//processes the register form if submitted
$(document).ready(function () {
    $("#register").click(function () {
        var username = $("#username").val();
        var email = $("#email").val();
        var birthday = $("#birthday").val();
        var password = $("#password").val();
        //sets up a new user
        const user = new User(000000, username, email, birthday, password);
        console.log( user );
    });
});