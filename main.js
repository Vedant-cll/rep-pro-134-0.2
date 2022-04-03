song="";
status=""; 
var objects= new Array();
img="";
var no_objects;
function preload(){
    song=loadSound("warning.mp3");
}

function setup(){
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();


objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
document.getElementById("status").innerHTML = "status: detecting person";
}

function modelLoaded(){
    console.log("modelLoaded!");
status = true ;
}

function gotResult(error, results){
if(error){
    console.log(error);
} 
console.log(results);
objects = results;
no_objects = objects.length;

}


function draw(){
    image(video, 0, 0, 380, 380);
    

    if(status != "")
{

    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);


    for(i = 0; i < no_objects ; i++){

        document.getElementById("status").innerHTML = "status: object detected";

        fill(r, g, b);
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y );
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         if(objects[i].label == "person")
          {
            document.getElementById("Number_of_objects").innerHTML = "Baby Found";
            console.log("stop");
            song.stop();
          }
          else
          {
            document.getElementById("Number_of_objects").innerHTML = "Baby Not Found";
            console.log("play"); 
            song.play();
          } 
         
          if(objects.length == 0)
          {
          document.getElementById("Number_of_objects").innerHTML = "Baby Not Found";
          console.log("play"); 
          song.play();
          }
}
}

}
function play()
    {
        song.play();
        song.setVolume(1);
        song.rate(3);
    }