//YOUR FIREBASE LINKS

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

user_name=localStorage.getItem("usernameKey");
room_name=localStorage.getItem("roomnamekey");
function send() {
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      like:0
    });
document.getElementById("msg").value="";
}
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        subfolder_name = childKey;
                        subfolder_data= childData;
                      name=subfolder_data["name"];
                message=subfolder_data["message"];
                      like=subfolder_data["like"];
                      nametag='<h4>'+name+'<img src="tick.png"class="user_tick"></h4>';
                      messageTag='<h4 class="message_h4">'+message+'</h4>'
                      likeTag='<button class="btn btn-warning" onclick="updateLike(this.id)"id="'+subfolder_name+'" value="'+like+'">';
                      likeEntag='<span class="glyphicon glyphicon-thumbs-up">Like:'+like+'</span></button><hr>';
                      row=nametag+messageTag+likeTag+likeEntag;
                      document.getElementById("output").innerHTML+=row;
                  }
            });
      });
}
getData();

function logout() {
      localStorage.removeItem("usernameKey");
      localStorage.removeItem("roomnamekey");
      window.location = "index.html";
}

function updateLike(button_id){
      likes=document.getElementById(button_id).value;
      likes=Number(likes)+1;
      firebase.database().ref(room_name).child(button_id).update({
            like:likes
      });
}