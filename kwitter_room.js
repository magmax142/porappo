var firebaseConfig = {
      apiKey: "AIzaSyD1vT2_gFx6bfu7zEbCyV6-uSgI8CStYQk",
      authDomain: "kwitter-26687.firebaseapp.com",
      databaseURL: "https://kwitter-26687-default-rtdb.firebaseio.com",
      projectId: "kwitter-26687",
      storageBucket: "kwitter-26687.appspot.com",
      messagingSenderId: "758272794972",
      appId: "1:758272794972:web:7bc14e27b9368105236199"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
username = localStorage.getItem("usernameKey");
document.getElementById("username").innerHTML = "welcome " + username;

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  row='<div id="'+Room_names+'"class="room_name" onclick="redirect(this.id)">'+Room_names+'</div> <hr>';
                  document.getElementById("output").innerHTML+=row;
            });
      });
}
getData();

function addRoom() {
      roomname = document.getElementById("roomname").value;
      firebase.database().ref("/").child(roomname).update({
            purpose: "adding room"
      });
      localStorage.setItem("roomnamekey", roomname);
      window.location = "kwitter_page.html";
}
function redirect(room) {
      localStorage.setItem("roomnamekey", room);
      window.location = "kwitter_page.html";
}