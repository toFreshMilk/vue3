
const minHeightSet = () => {
  let header = document.querySelector('header')
  let footer = document.querySelector('footer')
  let winHeight = window.innerHeight
  let totalH
  if(!header){
    header = 0
  }
  if(!footer) {
    footer = 0
  }
  function setInfo(){
    let headerH = header.clientHeight
    let footerH  = footer.clientHeight;
    winHeight = window.innerHeight
    if (!footerH && !headerH){
       totalH = 0
    } else if (!headerH) {
       totalH = footerH
    } else if (!footerH) {
       totalH = headerH
    } else {
       totalH = footerH + headerH
    }
    document.querySelector('#container').style.minHeight = winHeight-totalH + 'px';
    console.log(winHeight, totalH)
  }
  setInfo()
  window.addEventListener('resize', setInfo);
}

export default minHeightSet;
