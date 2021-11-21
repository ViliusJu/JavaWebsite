let controller;
let slideScene;
let pageScene;

function animateSlide (){
    // IKnit Controller
    controller = new ScrollMagic.Controller();

    //select some thing

    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelectorAll('.nav-header');

    //loop

    sliders.forEach((slide, index, slides) =>{
        const revealImg = slide.querySelector(".reveal-image");
        const img = slide.querySelector('img');
        const revelText = slide.querySelector('.reveal-text');

       /* gsap.to(revealImg, {x: "100%"});
        gsap.to(img, 1, {scale: 2})*/

        const slideTL = gsap.timeline({defaults:{duration:1, ease :"power2.inOut"}})

        slideTL.fromTo(revealImg, {x: '0%'}, {x: '100%'} );
        slideTL.fromTo(img, {scale: 2}, {scale:1}, '-=1');
        slideTL.fromTo(revelText, {x: '0%'}, {x: '100%'}, '-=.5');
        slideTL.fromTo(nav, {y: '-100%'}, {y: '0%'}, '-=.5');

        //schene

        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        }).setTween(slideTL)
        .addIndicators({
            colorStart: "white",
            colorTrigger:"white",
            name:"slide"
        }).addTo(controller);

        ///Add animation
        const pageTL = gsap.timeline();
        let nextSlide = slides.length-1 === index ? 'end' : slides[index + 1];
        pageTL.fromTo(nextSlide, {y: '0%'}, {y:'50%'});
        pageTL.fromTo(slide, {opacity:1, scale:1}, {opacity:0, scale:0.5});
        pageTL.fromTo(nextSlide, {y: '50%'}, {y:'0%'}, "-=.5")
        ///Create  a New shene;
        pageScene  = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook:0
        })
        .addIndicators({
            colorStart: "white",
            colorTrigger:"white",
            name:"page",
            indent:200
        })
        .setPin(slide, {pushFollowers: false})
        .setTween(pageTL)
        .addTo(controller);

    });

  
}
let mouse = document.querySelector(".cursor");
let mouseTxT = mouse.querySelector('span');
function cursor(event){
  
   mouse.style.top = event.pageY + 'px';
   mouse.style.left = event.pageX + 'px';
}

function activeCursor(event) {
    const item = event.target;
    if (item.id === "logo" || item.classList.contains("burger")) {
      mouse.classList.add("nav-active");
    } else {
      mouse.classList.remove("nav-active");
    }
    if ( item.classList.contains('explore')){
        mouse.classList.add("explore-active");
        mouseTxT.innerText = 'Tap';
        gsap.to(".title-swipe", 1, {y:"0%"})
        console.log(item);
    } else {
        mouse.classList.remove("explore-active")
        mouseTxT.innerText = "";
        gsap.to(".title-swipe", 1, {y:"100%"});
    }
}

window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);

animateSlide();
activeCursor();



