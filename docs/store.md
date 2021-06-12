<html>
<!--210525 업로드(완) 다운로드(완)-->
<!--210621 디비 연결(미완)-->
<head>  
         <base href="/">
         <h1><p style="text-align:center;">Welcome to welvi store</p></h1>
         <meta charset="utf-8">
         <div id="head"><p style="text-align:center;">theme list</p></div><br>
         <meta http-equiv="Permissions-Policy" content="interest-cohort=()"/>
         <link rel="shortcut icon" href="#">
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
         
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-analytics.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-storage.js"></script>             
                  
<!--Authentication-->         
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-firestore.js"></script>
         
<!--Realtime Database-->         
<!--script src="https://www.gstatic.com/firebasejs/live/3.1/firebase.js"></script-->
<!--pre id="users"></pre-->
<!--Realtime Database-->
<script src="https://www.gstatic.com/firebasejs/6.3.2/firebase-database.js"></script>
         
         
<script>
         <!--initialize firebase-->
         var config = {
         apiKey: "AIzaSyBFpJ_jHiLPpl4HZckHefuj4_XJxSQTvlg",
         authDomain: "opensw-opener.firebaseapp.com",
         databaseURL: "https://opensw-opener-default-rtdb.firebaseio.com",
         projectId: "opensw-opener",
         storageBucket: "opensw-opener.appspot.com",
         messagingSenderId: "1073815196228",
         appId: "1:1073815196228:web:429c5a2c3af05df4922211",
         measurementId: "G-GCDBT9FVRL"
         };
         firebase.initializeApp(config);
         firebase.analytics; 
         //var database = firebase.database();
         
         
         <!--realtime database Get elements-->
         const preOUsers = document.getElementById('users');
         <!--realtime database Create references-->
         const dbRefUsers = firebase.database().ref().child('users');
         <!--realtime daatabase Sync users channes : 'value' event는 데이터베이스의 이 위치에서 변경이 있을때마다 함수 호출, callbach function이 호출됐을 때 event 실행 -->
         dbRefUsers.on('value', snap => {   
                  console.log(snap.val());
                  preUsers.innerText = JSON.stringify(snap.val(), null, 3);
         });
         
          <!-- download file-->
         var storage = firebase.storage();
         var storageRef = storage.ref();
         var listRef = storageRef.child('welvi/library');
         
         <!-- Find all the items.-->
         listRef.listAll().then(function(res) {
                  var i=0;
                  res.items.forEach(function(itemRef) { 
                           console.log(itemRef);
                           itemRef.getDownloadURL().then(function(url) {
                                    console.log('File available at', url);
                                    
                                    var head = document.getElementById('head');
                                    var index = String(i);
         
                                    head.insertAdjacentHTML('afterend', '<a class="button" href="' + url + '" id="' + index + '">' + itemRef.name + '</a><br>');
                                    //<a class="buttons" href="https://github.com/pages-themes/dinky/zipball/master">Download ZIP</a>
                                    const xhr = new XMLHttpRequest();
                                    xhr.responseType = 'blob';
                                    xhr.onload = function(event) { var blob = xhr.response; };
                                    xhr.open('GET', url);
                                    xhr.send();
                                    i++;
                                    });
                  }).catch(function(error) { 
                           // A full list of error codes is available at
                           // https://firebase.google.com/docs/storage/web/handle-errors
                           switch (error.code) {
                                    case 'storage/object-not-found':
                                    // File doesn't exist
                                    break;
                                    case 'storage/unauthorized':
                                    // User doesn't have permission to access the object
                                    break;
                                    case 'storage/canceled':
                                    // User canceled the upload
                                    break;
                                    case 'storage/unknown':
                                    // Unknown error occurred, inspect the server response
                                    break;
                           }
                  });
         }).catch(function(error) {  });
         
         <!-- get elements-->
         var uploader = document.getElementById('uploader');
         var fileButton = document.getElementById('fileButton');
         
         <!-- listen for file selection-->
         fileButton.addEventListener('change', function(e) {
                  <!--get file-->
                  var file = e.target.files[0];
         
                  <!--create a storage ref-->
                  var storageRef = firebase.storage().ref('welvi/withhold/' + file.name);
         
                  <!--upload file-->
                  var task = storageRef.put(file);
         
                  <!--update progress bar-->
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