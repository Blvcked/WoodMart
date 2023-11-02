/* +-----------------------------------------+
|           GLOBALS AREA             		 |
+-----------------------------------------+ */

window.DEBUG = true;

/* +-----------------------------------------+
|           EVENT LISTENERS AREA             |
+-----------------------------------------+ */

// DOC Ready
function documentReady() {
    getHeight(".whb-header", ".whb-general-header", ".whb-header-bottom");
}
document.addEventListener("DOMContentLoaded", documentReady, false);

// WINDOW Load
function windowLoad() {
    isThresholdSurpassed();
    isFooterInview(".footer-container");
    // exitLoader("#siteLoader");
}
window.addEventListener("load", windowLoad, false);

// WINDOW Scroll
function windowScroll() {
    isThresholdSurpassed();
    isFooterInview(".footer-container");
    getScrollDirection();
}
window.addEventListener("scroll", windowScroll, { passive: true });

/* +-----------------------------------------+
|           CUSTOM FUNCTIONS AREA            |
+-----------------------------------------+ */

/**
 * Get to know the selector/s height.
 */
const getHeight = (...selectors) => {
    selectors.forEach((selector) => {
        if (typeof selector !== "string") {
            console.error(
                `Each selector should be a string, but got ${typeof selector}: ${selector}`
            );
            return;
        }

        const target = document.querySelector(selector);

        if (!target) {
            console.warn(`No element matches the selector "${selector}".`);
            return;
        }

        const targetHeight = target.getBoundingClientRect().height;
        const sanitizedSelector = selector.replace(/[^a-zA-Z0-9 _-]/g, "");
        document.documentElement.style.setProperty(
            `--${sanitizedSelector}-height`,
            `${targetHeight}px`
        );
    });
};

/**
 * Get to know if the user has scrolled a certain amount.
 *
 * Simply add a class to the <body> if the user
 * has scrolled enough (800), remove the class otherwise.
 */
function isThresholdSurpassed() {
    document.body.classList.toggle(
        "threshold--surpassed",
        window.scrollY >= 750
    );
}

/**
 * Get to know if the footer has entered the viewport.
 *
 * If the viewport height is greater than the distance
 * from the top of the footer to the top of the viewport,
 * we know the footer has entered the viewport.
 */
function isFooterInview(target) {
    const footer = document.querySelector(target);

    if (footer) {
        const isInView =
            window.innerHeight > footer.getBoundingClientRect().top;
        document.body.classList.toggle("footer--inview", isInView);
    }
}

/**
 * Get to know the current scroll direction.
 *
 * We compare the previous scroll position against
 * the current one, if the latter is bigger, we are
 * moving downwards, else, we are moving upwards.
 *
 * We also replace the previous scroll position
 * with the current one for subsequent iterations.
 */
let previousScrollPosition = window.scrollY;

function getScrollDirection() {
    const currentScrollPosition = window.scrollY;
    const direction =
        currentScrollPosition > previousScrollPosition ? "down" : "up";

    document.body.classList.toggle("scrolling--down", direction === "down");
    document.body.classList.toggle("scrolling--up", direction === "up");

    previousScrollPosition = currentScrollPosition;
}

/**
 * Execute in windowLoad() so the loader
 * goes away as soon as the page is loaded.
 * Remove it from the DOM after X seconds, just in case.
 */
function exitLoader(target) {
    const loaderElement = document.querySelector(target);

    if (loaderElement) {
        document.body.classList.add(`page--loaded`);

        if (window.DEBUG) {
            console.log(`Loader has been dismissed.`);
        }

        // Escape the Loader
        setTimeout(() => {
            loaderElement.remove();

            if (window.DEBUG) {
                console.log(`Loader has been destroyed.`);
            }
        }, 7000);
    }
}
