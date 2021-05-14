const firebaseConfig = {
   apiKey: "AIzaSyBFpJ_jHiLPpl4HZckHefuj4_XJxSQTvlg",
         authDomain: "opensw-opener.firebaseapp.com",
         databaseURL: "https://opensw-opener-default-rtdb.firebaseio.com",
         projectId: "opensw-opener",
         storageBucket: "opensw-opener.appspot.com",
         messagingSenderId: "1073815196228",
         appId: "1:1073815196228:web:429c5a2c3af05df4922211",
         measurementId: "G-GCDBT9FVRL"
};

firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
var storageRef = storage.ref();

//var libraryRef = storageRef.child('welvi/library');
//var apps = [];

$('#List').find('tbody').html('');

var i=0;

storageRef.child('welvi/library/').listAll().then(function(result){

   result.items.forEach(function(imageRef){

      //console.log("Image reference" + imageRef.toString());
      i++;
      displayImage(i, imageRef);
   });
});

function displayImage(row, images){
images.getDownloadURL.then(function(url){
console.log(url);
   
   let new_html = '';
   new_html += '<tr>';
   new_html += '<td>';
   new_html == row;
   new_html += '</td>';
   new_html += '<td>';
   new_html += '<img src="'+url+'" sidth="100px" style="float:right">';
   new_html += '</td>';
   new_html += '</tr>';
   $('#List').find('tbody').append(new_html);
});
}
