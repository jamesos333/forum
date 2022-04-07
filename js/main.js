//adds jquery
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';

//adds navbar to page
$(function(){
    $("#navbar").load("elements/navbar.html");
});

//adds navbar to page
$(function(){
    $("#footer").load("elements/footer.html");
});
