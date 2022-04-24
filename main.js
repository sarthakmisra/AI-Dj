song = "";
lftristX = 0;
lftristY = 0;
rhtristX = 0;
rhtristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function preload() {
song = loadSound("musica.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    vid = createCapture(VIDEO);
    vid.hide();

    posenet = ml5.poseNet(vid, moodlloaded);
    posenet.on('pose',gotposes);
}
function draw() {
    image(vid,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreleftwrist > 0.2)
    {
        circle(lftristX, lftristY, 20);
        InNumber = Number(lftristY);
        removedcmals = floor(InNumber);
        volume = removedcmals/500;
        document.getElementById("volume_id").innerHTML = "Volume =" + volume;
        song.setVolume(volume);

        
    }
    if(scorerightwrist > 0.2) {
        circle(rhtristX, rhtristY, 20);
    
        if(rhtristY >0 && rhtristY <= 100)
        {
            document.getElementById("speed_id").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rhtristY >100 && rhtristY <= 200)
        {
            document.getElementById("speed_id").innerHTML = "Speed = 1x";
song.rate(1);
        }
        else if(rhtristY >200 && rhtristY <= 300)
        {
            document.getElementById("speed_id").innerHTML = "Speed = 1.5x";
song.rate(1.5);
        }
        else if(rhtristY >300 && rhtristY <= 400)
        {
            document.getElementById("speed_id").innerHTML = "Speed = 2x";
song.rate(2);
        }
        else if(rhtristY >400 && rhtristY <= 500)
        {
            document.getElementById("speed_id").innerHTML = "Speed = 2.5x";
song.rate(2.5);
        }
       
    }

}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function pos() {
    song.pause();
}
function stop() {
    song.stop();
}
function moodlloaded() {
    console.log('PoseNet is Intialized');
}
function gotposes(results) {
    if(results.length > 0)
{
        console.log(results);

        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist =" + scoreleftwrist);
        lftristX = results[0].pose.leftWrist.x;
lftristY = results[0].pose.leftWrist.y;
console.log("leftWristX =" + lftristX +"leftWristY ="+lftristY);

rhtristX = results[0].pose.rightWrist.x;
rhtristY = results[0].pose.rightWrist.y;
console.log("rightWristX =" + rhtristX + " rightWristY =" + rhtristY);

    }

}
