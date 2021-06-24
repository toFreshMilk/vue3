let item;
let layoutInfo = {
  winWidth: '',
  winHeight: '',
}

function setWid(gutter, itemCol){
  let itemWidth = (item.clientWidth - gutter) / itemCol
  return item.clientWidth
}

const masonryListSet = (gutter, itemCol) => {
  layoutInfo.winWidth = window.innerWidth;
  layoutInfo.winHeight = window.innerHeight;
  item = document.querySelector('.item_list');
  window.addEventListener('resize', setWid, gutter, itemCol)
}

const removeMasonryListSet = () => {
  window.removeEventListener('resize', setWid)
}

export { masonryListSet,  removeMasonryListSet };
