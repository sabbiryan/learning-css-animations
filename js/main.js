window.addEventListener("DOMContentLoaded", function (e) {
    var presentation = document.querySelector("hp-presentation");

    presentation.onclick = handelPresentationClick;
    presentation.addEventListener("animationend", handelAnimationEnd, false);
});

function handelPresentationClick(e) {

    var current = document.querySelector('hp-slide.active');
    var next = current.nextElementSibling;

    while (next && next.tagName != "HP-SLIDE") {
        next.nextElementSibling;
    }

    if (next) {
        current.classList.remove("active");
        next.classList.add("active");

        next.querySelectorAll(".match").forEach(function (el) {
            setTimeout(function () {
                el.classList.remove("match");
            }, 0)
        })
        var aa = parseInt(next.getAttribute('data-autoadvance'));

        if (!isNaN(aa)) {
            setTimeout(function (e) {
                handelPresentationClick(e);
            }, aa);
        }


        var osa = next.getAttribute("data-onshow");
        if (osa) {
            window[osa]();
        }
    }
}



function handelAnimationEnd(e) {
    var slide = e.target.closest("hp-slide");

    var aa = slide.getAttribute("data-autoadvance");

    if (aa == "animationend" && slide.classList.contains("active")) {
        handelPresentationClick(e);
    }
}


function setLearImage(imageName) {
    var img = document.querySelector("hp-slide.active hp-learn img");

    img.src = "./images/" + imageName + ".svg";
}

var shapes = ["circle", "dimond", "square", "triangle"];

function showLearning() {
    var ii = Math.floor(Math.random() * shapes.length);

    setLearImage(shapes[ii]);

    var slide = document.querySelector("hp-slide.active");
    slide.classList.remove("learn-year");
    slide.classList.remove("learn-no");
    slide.classList.add(ii ? "learn-no" : "learn-yes");
}

function startLearning(learningDelay) {
    showLearning();

    setTimeout(function () {
        showLearning();

        learningDelay = Math.pow(learningDelay, 1 / 1.05);
        startLearning(learningDelay);

    }, learningDelay);
}

function runLearningSequence() {
    startLearning(1500);
}