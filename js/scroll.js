//
// Animate on scroll
//
AOS.init({
    offset: 200,
    duration: 1000,
    easing: 'ease-in-out',
    disable: 'mobile'
});

// Fixes animations triggering earlier due to lazyloading
document.addEventListener('lazyloaded', e => AOS.refresh());
/***
 * ScrollMagic
 ***/

document.addEventListener("DOMContentLoaded", () => {   
    var controller = null;
    const steps = document.querySelectorAll('.step');
    
    var scrollMagic = () =>{
        controller = new ScrollMagic.Controller();
        steps.forEach((el, i) => {
            const vpHeight = window.innerHeight;
            const sectionHeight = el.offsetHeight;

            let sceneTrigger = el;
            let sceneTriggerHook = .15;
            let sceneDuration = sectionHeight;

            el.classList.remove('active');

            if (i == 0) { // if first item
                el.classList.add('active'); // first item starts off visible

                // keep first item visible
                sceneTrigger = 'body';
                sceneDuration = el.offsetTop + sectionHeight + (vpHeight - sectionHeight) / 2;
            }

            if (i == steps.length - 1) { // if last item
                let uspHeight = parseFloat(getComputedStyle(document.querySelector('.section-about'), null).height);
                document.querySelector('.section-about').style.height = uspHeight + sectionHeight + "px" // extend height of whole container by height of last item
                sceneDuration = 0; // keep last item visible
            }

            const pin = new ScrollMagic.Scene({
                    triggerElement: el,
                    triggerHook: ((vpHeight - sectionHeight) / 2) / vpHeight,
                    duration: sectionHeight
                }).addTo(controller)
                .setPin(el, {
                    pushFollowers: false
                });

            const scene = new ScrollMagic.Scene({
                    triggerElement: sceneTrigger,
                    triggerHook: sceneTriggerHook,
                    duration: sceneDuration
                }).addTo(controller)
                .setClassToggle(el, 'active');
        }); 
    }

    if (window.innerWidth > 780) {
        scrollMagic();
    }

    const destroyMagic =()=>{
        if(controller){
            controller = controller.destroy(true);
            controller = null;
        }
    }

    let resize1 = () => {};
    window.addEventListener('resize', () => {
        clearTimeout(resize1);
        resize1 = setTimeout(() => {
            if (window.innerWidth < 780) {
                destroyMagic()
            }else{
                destroyMagic();
                scrollMagic();
            }
        }, 500);
    });

});

const arrowUp = document.querySelector('.arrow-up');

arrowUp.addEventListener('click',()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

})