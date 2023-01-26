var iframe = document.getElementById("IFrame");
var message = document.getElementById("message");


window.addEventListener('message', function (e) {
 
    const data = e.data;
    this.document.getElementById("message").innerHTML="Result: " +data;
   
});



