var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var back = document.querySelector("#goBack");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
var allHighScores = localStorage.getItem("allHighScores");
allHighScores = JSON.parse(allHighScores);

if (allHighScores !== null) {

    for (var i = 0; i < allHighScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allHighScores[i].initials + " " + allHighScores[i].score;
        highScore.appendChild(createLi);

    }
}
// Event listener to move to index page
goBack.addEventListener("click", function () {
    window.location.replace("../index.html");
});