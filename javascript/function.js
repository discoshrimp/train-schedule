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
 	var now=moment();
	var time={
	  "hour":0,
	  "minute":0,
	  "arrival":0,
  }
	
 	 var database = firebase.database();
	
	//train object
	let addTrain={
	  "trainName": "",
	  "Destination":"",
	  "trainTime":"",
	  "trainFrequency":"",
	}

	//get current time
	function clock(){
		now=moment()
		var timeString=now.hours()+":"+now.minutes()+":"+now.seconds();
		$(".trainSchedule").html("Train Schedule: " +timeString);

		time.hour=now.hours();
		time.minute=now.minutes();
		time.second=now.seconds();
	}

	//clear form function
	function clearform(){
		$("#train-name").val("");
		$("#train-time").val("");
		$("#destination").val("");
		$("#frequency").val("");
	}

	function nextArrival(){
		var x=(time.hour*60)+time.minute;
		var y= parseInt(addTrain.trainFrequency);
		var a=x%y;

		time.arrival=Math.round(a)+x;
		return time.arrival;

	}
	
	$(document).ready(function(){
		console.log(time);
		//extra clock, will be used for next arrival function later
		setInterval("clock()", 1000);
		
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
			+addTrain.Destination +"</td><td>"
			+addTrain.trainFrequency+"</td><td>"
			+time.arrival+"</td></tr>");
			
			//clears the add a train form
			clearform();

	})
	console.log(addTrain.trainName);
})
