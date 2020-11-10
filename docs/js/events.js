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
            prevEl: '.swiper-button-prev',
         },
         centeredSlides: true,
         a11y: true,
         keyboardControl: true,
         grabCursor: true,
         // pagination
         pagination: '.swiper-pagination',
         paginationClickable: true
      });
   }; 

   breakpoint.addListener(breakpointChecker); // kickstart

   breakpointChecker();
})();
/* IIFE end */

let loopSwiper = new Swiper('.equipo', {
   loop: true,
   spaceBetween: 30,
   slidesPerView: 1,
   // Navigation arrows
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },

   pagination: '.swiper-pagination',
   breakpoints: {
      640: {
         slidesPerView:2,
      },
      1024:{
         slidesPerView:1,
         centeredSlides: true,
      }
   }

});

(function () {

   // VARIABLES
   const timeline = document.querySelector(".timeline ol"),
      elH = document.querySelectorAll(".timeline li > div"),
      arrows = document.querySelectorAll(".timeline .arrows .arrow"),
      arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
      arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
      firstItem = document.querySelector(".timeline li:first-child"),
      lastItem = document.querySelector(".timeline li:last-child"),
      xScrolling = 390,
      disabledClass = "disabled";

   // START
   window.addEventListener("load", init);

   function init() {
      setEqualHeights(elH);
      animateTl(xScrolling, arrows, timeline);
      setSwipeFn(timeline, arrowPrev, arrowNext);
      setKeyboardFn(arrowPrev, arrowNext);
   }

   // SET EQUAL HEIGHTS
   function setEqualHeights(el) {
      let counter = 0;
      for (let i = 0; i < el.length; i++) {
         const singleHeight = el[i].offsetHeight;

         if (counter < singleHeight) {
            counter = singleHeight;
         }
      }

      for (let i = 0; i < el.length; i++) {
         el[i].style.height = `260px`;
      }
   }

   // CHECK IF AN ELEMENT IS IN VIEWPORT
   // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
   function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
         rect.top >= 0 &&
         rect.left >= 0 &&
         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
   }

   // SET STATE OF PREV/NEXT ARROWS
   function setBtnState(el, flag = true) {
      if (flag) {
         el.classList.add(disabledClass);
      } else {
         if (el.classList.contains(disabledClass)) {
            el.classList.remove(disabledClass);
         }
         el.disabled = false;
      }
   }

   // ANIMATE TIMELINE
   function animateTl(scrolling, el, tl) {
      let counter = 0;
      for (let i = 0; i < el.length; i++) {
         el[i].addEventListener("click", function () {
            if (!arrowPrev.disabled) {
               arrowPrev.disabled = true;
            }
            if (!arrowNext.disabled) {
               arrowNext.disabled = true;
            }
            const sign = (this.classList.contains("arrow__prev")) ? "" : "-";
            if (counter === 0) {
               tl.style.transform = `translateX(-${scrolling}px)`;
            } else {
               const tlStyle = getComputedStyle(tl);
               // add more browser prefixes if needed here
               const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
               const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
               tl.style.transform = `translateX(${values}px)`;
            }

            setTimeout(() => {
               isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
               isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
            }, 500);

            counter++;
         });
      }
   }

   // ADD SWIPE SUPPORT FOR TOUCH DEVICES
   function setSwipeFn(tl, prev, next) {
      const hammer = new Hammer(tl);
      hammer.on("swipeleft", () => next.click());
      hammer.on("swiperight", () => prev.click());
   }

   // ADD BASIC KEYBOARD FUNCTIONALITY
   function setKeyboardFn(prev, next) {
      document.addEventListener("keydown", (e) => {
         if ((e.which === 37) || (e.which === 39)) {
            const timelineOfTop = timeline.offsetTop;
            const y = window.pageYOffset;
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