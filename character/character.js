import { setCurrentCharacter } from '../glyph/glyph.js';

const characterCanvas = document.getElementById('characterCanvas');
const characterCtx = characterCanvas.getContext('2d');

const characterScrollContainer = document.getElementById('characterScrollContainer');

// 动态设置 Canvas 高度
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?[]{}|~'.split('');
const charWidth = 50; // 每个字符的宽度
const charHeight = 50; // 每个字符的高度
const columns = 8; // 每行显示的字符数
const rows = Math.ceil(characters.length / columns); // 计算总行数

characterCanvas.width = columns * charWidth; // Canvas 宽度
characterCanvas.height = rows * charHeight; // Canvas 高度

// 绘制字符列表
function renderCharacters() {
  characterCtx.clearRect(0, 0, characterCanvas.width, characterCanvas.height);

  characters.forEach((char, index) => {
    const col = index % columns; // 列号
    const row = Math.floor(index / columns); // 行号

    characterCtx.fillStyle = '#000';
    characterCtx.fillText(char, col * charWidth + 10, row * charHeight + 30);
  });
}

// 点击字符的交互逻辑
characterCanvas.addEventListener('click', (e) => {
  const rect = characterCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const col = Math.floor(x / charWidth); // 点击的列号
  const row = Math.floor(y / charHeight); // 点击的行号
  const charIndex = row * columns + col; // 计算点击的字符索引

  if (charIndex >= 0 && charIndex < characters.length) {
    const selectedChar = characters[charIndex];
    setCurrentCharacter(selectedChar); // 切换到选中的字符
  }
});

// 初始化
renderCharacters();