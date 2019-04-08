function checkLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username == "") {
    alert("กรุณากรอก Username")
  } else if (password == "") {
    alert("กรุณากรอก Password")
  } else {
    document.getElementById("userLogin").submit()
  }
}

function checkInputID() {
  var data = document.getElementById("username").value;
  if (data.charAt(data.length - 1) != parseInt(data.charAt(data.length - 1))) {
    document.getElementById("username").value = data.substring(0, data.length - 1);
  }
}

// function login() {
//   var username = document.getElementById("username").value;
//   var password = document.getElementById("password").value;

//   $.post("/home/login",
//     {
//       username: username,
//       password: password
//     });
// }