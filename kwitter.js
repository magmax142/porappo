function login(){
    username=document.getElementById("username").value;
    localStorage.setItem("usernameKey",username);
    window.location="kwitter_room.html";
}