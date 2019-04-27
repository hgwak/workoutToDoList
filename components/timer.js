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
        if (workoutList.model.records.length > 0) {
            for (let i = 0; i < workoutList.model.records.length; i++) {
                if(workoutList.model.records[i].data.complete === "Incomplete"){
                    workoutList.model.records[i].minusIcon.click();
                    break;
                }
            }
        }
        timerFlag=false;
        $('body').addClass('colorChange');
        resetTimer();
        setTimeout(()=>{
            $('body').removeClass('colorChange')
        },2000)
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
