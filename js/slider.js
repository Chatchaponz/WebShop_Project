const slider1 = document.getElementById("glide1");

new Glide(slider1,{
    type: "carousel",
    startAt: 0,
    preView: 1,
    animationDuration: 800,
    animationTimimgFunc: "linear"
}).mount();