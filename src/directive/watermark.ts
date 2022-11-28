export default {
    name: 'watermark',
    beforeMount(el: HTMLElement | null, binding: any) {
        const textName = binding.value.textName;
        const textAccount = binding.value.textAccount;
        const textTime = binding.value.textTime;
        const font = binding.value.font || '12px sans-regular, Arial';
        const textColor = binding.value.textColor || 'rgba(215, 215, 215, 0.2)';
        // 水印文字的水平间距
        const width = binding.value.width || 400;
        // 水印文字的高度间距（低于文字高度会被替代）
        const height = binding.value.height || 200;
        // -90到0， 负数值，不包含-90
        const textRotate = binding.value.textRotate || -20;

        const addWaterMarker = (parentNode:any) => {
            const can:any = document.createElement('canvas') as HTMLCanvasElement | null;
            parentNode.appendChild(can);
            can.width = width;
            can.height = height;
            can.style.display = 'none';
            const cans = can.getContext('2d');
            cans.rotate((textRotate * Math.PI) / 180);
            cans.font = font;
            cans.fillStyle = textColor;
            cans.textAlign = 'left';
            cans.textBaseline = 'Middle';
            cans.fillText(textAccount, width / 4.3, can.height);
            cans.fillText(textName, width / 3.5, can.height + 22);
            cans.fillText(textTime, width / 4.8, can.height + 44);
            parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
        };
        addWaterMarker(el);
    }
};
