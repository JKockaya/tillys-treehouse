// ----------------------------//
// ---Variable Declarations--- //
// ----------------------------//

// Date and time information
const date = new Date();
let currentTime = date.getHours();
let month = date.getMonth();

// Document elements
const backImage = document.getElementById('container');
const timeIcon = document.getElementById('time-icon');
const timeFallback = document.getElementById('time-fallback');

// Season arrays
const summer = [2, 3, 4, 5, 6, 7];
const autumn = [8, 9, 10];
const winter = [11, 0, 1];


// ----------------------------//
// -------Function Calls------ //
// ----------------------------//

checkMonth();

checkTime();


// ----------------------------//
// ---Function Declarations--- //
// ----------------------------//

// ---Change container class based on month--- //
function checkMonth() { 
    if (summer.includes(month)) {
        backImage.setAttribute("class", "container summer");
    } else if (autumn.includes(month)) {
        backImage.setAttribute("class", "container autumn");
    } else if (winter.includes(month)) {
        backImage.setAttribute("class", "container winter");
    }
}


// ---Change time indicator icon based on current time--- //
function checkTime() {
    if (currentTime > 17 || currentTime < 6) {
        timeIcon.setAttribute("data", "graphics/moon.svg");
        timeFallback.setAttribute("src", "graphics/moon.png");
        timeFallback.setAttribute("alt", "Moon");
    }
}