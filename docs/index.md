<html>
<!--210525 로그인(완) 닉네임(미완) 유저가 다운로드한 목록(미완)-->
<head>
         <!-- The surrounding HTML is left untouched by FirebaseUI.
         Your app may use that space for branding, controls and other customizations.-->
         <base href="/">
         <h1>   Welcome to welvi store</h1>
         <div id="firebaseui-auth-container"></div>
         <div id="loader">Loading...</div>
         
         
         <meta http-equiv="Permissions-Policy" content="interest-cohort=()"/>
         <link rel="shortcut icon" href="#">
         <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-analytics.js"></script>


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
                  signInSuccessUrl: 'store.html',
                  //signInSuccessUrl: '<url-to-redirect-to-on-success>',
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
                  //tosUrl: '<your-tos-url>',
         // Privacy policy url.
                  //privacyPolicyUrl: '<your-privacy-policy-url>'
         };
         
         <!--The start method will wait until the DOM is loaded.-->
         ui.start('#firebaseui-auth-container', uiConfig);    
</script>

</body>
        
</html>