Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

  camera = document.getElementById("camera");

  Webcam.attach("#camera")



console.log("ml5.version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/zCCCqBzdj/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded OK!");
}


function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data1 = "first prediction" + Prediction_1;
    speak_data2 = "second prediction" + Prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image')
    classifier.classify(img, gotResult)
}


function gotResult(error, results)
{
    if (error) {
     console.error(error)
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name1").innerHTML = results[0].label;
        document.getElementById("result_gesture_name2").innerHTML = results[1].label;
        Prediction_1 = results[0].label;
        Prediction_2 = results[1].label;


        if (results[0].label == "Cheers"){
            document.getElementById("gesture1").innerHTML = "&#9996";
        }
        if (results[0].label == "Thumbs Up"){
            document.getElementById("gesture1").innerHTML = "&#128077";
        }
        if (results[0].label == "Thumbs Down"){
            document.getElementById("gesture1").innerHTML = "&#128078";
        }

        if (results[1].label == "Victory"){
            document.getElementById("gesture2").innerHTML = "&#9996";
        }
        if (results[1].label == "Thumbs Up"){
            document.getElementById("gesture2").innerHTML = "&#128077";
        }
        if (results[1].label == "Thumbs Down"){
            document.getElementById("gesture2").innerHTML = "&#128078";
        }
    }
}


