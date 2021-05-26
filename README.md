<html>
<!--210525 업로드(완) 다운로드(완) 로그인(미완)-->
<head>
         <!-- The surrounding HTML is left untouched by FirebaseUI.
         Your app may use that space for branding, controls and other customizations.-->
         <h1>Welcome to welvi store</h1>
         <div id="firebaseui-auth-container"></div>
         <div id="loader">Loading...</div>
         
         
         <div id="head">theme list</div><br>
         <meta http-equiv="Permissions-Policy" content="interest-cohort=()"/>
         <link rel="shortcut icon" href="#">
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

<br><progress value="0" max="100" id="uploader">0%</progress>
<input type="file" value="upload" id="fileButton" />
         
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-analytics.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-storage.js"></script>


<!--Authentication-->         
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.js"></script>
<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />
             
         
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
         firebase.analytics();
         
         
         <!--Authentication-->
         <!--Initialize the FirebaseUI Widget using Firebase.-->
         var ui = new firebaseui.auth.AuthUI(firebase.auth());
         
         var uiConfig = {
         callbacks: {
                  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
         // User successfully signed in.
         // Return type determines whether we continue the redirect automatically
         // or whether we leave that to developer to handle.
                           return true;
                  },
                  uiShown: function() {
         // The widget is rendered.
         // Hide the loader.
                           document.getElementById('loader').style.display = 'none';
                  }
         },
         // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                  signInFlow: 'popup',
                  signInSuccessUrl: '<url-to-redirect-to-on-success>',
                  signInOptions: [
         // Leave the lines as is for the providers you want to offer your users.
         //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
         //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
         //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
         //firebase.auth.GithubAuthProvider.PROVIDER_ID,
                           firebase.auth.EmailAuthProvider.PROVIDER_ID,
         //firebase.auth.PhoneAuthProvider.PROVIDER_ID
                  ],
         // Terms of service url.
                  tosUrl: '<your-tos-url>',
         // Privacy policy url.
                  privacyPolicyUrl: '<your-privacy-policy-url>'
         };
         
         <!--The start method will wait until the DOM is loaded.-->
         ui.start('#firebaseui-auth-container', uiConfig);
         
         
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
         
                                    head.insertAdjacentHTML('afterend','<a class="button" href="'+url+'"> '+itemRef.name+'</a><br>');   
                                    //head.insertAdjacentHTML('afterend','<a href="'+url+'" id="'+index+'" class="button"> '+itemRef.name+'</a><br>');  
                                    //<a href="https://github.com/pages-themes/architect/zipball/master" class="button"> <small>Download</small> .zip file</a>
         
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
