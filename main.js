
x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
var speak_data = "";
draw_apple = "";
to_number = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload() {
    apple = loadImage("apple.png");
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;
 to_number = Number(content);

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    if(Number.isInteger(to_number))
    {
        draw_apple = "set";
        document.getElementById("status").innerHTML = "Started drawing apple";
    }
    else{
      document.getElementById("status").innerHTML = "Number is not recognised";
    }

}

function setup() {
 screen_width=Window.innerWidth;
 screen_height=Window.innerHeight;
 canvas = createCanvas(1000, 700);
 canvas.position(0,150);
 canvas.center();
}

function draw() {
  if(draw_apple == "set")
  {
    for (var i = 1; i < to_number; i++) {
        x  = Math.floor(Math.random()*40);
        y  = Math.floor(Math.random()*10);
        image(apple, x, y, 50, 50);
        
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number + "Apples drawn";
    speak();
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}