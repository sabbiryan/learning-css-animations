window.addEventListener("DOMContentLoaded", function (e) {
    document.querySelector("hp-presentation").onclick = handelPresentationClick;
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

        var aa = parseInt(next.getAttribute('data-autoadfvance'));

        if (!isNaN(aa)) {
            setTimeout(function (e) {
                handelPresentationClick(e);
            }, aa);
        }
    }
}