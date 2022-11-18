import Vue from 'vue';

export default Vue.directive('watermark', (el, binding) => {
    let textName = binding.value.textName;
    let textAccount = binding.value.textAccount;
    let textTime = binding.value.textTime;
    let font = binding.value.font || '12px sans-regular, Microsoft YaHei, "黑体"';
    let textColor = binding.value.textColor || 'rgba(215, 215, 215, 0.2)';
    // 水印文字的水平间距
    let width = binding.value.width || 400;
    // 水印文字的高度间距（低于文字高度会被替代）
    let height = binding.value.height || 200;
    //-90到0， 负数值，不包含-90
    let textRotate = binding.value.textRotate || -20;

    function addWaterMarker(parentNode) {
        var can = document.createElement('canvas');
        parentNode.appendChild(can);
        can.width = width;
        can.height = height;
        can.style.display = 'none';
        var cans = can.getContext('2d');
        cans.rotate((textRotate * Math.PI) / 180);
        cans.font = font;
        cans.fillStyle = textColor;
        cans.textAlign = 'left';
        cans.textBaseline = 'Middle';
        cans.fillText(textName, width / 6, can.height);
        cans.fillText(textAccount + ' ' + textTime, width / 8, can.height + 22);
        parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
    }
    addWaterMarker(el);
});
