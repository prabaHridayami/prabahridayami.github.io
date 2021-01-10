////////////////////
// Header scripts //
////////////////////

const header = document.querySelector('#site-header');
const mainNav = document.querySelector('.main-nav');


//
// Set header to sticky on scroll
//
const toggleStickyHeader = () => {
    const headerHeight = header.clientHeight;

    let scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 0) {
        header.classList.add('position-fixed');
        document.body.style.paddingTop = headerHeight.toString() + "px";
 
        // document.querySelector("#site-header").style.borderBottom = "1px solid #000"
    } else if (scrollY == 0) {
        header.classList.remove('position-fixed');
        document.body.style.paddingTop = "0px";
        // document.querySelector("#site-header").style.borderBottom = "unset"
    }
}
if (header) {
    toggleStickyHeader();
    document.addEventListener('scroll', () => toggleStickyHeader());
}

//
// Toggle main navigation open/close
//
const openBtn = document.querySelector('.nav-open-btn');
const closeBtn = document.querySelector('.nav-close-btn');
const navClick = (param) => param.onclick = () => document.querySelector('.main-nav').classList.toggle('mainnav-open');
if (openBtn && closeBtn) {
    navClick(openBtn);
    navClick(closeBtn);
}


///////////////////////////////
// Header and Footer scripts //
///////////////////////////////

//
// Toggle sub-navigation open/close on mobile
//
const toggleSubNav = (menu, maxWidth) => {
    if (menu) {
        const menuItemsWithChildren = menu.querySelectorAll('.item-has-children');
        const mediaQuery = window.matchMedia("(max-width: " + maxWidth + "px)");

        if (mediaQuery.matches) {
            menuItemsWithChildren.forEach(el => {
                const borderBottomWidth = parseInt(window.getComputedStyle(el).getPropertyValue('border-bottom-width').split("px")[0]);
                const closedHeight = el.querySelector('a[aria-haspopup="true"]').offsetHeight + borderBottomWidth;
                const openHeight = closedHeight + el.querySelector('.menu-children-wrapper').offsetHeight;
                const closeSubNav = (el) => {
                    el.style.height = closedHeight + "px";
                    el.classList.remove('subnav-open');
                }
                const openSubNav = (el) => {
                    el.style.height = openHeight + "px";
                    el.classList.add('subnav-open');
                }

                // Ensure panel is closed on load and on resize
                closeSubNav(el);

                el.onclick = () => {
                    if (el.classList.contains('subnav-open')) {
                        // If panel is already open, close it
                        closeSubNav(el);
                    } else {
                        // Close all other panels
                        menuItemsWithChildren.forEach(element => closeSubNav(element));
                        // Then open selected panel
                        openSubNav(el);
                    }
                }
            });
        } else {
            menuItemsWithChildren.forEach(el => {
                el.style.height = 'auto';
                el.classList.remove('subnav-open');
                el.onclick = () => {}
            });
        }
    }
}
toggleSubNav(mainNav, 1200);

//
// Smooth scroll to anchor for any link with 'scroll' class
//
const scrollTo = () => {
    const links = document.querySelectorAll('.scroll');
    links.forEach(each => each.addEventListener('click', (e) => scrollAnchors(e)));
}
const scrollAnchors = (e, respond = null) => {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    const targetID = (respond) ? respond.getAttribute('href') : e.target.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    window.scrollBy({
        top: originalTop - headerHeight + 2,
        left: 0,
        behavior: 'smooth'
    });
    const checkIfDone = setInterval(() => {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
        if (distanceToTop(targetAnchor) === (0 + headerHeight - 2) || atBottom) {
            window.history.pushState('', '', targetID);
            clearInterval(checkIfDone);
        }
    }, 100);
}
scrollTo();


///////////////////////////
// Resize event listener //
///////////////////////////
let resize = () => {};
window.addEventListener('resize', () => {
    clearTimeout(resize);
    resize = setTimeout(() => {
        toggleSubNav(mainNav, 1200);
    }, 500);
});