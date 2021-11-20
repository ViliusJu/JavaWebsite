let controller;
let slideScene;

function animateSlide (){
    // IKnit Controller
    controller = new ScrollMagic.Controller();

    //select some thing

    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelectorAll('.nav-header');

    //loop

    sliders.forEach(slide =>{
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
    });

  
}

animateSlide();
