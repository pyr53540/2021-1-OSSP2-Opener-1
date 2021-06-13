<html>
<!--210525 upload(clear) download(clear)-->
<head>  
         <base href="/">
         <!--h1><p style="text-align:center;">Welcome to welvi store</p></h1-->
         <h1 id="list">Welcome to welvi store</h1>
         <meta charset="utf-8">
         <!--div id="list">theme list</div><br><br-->
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
<h2 id="list">Upload Your Theme!</h2>
         <div class="theme-picker-view-toggle open" data-action="click:theme-picker#toggleFullPicker">
          <label className="btn btn-primary" for="fileButton">upload</label>
          <input type="file" value="upload" id="fileButton" style="display:none"/><br>
        </div>
<progress value="0" max="100" id="uploader">0%</progress>
<!--input type="file" value="upload" id="fileButton" /-->
<!--button class="btn btn-primary" type="submit" id="page-publish" data-action="click:theme-picker#onPublishClick">Select theme</button-->
<!--button class="btn btn-primary" type="submit" id="page-publish" data-action="click:theme-picker#onPublishClick">Select theme</button-->
         
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
<!--script src="https://www.gstatic.com/firebasejs/6.3.2/firebase-database.js"></script-->
         
         
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
         
          <!-- download file-->
         var storage = firebase.storage();
         var storageRef = storage.ref();
         var listRef = storageRef.child('welvi/library');
         
         <!-- Find all the items.-->
         var i=-1;
         var list = document.getElementById('list');
         list.insertAdjacentHTML('afterend', '<section id="downloads">');
         //<section id="downloads">
         listRef.listAll().then(function(res) {
                  res.items.forEach(function(itemRef) { 
                           console.log(itemRef);
                           itemRef.getDownloadURL().then(function(url) {
                                    console.log('File available at', url);
                                    i++;
                                    var index = String(i);
                                    
                                    list.insertAdjacentHTML('afterend', '<a href="' + url + '" id="listNum' + index + '" class="btn">' + itemRef.name + '</a><br><br>');
                                    //list.insertAdjacentHTML('afterend', '<a class="button" href="' + url + '" id="listNum' + index + '">' + itemRef.name + '</a><br><br>');
                                    //<a class="buttons" href="https://github.com/pages-themes/dinky/zipball/master">Download ZIP</a>
                                    //<button type="button" onclick="location.href='joinUs.jsp' ">회원가입</button>s
                                    //<a href="https://github.com/pages-themes/hacker/zipball/master" class="btn">Download as .zip</a>
         
                                    const xhr = new XMLHttpRequest();
                                    xhr.responseType = 'blob';
                                    xhr.onload = function(event) { var blob = xhr.response; };
                                    xhr.open('GET', url);
                                    xhr.send();
                                    //i++;
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
                    
         /*
         var database = firebase.database();
         <!--realtime database Get elements-->
         const uid = K0vWmATzYXfdLc1ZSfzncKVoSRB3; // 임시값
         const themeList = document.getElementById('users/'+uid+'/themeList');
         for(var j=0; j<max; j++){
                  var indexj = String(j);
                  <!--realtime database Create references-->
                  const dbRefTheme = firebase.database().ref().child('listNum'+indexj); // j 선언해야함
                  <!--realtime daatabase Sync users channes : 'value' event, callbach function -->
                  dbRefTheme.on('value', snap => {   
                           console.log(snap.val());
                           themeList.innerText = JSON.stringify(snap.val(), null, 3);
                  });
         }
         
         list.insertAdjacentHTML('afterend', '</section>');
         //</section>
         
         */
         /*
         <!--Firestore Database-->
         var userEmail = "test1@test.com"// 임시값
         var firestore = firebase.firestore();
         const docRef = firestore.collection("user").doc(userEmail);
         for(var j=0; j<i; j++) {
                  var listNumber = "listNum"+String(j);
                  const downloadButton = document.getElementById(listNumber);
                  downloadButton.addEventListener("click", function(){
                           const listToDB = downloadButton.innerText;
                           console.log("I am going to save "+listToDB+" to Firesotre");
                           docRef.set({
                                   downloadList : listToDB 
                           }, { merge: true }).then(() => {
                           console.log(listToDB+" successfully written!");
                           })
                           .catch((error) => {
                           console.error("Error writing document: ", error);
                           });
                  })
         }
         */
</script>
</body>
        
</html>
