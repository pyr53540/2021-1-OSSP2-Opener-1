(fucntion() {
 
         // Initialize Firebase
         const config = {
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

         // Get elements
         const txtEmail = document.getElementById('txtEmail');
         const txtPassword = document.getElementById('txtPassword');
         const btnLogin = document.getElementById('btnLogin');
         const btnSignUp = document.getElementById('btnSignUp');
         const btnLogout = document.getElementById('btnLogout');

         // Add login event
         btnLogin.addEventListener('click', e=> {
                  // Get email and pass
                  const email = txtEmail.value;
                  const pass =txtPassword.value;
                  const auth = firebase.auth();
                  //Sign in
                  const promise = auth.signInWithEmailAndPassword(email.password);
                  promise.catch(e => console.log(e.message));
         
}());
