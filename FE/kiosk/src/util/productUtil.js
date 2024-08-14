export function getProductIcon(product_id){
  const iconMap = {
    "1": '💻',
    "2": '⌨️',
    "3": '🖱️',
    "7": '💾',
    "8": '🎧',
    "9": '📷',
    "13": '📐',
    "14": '🖱️',
    "76": '✂️',
  };
  return iconMap[product_id];
}
export function getProductIcon1(name){
  const iconMap = {
    "마우스": '🖱️',
    "가위": '✂️',
  };
  return iconMap[name];
}