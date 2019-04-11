
function startTimer() {
    var presentTime = $('.timer').text();
    var timeArray = presentTime.split(':');
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    //if(m<0){alert('timer completed')}

    if(presentTime!=="0:00"){
        $('.timer').text(m + ":" + s);
        setTimeout(startTimer, 1000);
    }
    if(presentTime==="0:00"){
        timerFlag=false;
        resetTimer();
    }
}
function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
}

function resetTimer(){
    $('.timer').text('3:00')
}