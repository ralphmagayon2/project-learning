var wakeuptime = 7;
var noon = 12;
var lunchtime = 11;
var naptime = lunchtime + 2;
var partytime;
var evening = 18;

// Getting it to show the current time on the page
var showCurrentTime = function() {
    // Display the string on the webpage
    var clock = document.getElementById('clock');

    var currentTime = new Date();

    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var meridians = "AM";

    if (hours >= noon) {
        meridians = "PM";
    }

    if (hours > noon) {
        hours = hours - 12;
    }
    // Set Minutes
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    // Set Seconds  
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    // put together string that displays the time
    var clockTime = hours + ":" + minutes + ":" + seconds + " " + meridians + "!";

    clock.innerText = clockTime;
};

// Getting the clock to change on its own and change out messages and pictures
var updateClock = function() {
    var time = new Date().getHours();
    var messageText;
    var image = "img/lolcat.jpg";

    var timeEventJS = document.getElementById("timeEvent");
    var localImageJS = document.getElementById("lolcatImage");

    if (time == partytime) {
        image = "img/partyTime.jpg";
        messageText = "Let's Party!"
    }
    else if (time == wakeuptime) {
        image = "img/cat1.jpg";
        messageText = "Wake up!";
    }
    else if (time == lunchtime) {
        image = "img/cat2.jpg";
        messageText = "Let's have some lunch!";
    }
    else if (time == naptime) {
        image = "img/napcat3.jpg";
        messageText = "Sleep tight!";
    }
    else if (time < noon) {
        image = "img/morningcat.jpg";
        messageText = "Good Morning!";
    }
    else if (time >= evening) {
        image = "CatClock/img/Cat_sleep.jpg";
        messageText = "Good Evening!";
    }
    else {
        image = "img/lolcat.jpg";
        messageText = "Good Afternoon! Just chillin...";
    }

    console.log(messageText);
    timeEventJS.innerText = messageText;
    localImageJS.src = image;

    showCurrentTime();
};
updateClock();

// Getting the clock to increment once a second
var oneSecond = 1000;
setInterval(updateClock, oneSecond);

// Getting the Party Time button to Work
var partyButton = document.getElementById("partyTimeButton");

var partyEvent = function() {
    if (partytime < 0) {
        partytime = new Date().getHours();
        partyButton.innerText = "Party Over!";
        partyButton.style.backgroundColor = "#08ADAB";
    }
    else {
        partytime = -1;
        partyButton.innerText = "Party Time!";
        partyButton.style.backgroundColor = "#222";
    }
};

partyButton.addEventListener("click", partyEvent);
partyEvent();

// Activates Wake-uo selector
var wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector");

var wakeUpEvent = function() {
    wakeuptime = parseInt(wakeUpTimeSelector.value);
}

wakeUpTimeSelector.addEventListener("change", wakeUpEvent);

// Activates Lunch Selector
var lunchTimeSelector = document.getElementById("lunchTimeSelector");

var lunchEvent = function() {
    lunchtime = parseInt(lunchTimeSelector.value);
}

lunchTimeSelector.addEventListener("change", lunchEvent);

// Activates Nap-Time Selector
var napTimeSelector = document.getElementById("napTimeSelector");

var napEvent = function() {
    naptime = parseInt(napTimeSelector.value);
}

napTimeSelector.addEventListener("change", napEvent);