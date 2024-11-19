const glyphCanvas = document.getElementById('glyphCanvas');
const glyphCtx = glyphCanvas.getContext('2d');

// 初始化画布
glyphCanvas.width = 400;
glyphCanvas.height = 400;
glyphCtx.fillStyle = '#fff';
glyphCtx.fillRect(0, 0, glyphCanvas.width, glyphCanvas.height);

let isDrawing = false;
let currentCharacter = 'A'; // 当前正在编辑的字符

// 自动保存方法
function autoSaveCharacter() {
  const glyphData = glyphCanvas.toDataURL();
  const characters = JSON.parse(localStorage.getItem('characters')) || {};
  characters[currentCharacter] = glyphData;
  localStorage.setItem('characters', JSON.stringify(characters));
  console.log(`Character ${currentCharacter} saved.`);
}

// 添加绘制功能
glyphCanvas.addEventListener('mousedown', () => (isDrawing = true));
glyphCanvas.addEventListener('mouseup', () => {
  isDrawing = false;
  autoSaveCharacter(); // 自动保存
});
glyphCanvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;

  const rect = glyphCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  glyphCtx.fillStyle = '#000';
  glyphCtx.fillRect(x - 5, y - 5, 10, 10);
});

// 提供方法供其他模块设置当前编辑的字符
export function setCurrentCharacter(char) {
  currentCharacter = char;
  loadCharacter(char); // 加载已有的设计
}

// 加载某个字符的设计
function loadCharacter(char) {
  const characters = JSON.parse(localStorage.getItem('characters')) || {};
  const glyphData = characters[char];
  if (glyphData) {
    const img = new Image();
    img.src = glyphData;
    img.onload = () => {
      glyphCtx.clearRect(0, 0, glyphCanvas.width, glyphCanvas.height);
      glyphCtx.drawImage(img, 0, 0);
    };
  } else {
    glyphCtx.clearRect(0, 0, glyphCanvas.width, glyphCanvas.height); // 清空画布
    glyphCtx.fillStyle = '#fff';
    glyphCtx.fillRect(0, 0, glyphCanvas.width, glyphCanvas.height);
  }
}