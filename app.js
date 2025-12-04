// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDUVBtYNohXgxPEbq7dUHHoh8JnjZF7aoY",
  authDomain: "video-downloader-2025-a005c.firebaseapp.com",
  projectId: "video-downloader-2025-a005c",
  storageBucket: "video-downloader-2025-a005c.firebasestorage.app",
  messagingSenderId: "266906331664",
  appId: "1:266906331664:web:2e6b900741e3ef5a37f895",
  measurementId: "G-YC5S7B9J7W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// ❤️ Like Function
function likeVideo(videoId){
  const ref = db.ref("likes/" + videoId);

  ref.transaction(count => {
    return (count || 0) + 1;  
  });
}

// Live Like Count Listener
function loadLikes(videoId){
  db.ref("likes/" + videoId).on("value", snapshot => {
    document.getElementById("like-" + videoId).innerText = snapshot.val() || 0;
  });
}

loadLikes("video1");


// 💬 Add Comment
function addComment(videoId){
  let input = document.getElementById("comment-input-" + videoId);
  let comment = input.value.trim();
  if(comment === "") return;

  db.ref("comments/" + videoId).push({
    text: comment,
    time: Date.now()
  });

  input.value = "";
}

// Load Comments
function loadComments(videoId){
  db.ref("comments/" + videoId).on("child_added", snapshot => {
    let data = snapshot.val();

    let div = document.createElement("div");
    div.innerText = data.text;

    document.getElementById("comments-" + videoId).appendChild(div);
  });
}

loadComments("video1");
