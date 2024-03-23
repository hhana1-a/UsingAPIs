'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';
const WALKING_CAT = document.getElementById('cat_walking');

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    // Resolve this promise when the cat (`img`) has walked from `startPos` to
    // `stopPos`.
    // Make good use of the `STEP_INTERVAL_PX` and `STEP_INTERVAL_MS`
    // constants.

    let currentPos = startPos;
    const walkInterval = setInterval(() => {
      
    currentPos += STEP_SIZE_PX;
    img.style.left = currentPos + 'px';

    if (currentPos >= stopPos) { 
      clearInterval(walkInterval);
      resolve();
    }
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise((resolve) => {
    // Switch the `.src` of the `img` from the walking cat to the dancing cat
    // and, after a timeout, reset the `img` back to the walking cat. Then
    // resolve the promise.
    // Make good use of the `DANCING_CAT_URL` and `DANCE_TIME_MS` constants.

     const originalSrc = img.src;

      img.src = DANCING_CAT_URL;

      setTimeout( ()=> {

        img.src = originalSrc;

        resolve ();

      }, DANCE_TIME_MS);
    });
}

async function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  // Use async/await syntax to loop the walk and dance functions


  while (startPos < stopPos) { 
    await walk(img, startPos, centerPos)
    await dance(img)
    await walk(img, centerPos, stopPos)
  }
}

window.addEventListener('load', catWalk);