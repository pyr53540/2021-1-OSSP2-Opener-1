# 2021-1-OSSP2-Opener-1
동국대학교 컴퓨터공학과 2021-1 공개SW프로젝트 1조 Opener

webstore

<!DOCTYPE html>

<html>

<head>
         <meta charset="utf-8">
         <title>welvi store</title> 
         <style media="screen">
                  body{                     
                  display: flex;
                  min-height: 100vh;
                  width: 100%; 
                  pading: 0;
                  margin: 0;
                  algin-items: center;
                  justify-content: center;
                  flex-direction: column;
                  }
                           
                  #uploader {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 50%;
                  margin-bottom: 10px;
                  }
         </style>
</head>

<body>

<progress value="0" max="100" id="uploader">0%</progress>
<input type="file" value="upload" id="fileButton" />

<script
src="https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js"></script>
<script>
         //initialize firebase
         var config = {
         apiKey: "AIzaSyBFpJ_jHiLPpl4HZckHefuj4_XJxSQTvlg",
         authDomain: "opensw-opener.firebaseapp.com",
         databaseURL: "https://opensw-opener-default-rtdb.firebaseio.com",
         storageBucket: "opensw-opener.appspot.com",
         };
         firebase.initializeApp(config);
         
         // get elements
         var uploader = document.getElementById('uploader');
         var fileButton = document.getElementById('filebutton');
         
         // listen for file selection
         fileButton.addEventListener('change', function(e) {
                  //get file
                  var file = e.target.files[0];
         
                  //create a storage ref
                  var storageRef = firebase.storage().ref('welvi/' + file.name);
         
                  //upload file
                  var task = storageRef.put(file);
         
                  //update progress bar
                  task.on('state_changed',
                  
                           function progress(snapshot) {
                           var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                           uploader.value = percentage;
                           },
                  
                           function error(err) {
                  
                           },
                  
                           function complete() {
                  
                           }
                  
                  );
         });

</script>

</body>
        
</html>
