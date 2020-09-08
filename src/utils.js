// import { useLayoutEffect, useState } from 'react';

/**
 * Calculate the distance of two x,y points
 *
 * @param point1 an object with x,y attributes representing the start point
 * @param point2 an object with x,y attributes representing the end point
 *
 * @returns {number}
 */
export const linearDistance = (point1, point2) => {
  const xs = point2.x - point1.x
  const ys = point2.y - point1.y
  return Math.sqrt(xs * xs + ys * ys)
}

/**
 * Return a random uuid of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * @returns {string}
 */
export const uuid4 = () => {
  let uuid = '',
    ii
  for (ii = 0; ii < 32; ii += 1) {
    switch (ii) {
      case 8:
      case 20:
        uuid += '-'
        uuid += ((Math.random() * 16) | 0).toString(16)
        break
      case 12:
        uuid += '-'
        uuid += '4'
        break
      case 16:
        uuid += '-'
        uuid += ((Math.random() * 4) | 8).toString(16)
        break
      default:
        uuid += ((Math.random() * 16) | 0).toString(16)
    }
  }
  return uuid
}

// Replaces the lodash implementation of Debounce with this, a copy of the underscore one
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  var timeout
  return function () {
    var context = this,
      args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

// export function useWindowSize() {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener('resize', updateSize);
//     updateSize();
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);
//   return size;
// }

export function disableScrolling() {
  const x = window.scrollX
  const y = window.scrollY

  window.onscroll = function () {
    window.scrollTo(x, y)
  }

  document.body.addEventListener('touchmove', _preventDefault, { passive: false })
}

export function enableScrolling() {
  window.onscroll = function () {}
  document.body.removeEventListener('touchmove', _preventDefault, { passive: false })
}

function _preventDefault(e) {
  e.preventDefault()
}
