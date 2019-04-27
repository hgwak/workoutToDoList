var defaultTime = '3:00'

function startTimer() {
    var presentTime = $('.timer').text();
    var timeArray = presentTime.split(':');
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    $('.timer').text(m + ":" + s);
    pauseFlag = false;
    if(presentTime!=="0:00"){
        setTimeout(function(){
            if (pauseFlag) {
                timerFlag = false;
                pauseFlag = false;
                return;
            }
            startTimer()
        }, 1000);
    }
    
    if(presentTime==="0:00"){
        alert('REST TIME OVER!')
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
    pauseFlag=true;
    $('.timer').text(defaultTime);
    $('.startStop').text('Start');
}

function setTimer(){
    if(!timerFlag){
        pauseFlag = false;
    }else{
        pauseFlag=true;
    }
    $('.startStop').text('Start');
    let newTime = $(this).text();
    defaultTime = newTime;
    $('.timer').text(newTime);
}
