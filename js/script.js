let k = 0;

document.getElementById("button").addEventListener("click", _ => {
    $("#modal").modal("show");
});

let pointSet = {};
let lineSet = {};

selectPoints("img", "container", 20, 4, 10, pointSet);
// selectLines("img", "container", 5, 2, lineSet);
