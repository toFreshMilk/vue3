let beforeY = 0;

const detailScrollSet = () => {
  const header = document.querySelector('header')
  const detailTtl = document.querySelector('.detail_head .ttl_area')
  const ttlInfo = {
    top: detailTtl.scrollTop,
    height: detailTtl.clientHeight
  }
  function setInfo(){
    let nowY = document.documentElement.scrollTop;
    let dir = nowY - beforeY >= 0 ? 1 : -1;
    beforeY = nowY;
    if(dir === -1) {
      header.classList.add('fix')
      if(nowY <= ttlInfo.top + ttlInfo.height + 50){
        header.classList.remove('show_ttl')
      } else  {
        header.classList.add('show_ttl')
      }
    } else  {
      header.classList.remove('fix')
    }
    if(nowY === 0) header.classList.remove('fix');
  }
  setInfo()
}

export default detailScrollSet;
