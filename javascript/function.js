  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDolU4ZzPmtfX-bOd9R6Esu7vdCjol36KA",
    authDomain: "train-schedule-91818.firebaseapp.com",
    databaseURL: "https://train-schedule-91818.firebaseio.com",
    projectId: "train-schedule-91818",
    storageBucket:  "train-schedule-91818.appspot.com",
    messagingSenderId: "120084131527"
  };
  firebase.initializeApp(config);

  var database= firebase.database();
  
  var addTrain={
	  "trainName": "",
	  "Destination":"",
	  "trainTime":0,
	  "trainFrequency":0,
  };
	function clearform(){
		$("#trainForm").find('input:text').val("");
	}	
$(document).ready(function(){
	$("#submit").on("click", function(){
		console.log("click success!")
		addTrain.trainName=$("#train-name").val().trim();
		addTrain.trainTime=$("#train-time").val().trim();
		addTrain.Destination=$("#destination").val().trim();
		addTrain.trainFrequency=$("#frequency").val().trim();
		console.log(addTrain);
		database.ref("/trainInfo").push({
			train: addTrain
		});
		clearForm();
	})

	console.log(addTrain.trainName);
})