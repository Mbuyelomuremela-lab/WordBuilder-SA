import Phaser from 'phaser';
import { getSentenceData } from '../data/wordData.js';

const WORD_H = 48;
const WORD_PAD_Y = 12;

export default class SentenceBuilderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SentenceBuilderScene' });
  }

  create() {
    const { width, height } = this.scale;
    const lang = this.registry.get('selectedLanguage') || 'English';

    this.sentences = getSentenceData(lang);
    this.sentenceIndex = 0;
    this.score = 0;
    this.wordTiles = [];
    this.dropZones = [];
    this.placedWords = [];

    // ── Background ──────────────────────────────────────────────
    this.add.rectangle(width / 2, height / 2, width, height, 0xfff8f0);
    this.add.rectangle(0, 0, width, 8, 0xe07b39).setOrigin(0, 0);

    // ── Header ──────────────────────────────────────────────────
    this.add.rectangle(width / 2, 40, width, 70, 0xe07b39).setOrigin(0.5);

    this.add.text(20, 40, '📝 Sentence Builder', {
      fontFamily: 'Georgia, serif',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    this.scoreText = this.add.text(width - 20, 40, 'Score: 0', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      color: '#ffffffcc'
    }).setOrigin(1, 0.5);

    // ── Instruction ──────────────────────────────────────────────
    this.add.text(width / 2, 100, 'Drag words to build the correct sentence', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      color: '#9a7a58'
    }).setOrigin(0.5);

    // ── Hint ─────────────────────────────────────────────────────
    this.hintText = this.add.text(width / 2, 135, '', {
      fontFamily: 'Georgia, serif',
      fontSize: '17px',
      color: '#e07b39',
      fontStyle: 'italic',
      align: 'center',
      wordWrap: { width: width - 40 }
    }).setOrigin(0.5);

    this.progressText = this.add.text(width / 2, 165, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      color: '#bba898'
    }).setOrigin(0.5);

    // ── Feedback label ───────────────────────────────────────────
    this.feedbackText = this.add.text(width / 2, height - 90, '', {
      fontFamily: 'Georgia, serif',
      fontSize: '18px',
      color: '#27ae60',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // ── Back Button ──────────────────────────────────────────────
    const backBtn = this.add.rectangle(44, height - 40, 80, 36, 0xddccbb).setOrigin(0.5);
    this.add.text(44, height - 40, '← Menu', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      color: '#5a3a1a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    backBtn.setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => this.scene.start('MenuScene'));

    // ── Next button ──────────────────────────────────────────────
    this.nextBtn = this.add.rectangle(width - 64, height - 40, 110, 36, 0xe07b39).setOrigin(0.5).setVisible(false);
    this.nextBtnText = this.add.text(width - 64, height - 40, 'Next →', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setVisible(false);
    this.nextBtn.setInteractive({ useHandCursor: true });
    this.nextBtn.on('pointerdown', () => {
      this.sentenceIndex++;
      this.loadSentence();
    });

    // ── Check button ─────────────────────────────────────────────
    this.checkBtn = this.add.rectangle(width / 2, height - 40, 130, 36, 0x27ae60).setOrigin(0.5);
    this.checkBtnText = this.add.text(width / 2, height - 40, '✔  Check', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.checkBtn.setInteractive({ useHandCursor: true });
    this.checkBtn.on('pointerdown', () => this.checkAnswer());

    this.loadSentence();
  }

  loadSentence() {
    const { width } = this.scale;

    // Cleanup
    this.wordTiles.forEach(t => { t.rect.destroy(); t.text.destroy(); });
    this.dropZones.forEach(d => { d.rect.destroy(); d.text.destroy(); });
    this.wordTiles = [];
    this.dropZones = [];
    this.placedWords = [];
    this.feedbackText.setText('');
    this.nextBtn.setVisible(false);
    this.nextBtnText.setVisible(false);
    this.checkBtn.setVisible(true);
    this.checkBtnText.setVisible(true);

    if (this.sentenceIndex >= this.sentences.length) {
      this.showCompletion();
      return;
    }

    const sentenceObj = this.sentences[this.sentenceIndex];
    this.currentSentence = sentenceObj;
    const words = sentenceObj.sentence.split(' ');

    this.hintText.setText(`💡 ${sentenceObj.hint}`);
    this.progressText.setText(`Sentence ${this.sentenceIndex + 1} of ${this.sentences.length}`);

    // ── Drop zones (answer area) ──────────────────────────────────
    const dropY_start = 220;
    this.placedWords = new Array(words.length).fill(null);

    words.forEach((word, i) => {
      const zoneW = Math.max(80, word.length * 13 + 20);
      const y = dropY_start + i * (WORD_H + WORD_PAD_Y);
      const rect = this.add.rectangle(width / 2, y, zoneW, WORD_H, 0xffffff)
        .setStrokeStyle(2, 0xccbbaa);
      const txt = this.add.text(width / 2, y, '', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#2d3561',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      const numLabel = this.add.text(width / 2 - zoneW / 2 - 20, y, `${i + 1}.`, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        color: '#bba898'
      }).setOrigin(0.5);

      this.dropZones.push({ rect, text: txt, index: i, expectedWord: word, filled: false });
    });

    // ── Scrambled word tiles ──────────────────────────────────────
    const scrambled = this.scrambleWords(words);
    const tileAreaY = dropY_start + words.length * (WORD_H + WORD_PAD_Y) + 40;

    scrambled.forEach((word, i) => {
      const tileW = Math.max(80, word.length * 13 + 20);
      const cols = 2;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col === 0 ? width * 0.28 : width * 0.72;
      const y = tileAreaY + row * (WORD_H + 10);

      const tile = this.createWordTile(x, y, tileW, word, i);
      this.wordTiles.push(tile);
    });
  }

  scrambleWords(words) {
    const arr = [...words];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  createWordTile(x, y, w, word, tileIndex) {
    const colors = [0xffd3b6, 0xa8d8ea, 0xc8e6c9, 0xf8bbd0, 0xe1d5f0, 0xfff9c4];
    const color = colors[tileIndex % colors.length];

    const rect = this.add.rectangle(x, y, w, WORD_H, color)
      .setStrokeStyle(2, 0xbbaacc)
      .setInteractive({ draggable: true });

    const txt = this.add.text(x, y, word, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      color: '#2d3561',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const tile = { rect, text: txt, word, originX: x, originY: y, placed: false, zoneIndex: -1 };

    this.input.setDraggable(rect);

    rect.on('dragstart', () => {
      if (tile.placed) {
        const zone = this.dropZones[tile.zoneIndex];
        if (zone) {
          zone.filled = false;
          zone.text.setText('');
          zone.rect.setStrokeStyle(2, 0xccbbaa).setFillStyle(0xffffff);
        }
        tile.placed = false;
        tile.zoneIndex = -1;
        rect.setFillStyle(color);
        txt.setVisible(true);
      }
      rect.setDepth(10);
      txt.setDepth(11);
    });

    rect.on('drag', (pointer, dragX, dragY) => {
      rect.x = dragX;
      rect.y = dragY;
      txt.x = dragX;
      txt.y = dragY;
    });

    rect.on('dragend', (pointer) => {
      rect.setDepth(0);
      txt.setDepth(1);

      const zone = this.findZoneAt(pointer.x, pointer.y);

      if (zone && !zone.filled) {
        rect.x = zone.rect.x;
        rect.y = zone.rect.y;
        txt.setVisible(false);
        zone.filled = true;
        zone.text.setText(word);
        tile.placed = true;
        tile.zoneIndex = zone.index;
      } else {
        this.tweens.add({
          targets: [rect, txt],
          x: tile.originX,
          y: tile.originY,
          duration: 200,
          ease: 'Back.Out'
        });
        txt.setVisible(true);
        tile.placed = false;
      }
    });

    return tile;
  }

  findZoneAt(px, py) {
    for (const zone of this.dropZones) {
      const dx = Math.abs(zone.rect.x - px);
      const dy = Math.abs(zone.rect.y - py);
      if (dx < 80 && dy < WORD_H * 0.7) return zone;
    }
    return null;
  }

  checkAnswer() {
    const allFilled = this.dropZones.every(z => z.filled);
    if (!allFilled) {
      this.feedbackText.setText('⚠️  Fill all slots first!').setColor('#e07b39');
      return;
    }

    const answer = this.dropZones.map(z => z.text.text).join(' ');
    const correct = this.currentSentence.sentence;

    const isCorrect = answer.trim().toLowerCase() === correct.trim().toLowerCase();

    if (isCorrect) {
      this.dropZones.forEach(z => {
        z.rect.setFillStyle(0xc8f7c5).setStrokeStyle(2, 0x27ae60);
        z.text.setColor('#27ae60');
      });
      this.feedbackText.setText('✅  Correct! +10').setColor('#27ae60');
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
      this.nextBtn.setVisible(true);
      this.nextBtnText.setVisible(true);
      this.checkBtn.setVisible(false);
      this.checkBtnText.setVisible(false);
    } else {
      this.dropZones.forEach(z => {
        const ok = z.text.text.trim().toLowerCase() === z.expectedWord.trim().toLowerCase();
        z.rect.setFillStyle(ok ? 0xc8f7c5 : 0xffc0c0);
        z.rect.setStrokeStyle(2, ok ? 0x27ae60 : 0xe74c3c);
        z.text.setColor(ok ? '#27ae60' : '#e74c3c');
      });
      this.feedbackText.setText('❌  Not quite — try again!').setColor('#e74c3c');

      // Reset after delay
      this.time.delayedCall(1400, () => {
        this.dropZones.forEach(z => {
          z.filled = false;
          z.text.setText('');
          z.rect.setFillStyle(0xffffff).setStrokeStyle(2, 0xccbbaa);
          z.text.setColor('#2d3561');
        });
        this.wordTiles.forEach(t => {
          t.placed = false;
          t.zoneIndex = -1;
          t.text.setVisible(true);
          this.tweens.add({
            targets: [t.rect, t.text],
            x: t.originX,
            y: t.originY,
            duration: 200,
            ease: 'Back.Out'
          });
        });
        this.feedbackText.setText('');
      });
    }
  }

  showCompletion() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width - 40, 380, 0xffffff, 0.95)
      .setOrigin(0.5)
      .setStrokeStyle(3, 0xe07b39);

    this.add.text(width / 2, height / 2 - 130, '🎓', { fontSize: '56px' }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 60, 'All Sentences Done!', {
      fontFamily: 'Georgia, serif',
      fontSize: '28px',
      color: '#2d3561',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2, `Final Score: ${this.score}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '22px',
      color: '#e07b39'
    }).setOrigin(0.5);

    const menuBtn = this.add.rectangle(width / 2, height / 2 + 80, 200, 48, 0x4a6fa5).setOrigin(0.5);
    this.add.text(width / 2, height / 2 + 80, '← Back to Menu', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    menuBtn.setInteractive({ useHandCursor: true });
    menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));

    const replayBtn = this.add.rectangle(width / 2, height / 2 + 145, 200, 48, 0xe07b39).setOrigin(0.5);
    this.add.text(width / 2, height / 2 + 145, '↺ Play Again', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    replayBtn.setInteractive({ useHandCursor: true });
    replayBtn.on('pointerdown', () => this.scene.restart());
  }
}
