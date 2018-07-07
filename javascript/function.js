  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDolU4ZzPmtfX-bOd9R6Esu7vdCjol36KA",
    authhmin: "train-schedule-91818.firebaseapp.com",
    databaseURL: "https://train-schedule-91818.firebaseio.com",
    projectId: "train-schedule-91818",
    storageBucket:  "train-schedule-91818.appspot.com",
    messagingSenderId: "120084131527"
  };
  	firebase.initializeApp(config);
 	now=moment();
	let time={
	  "hour":0,
	  "minute":0,
	  "arrival":0,
  }
	
 	 var database = firebase.database();
	
	//train object
	let addTrain={
	  "trainName": "",
	  "Destination":"",
	  "trainTime":0,
	  "trainFrequency":0,
	}

	//get current time
	function updateClock(){
		var currentTime=new Date();
		var currentHours=currentTime.getHours();
		var currentMinutes=currentTime.getMinutes();
		var currentSeconds=currentTime.getSeconds();
		var timeString=currentHours+":"+currentMinutes+":"+currentSeconds;

		time.hour=currentHours;
		time.minute=currentMinutes;
		
		$(".trainSchedule").html("Train Schedule: "+timeString);
		
	}

	//clear form function
	function clearform(){
		$("#train-name").val("");
		$("#train-time").val("");
		$("#destination").val("");
		$("#frequency").val("");
	}

	function nextArrival(){
		var x=time.hour *60;
		var totalMin=x+time.minute;
		var remainder=totalMin % addTrain.trainFrequency;
		time.arrival=totalMin+remainder
		consoloe.log(time.arrival)

	}
	
	$(document).ready(function(){
		console.log(now);
		//extra clock, will be used for next arrival function later
		setInterval("updateClock()", 1000);
		
		//button click listener
		$("#submit").on("click", function(){
		console.log("click success!")
		
		//calculate next arrival
		nextArrival();
		
		//get user input
		addTrain.trainName=$("#train-name").val().trim();
		addTrain.trainTime=$("#train-time").val().trim();
		addTrain.Destination=$("#destination").val().trim();
		addTrain.trainFrequency=$("#frequency").val().trim();
		console.log(addTrain);
		
		//push data to firebase
		database.ref("/trainInfo").push({
			train: addTrain
		});
		
		//append data to table, will replace with firebase updates later
		$("#trainTable").append("<tr><td>"+addTrain.trainName+"</td><td>"
			+addTrain.trainTime+"</td><td>"
			+addTrain.Destination +"</td><td>"
			+addTrain.trainFrequency+"</td></tr>");
			
			//clears the add a train form
			clearform();

	})
	console.log(addTrain.trainName);
})
