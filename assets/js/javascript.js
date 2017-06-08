
  // Initialize Firebase
	  var config = {
    apiKey: "AIzaSyCPxugG4IsFcv5-dGcJpxfMqZ1q43H6Knw",
    authDomain: "week-7-573e1.firebaseapp.com",
    databaseURL: "https://week-7-573e1.firebaseio.com",
    projectId: "week-7-573e1",
    storageBucket: "week-7-573e1.appspot.com",
    messagingSenderId: "247131223312"
  };
  firebase.initializeApp(config);

	var database = firebase.database();

	var trainName = "";
	var destination = "";
	var firstTrainTime = "";
	var frequency = "";

	$('#submit').on('click', function(){

		  	trainName = $('#trainName').val().trim();
		  	destination = $('#destination').val().trim();
		  	firstTrainTime = $('#firstTrainTime').val().trim();
		  	frequency = $('#frequency').val().trim();

		  	database.ref().push({
		  		train: trainName,
		  		destination : destination,
		  		trainTime: firstTrainTime,
				frequency: frequency,
		  	});

	return false; 
	}); 

	database.ref().on('child_added', function(snapshot){

			var newTrainName = snapshot.val().train;
			var newDestination = snapshot.val().destination;
			var newFirstTrainTime = snapshot.val().trainTime;
			var newFrequency = snapshot.val().frequency;

			  	var firstTimeConverted = moment(newFirstTrainTime,"hh:mm").subtract(1, "years");
			  	console.log(firstTimeConverted);

			  	// Current Time
			  	var currentTimeMoment = moment();
			  	console.log("Current Time: " + moment(currentTimeMoment).format("hh:mm"));

			  	//Difference between the times
			  	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
			  	console.log("Difference In Time: " + diffTime);

			  	// Time apart (remainder)
			  	var tRemainder = diffTime % newFrequency;
			  	console.log(tRemainder);

			  	// Minute Until Train
			  	var tMinutesUntilTrain = newFrequency - tRemainder;
			  	console.log("Minutes Until Train: " + tMinutesUntilTrain);

			  	// Next Train
			  	var nextTrain = moment().add(tMinutesUntilTrain, "minutes");
			  	console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

			  	// Next Train Arrival Time
			  	var nextTrainArrivalTime = moment(nextTrain).format("hh:mm");


			// Log everthing that's coming out of snapshot
			console.log(snapshot.val());
			console.log('train: '+ snapshot.val().train);
			console.log('destination: '+ snapshot.val().destination);
			console.log('train time: '+ snapshot.val().trainTime);
			console.log('frequency: '+ snapshot.val().frequency);
			console.log('next train: '+ nextTrainArrivalTime);
			console.log('minutes away: '+ tMinutesUntilTrain);

		$(".trainInformation").append('<tr><td>'+ newTrainName +'</td><td>'+ newDestination +'</td><td>'+ newFrequency +'</td><td>'+ nextTrainArrivalTime +'</td><td>'+ tMinutesUntilTrain +'</td></tr>');

	}); 
