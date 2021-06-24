let win = {}

function setLayouts() {
  win.winW = window.innerWidth;
  win.winH = window.innerHeight;
}

const setFixElem = (markerElTop, markerElBottom, fixElem) => {
  setLayouts()
  let markerTop
  let markerBottom
  let fixer
  let fixerH
  let headerH = document.querySelector('header').clientHeight
  fixer = document.querySelector(fixElem);
  if(!fixer) return
  fixerH = document.querySelector(fixElem).clientHeight
  let st = window.pageYOffset;
  if (markerElTop) {
    markerTop = document.querySelector(markerElTop)
    if(!markerTop) return
    let mTopInfo = {
      top: markerTop.getBoundingClientRect().top,
      height: markerTop.clientHeight,
    }
    let mTop = mTopInfo.top + st + win.winH - headerH;
    calcElemTop(st, mTop, fixer)
    function calcElemTop(st, mTop, fixer) {
      if (st + win.winH > mTop) {
        fixer.classList.add('top')
      } else {
        fixer.classList.remove('top')
      }
    }
  }
  if (markerElBottom) {
    markerBottom = document.querySelector(markerElBottom)
    if(!markerBottom) return
    let markerBottomH = markerBottom.clientHeight
    let mBottomInfo = {
      top: markerBottom.getBoundingClientRect().top,
      height: markerBottom.clientHeight,
    }
    let mBottom = mBottomInfo.top + mBottomInfo.height + st;
    calcElemBottom(st, mBottom, fixer)
    function calcElemBottom(st, mBottom, fixer) {
      if (st + win.winH > mBottom) {
        fixer.classList.add('bottom')
      } else {
        fixer.classList.remove('bottom')

      }
    }
  }
}

export default setFixElem;
