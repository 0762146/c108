Prediction_1 = "";
Prediction_2 = "";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
var cam = document.getElementById("Camera");

Webcam.attach('#Camera');

function takeSnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("Result").innerHTML='<img id="Captured-Image" src="'+data_uri+'">';
    }); 
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_HCcv2FUI/model.json', modelLoaded);
function modelLoaded(){
    console.log('Model loaded!');
}

function speak(){
    var synth = Window.speechSynthesis;
    speakdata1="The First Prediction is" + Prediction_1;
    speakdata2="the Second Prediction is" + Prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterthis);
}

function Check(){
    img=document.getElementById('Captured-Image');
    classifier.classify(img, gotResult);

}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name-").innerHTML=results[0].label;
        document.getElementById("result_emotion_name-2").innerHTML=results[1].label;
        Prediction_1 = results[0].label;
        Prediction_2 = results[1].label;
        speak();
        if(results[0].label == "happy"){
            document.getElementById("Updated_Emoji").innerHTML="&#128522;";
        }
        if(results[0].label == "sad"){
            document.getElementById("Updated_Emoji").innerHTML="&#128532;";
        }
        if(results[0].label == "angry"){
            document.getElementById("Updated_Emoji").innerHTML="&#128545;";
        }
        if(results[1].label == "happy"){
            document.getElementById("Updated_Emoji2").innerHTML="&#128512;";
        }
        if(results[1].label == "sad"){
            document.getElementById("Updated_Emoji2").innerHTML="&#128546;";
        }
        if(results[1].label == "angry"){
            document.getElementById("Updated_Emoji2").innerHTML="&#128548;";
        }
    }
}
