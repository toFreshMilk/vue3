const getGoodsBadges = (item) => {
  
  let badges = new Array();
  if (item.hotYn === 'Y') badges.push({type: 'md', name: 'MD추천'}); // MD추천
  if (item.bestYn === 'Y') badges.push({type: 'best', name: 'BEST'}); // BEST
  if (item.newProdYn === 'Y') badges.push({type: 'new', name: 'NEW'}); // NEW
  if (item.cupnUseYn === 'Y') badges.push({type: 'coupon', name: '쿠폰'}); // 쿠폰
  if (item.giftUseYn === 'Y') badges.push({type: 'present', name: '사은품'}); // 사은품
  if (item.freeDeliYn === 'Y') badges.push({type: 'free', name: '무료배송'}); // 무료배송

  return badges.slice(0, 3);
}

export default getGoodsBadges;
