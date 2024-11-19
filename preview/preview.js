const previewCanvas = document.getElementById('previewCanvas');
const previewCtx = previewCanvas.getContext('2d');

previewCanvas.width = 400;
previewCanvas.height = 100;

// 实时更新打字预览窗口
function updatePreview() {
  const characters = JSON.parse(localStorage.getItem('characters')) || {};
  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

  let x = 10; // 初始 x 坐标
  Object.keys(characters).forEach((char) => {
    const img = new Image();
    img.src = characters[char];
    img.onload = () => {
      previewCtx.drawImage(img, x, 10, 50, 50); // 绘制字符
      x += 60; // 每个字符之间的间隔
    };
  });
}

// 添加监听，实时更新
document.addEventListener('updateGlyph', updatePreview);

// 初始化
updatePreview();