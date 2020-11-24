"use strict";

(function () {
  'use strict'; // breakpoint where swiper will be destroyed
  // and switches to a dual-column layout

  var breakpoint = window.matchMedia('(min-width:31.25em)'); // keep track of swiper instances to destroy later

  var mySwiper;

  var breakpointChecker = function breakpointChecker() {
    // if larger viewport and multi-row layout needed
    if (breakpoint.matches === true) {
      // clean up old instances and inline styles when available
      if (mySwiper !== undefined) mySwiper.destroy(true, true); // or/and do nothing

      return; // else if a small viewport and single column layout needed
    } else if (breakpoint.matches === false) {
      // fire small viewport version of swiper
      return enableSwiper();
    }
  };

  var enableSwiper = function enableSwiper() {
    mySwiper = new Swiper('.swiper-break', {
      loop: true,
      spaceBetween: 30,
      slidesPerView: 'auto',
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      centeredSlides: true,
      a11y: true,
      keyboardControl: true,
      grabCursor: true,
      // pagination
      pagination: '.swiper-pagination'
    });
  };

  breakpoint.addListener(breakpointChecker); // kickstart

  breakpointChecker();
})();
/* IIFE end */


var loopSwiper = new Swiper('.equipo', {
  loop: true,
  spaceBetween: 30,
  slidesPerView: 1,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: '.swiper-pagination',
  breakpoints: {
    640: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 1,
      centeredSlides: true
    }
  }
});
var comments = new Swiper('.comments-swiper', {
  loop: true,
  spaceBetween: 30,
  slidesPerView: 1,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  centeredSlides: true,
  a11y: true,
  keyboardControl: true,
  grabCursor: true,
  // pagination
  pagination: '.swiper-pagination',
  paginationClickable: true,
  breakpoints: {
    640: {
      slidesPerView: 2,
      centeredSlides: false
    },
    1024: {
      slidesPerView: 3,
      centeredSlides: false
    },
    1366: {
      slidesPerView: 4,
      centeredSlides: false
    }
  }
});

(function () {
  // VARIABLES
  var timeline = document.querySelector(".timeline ol"),
      elH = document.querySelectorAll(".timeline li > div"),
      arrows = document.querySelectorAll(".timeline .arrows .arrow"),
      arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
      arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
      firstItem = document.querySelector(".timeline li:first-child"),
      lastItem = document.querySelector(".timeline li:last-child"),
      xScrolling = 390,
      disabledClass = "disabled"; // START

  window.addEventListener("load", init);

  function init() {
    setEqualHeights(elH);
    animateTl(xScrolling, arrows, timeline);
    setSwipeFn(timeline, arrowPrev, arrowNext);
    setKeyboardFn(arrowPrev, arrowNext);
  } // SET EQUAL HEIGHTS


  function setEqualHeights(el) {
    var counter = 0;

    for (var i = 0; i < el.length; i++) {
      var singleHeight = el[i].offsetHeight;

      if (counter < singleHeight) {
        counter = singleHeight;
      }
    }

    for (var _i = 0; _i < el.length; _i++) {
      el[_i].style.height = "260px";
    }
  } // CHECK IF AN ELEMENT IS IN VIEWPORT
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport


  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  } // SET STATE OF PREV/NEXT ARROWS


  function setBtnState(el) {
    var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (flag) {
      el.classList.add(disabledClass);
    } else {
      if (el.classList.contains(disabledClass)) {
        el.classList.remove(disabledClass);
      }

      el.disabled = false;
    }
  } // ANIMATE TIMELINE


  function animateTl(scrolling, el, tl) {
    var counter = 0;

    for (var i = 0; i < el.length; i++) {
      el[i].addEventListener("click", function () {
        if (!arrowPrev.disabled) {
          arrowPrev.disabled = true;
        }

        if (!arrowNext.disabled) {
          arrowNext.disabled = true;
        }

        var sign = this.classList.contains("arrow__prev") ? "" : "-";

        if (counter === 0) {
          tl.style.transform = "translateX(-".concat(scrolling, "px)");
        } else {
          var tlStyle = getComputedStyle(tl); // add more browser prefixes if needed here

          var tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
          var values = parseInt(tlTransform.split(",")[4]) + parseInt("".concat(sign).concat(scrolling));
          tl.style.transform = "translateX(".concat(values, "px)");
        }

        setTimeout(function () {
          isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
          isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
        }, 500);
        counter++;
      });
    }
  } // ADD SWIPE SUPPORT FOR TOUCH DEVICES


  function setSwipeFn(tl, prev, next) {
    var hammer = new Hammer(tl);
    hammer.on("swipeleft", function () {
      return next.click();
    });
    hammer.on("swiperight", function () {
      return prev.click();
    });
  } // ADD BASIC KEYBOARD FUNCTIONALITY


  function setKeyboardFn(prev, next) {
    document.addEventListener("keydown", function (e) {
      if (e.which === 37 || e.which === 39) {
        var timelineOfTop = timeline.offsetTop;
        var y = window.pageYOffset;

        if (timelineOfTop !== y) {
          window.scrollTo(0, timelineOfTop);
        }

        if (e.which === 37) {
          prev.click();
        } else if (e.which === 39) {
          next.click();
        }
      }
    });
  }
})();