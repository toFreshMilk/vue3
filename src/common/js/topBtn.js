let TopBtn;
let footer;
let footerH;
let bottomElem;
let bottomElemH;
let body;
let scrT;
let winH;
let bodyH;

function setLayout(){
  TopBtn = document.querySelector('.fixed_elem_area')
  footer = document.querySelector('footer')
  bottomElem = document.querySelector('.bottom_elem')
  body = document.querySelector('#__nuxt')
  scrT = document.documentElement.scrollTop || 0;
  winH = window.innerHeight
  bodyH = body.clientHeight
  if (!footer) {
    footerH = 0
  } else {
    footerH = footer.clientHeight
  }
  if (!bottomElem) {
    bottomElemH = 0
  } else {
    bottomElemH = bottomElem.clientHeight
  }
}

const topBtn = () => {
  setLayout();
  window.addEventListener('scroll', () => {
    bodyH = body.clientHeight;
    scrT = document.documentElement.scrollTop;
    if (scrT > 300) {
      TopBtn.classList.add('is_active')
      if (scrT + winH > bodyH - footerH + bottomElemH) {
        TopBtn.style.position = 'absolute'
        TopBtn.style.bottom = 10 + 'px'
      } else {
        TopBtn.style.position = 'fixed'
        TopBtn.style.bottom = bottomElemH + 20 + 'px'
      }
    } else {
      TopBtn.classList.remove('is_active')
    }
  })
}
export default topBtn;
