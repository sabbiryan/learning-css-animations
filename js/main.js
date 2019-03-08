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
    }
}



function handelAnimationEnd(e) {
    var slide = e.target.closest("hp-slide");

    var aa = slide.getAttribute("data-autoadvance");

    if (aa == "animationend" && slide.classList.contains("active")) {
        handelPresentationClick(e);
    }
}