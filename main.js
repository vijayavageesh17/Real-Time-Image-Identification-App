var previous_result="";
function setup() {
  canvas = createCanvas(300, 275);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded (){
  console.log("Model Loaded!")
}

function draw(){
  image(video,0,0,300,275);
  classifier.classify(video, gotResult);
}

function gotResult(error,results){
  if(error){
   console.error(error);
  }
  else{
    if((results[0].confidence>0.5) && (previous_result != results[0].label))
    {
      console.log(results);
      previous_result=results[0].label;
      var synth= window.speechSynthesis;
      speak_data="Object detectded is "+ results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("object_name").innerHTML=results[0].label;
      document.getElementById("object_accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
  }
}
