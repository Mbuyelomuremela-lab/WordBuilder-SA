import Phaser from 'phaser';

export default class LanguageScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LanguageScene' });
  }

  create() {
    const { width, height } = this.scale;

    // ── Background ──────────────────────────────────────────────
    this.add.rectangle(width / 2, height / 2, width, height, 0xf0f4ff);
    this.add.rectangle(0, 0, width, 8, 0x4a6fa5).setOrigin(0, 0);

    // ── Header ──────────────────────────────────────────────────
    this.add.text(width / 2, 50, '🌐  Select Language', {
      fontFamily: 'Georgia, serif',
      fontSize: '28px',
      color: '#2d3561',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 90, 'South Africa\'s Official Languages', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#7a7fa8'
    }).setOrigin(0.5);

    // ── Language Grid ────────────────────────────────────────────
    const languages = [
      { name: 'English',    flag: '🇬🇧', color: 0xa8d8ea },
      { name: 'Afrikaans',  flag: '🟠', color: 0xffd3b6 },
      { name: 'IsiZulu',    flag: '🟢', color: 0xc8e6c9 },
      { name: 'IsiXhosa',   flag: '🔵', color: 0xb3d4f5 },
      { name: 'Tshivenda',  flag: '🟣', color: 0xe1d5f0 },
      { name: 'Sepedi',     flag: '🔴', color: 0xf8bbd0 },
      { name: 'Xitsonga',   flag: '🟡', color: 0xfff9c4 },
      { name: 'Setswana',   flag: '⚫', color: 0xd7ccc8 },
      { name: 'IsiNdebele', flag: '🔶', color: 0xffe0b2 }
    ];

    const cols = 3;
    const cardW = 140;
    const cardH = 80;
    const padX = 10;
    const padY = 12;
    const startX = width / 2 - (cols - 1) * (cardW + padX) / 2;
    const startY = 150;

    const selected = this.registry.get('selectedLanguage');

    languages.forEach((lang, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + padX);
      const y = startY + row * (cardH + padY);

      this.createLangCard(x, y, cardW, cardH, lang, lang.name === selected);
    });

    // ── Back Button ──────────────────────────────────────────────
    const backBtn = this.add.rectangle(width / 2, height - 60, 200, 48, 0x4a6fa5).setOrigin(0.5);
    const backTxt = this.add.text(width / 2, height - 60, '← Back to Menu', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    backBtn.setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => this.scene.start('MenuScene'));
  }

  createLangCard(x, y, w, h, lang, isSelected) {
    const shadow = this.add.rectangle(x + 2, y + 3, w, h, 0x000000, 0.1).setOrigin(0.5);
    const card = this.add.rectangle(x, y, w, h, lang.color).setOrigin(0.5);

    if (isSelected) {
      const border = this.add.rectangle(x, y, w + 6, h + 6, 0x2d3561, 1).setOrigin(0.5).setDepth(-0.5);
    }

    const flag = this.add.text(x, y - 14, lang.flag, {
      fontSize: '20px'
    }).setOrigin(0.5);

    const label = this.add.text(x, y + 12, lang.name, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      color: '#2d3561',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: w - 10 }
    }).setOrigin(0.5);

    card.setInteractive({ useHandCursor: true });

    card.on('pointerover', () => {
      this.tweens.add({ targets: card, scaleX: 1.05, scaleY: 1.05, duration: 80 });
    });

    card.on('pointerout', () => {
      this.tweens.add({ targets: card, scaleX: 1, scaleY: 1, duration: 80 });
    });

    card.on('pointerdown', () => {
      this.registry.set('selectedLanguage', lang.name);
      // Flash feedback
      this.tweens.add({
        targets: card,
        alpha: 0.4,
        duration: 80,
        yoyo: true,
        onComplete: () => this.scene.start('MenuScene')
      });
    });
  }
}
