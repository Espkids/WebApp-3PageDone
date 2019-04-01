function checklogin(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    $.post("/home/login",
          {
            username: username,
            password: password
          });
       
        
}