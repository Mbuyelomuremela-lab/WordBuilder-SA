import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.scale;

    // ── Background ──────────────────────────────────────────────
    this.add.rectangle(width / 2, height / 2, width, height, 0xf0f4ff);

    // Decorative accent strips
    this.add.rectangle(0, 0, width, 8, 0x4a6fa5).setOrigin(0, 0);
    this.add.rectangle(0, height - 8, width, 8, 0x4a6fa5).setOrigin(0, 0);

    // Soft circle decorations
    const g = this.add.graphics();
    g.fillStyle(0xd8e4f7, 0.5);
    g.fillCircle(width - 30, 120, 80);
    g.fillStyle(0xfde8d8, 0.5);
    g.fillCircle(30, height - 100, 60);

    // ── Title ───────────────────────────────────────────────────
    this.add.text(width / 2, 80, 'WordBuilder', {
      fontFamily: 'Georgia, serif',
      fontSize: '42px',
      color: '#2d3561',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 130, 'SA', {
      fontFamily: 'Georgia, serif',
      fontSize: '42px',
      color: '#e07b39'
    }).setOrigin(0.5);

    this.add.text(width / 2, 175, '🇿🇦  Learn South African Languages', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#7a7fa8'
    }).setOrigin(0.5);

    // ── Language display ────────────────────────────────────────
    const lang = this.registry.get('selectedLanguage') || 'English';
    const langBox = this.add.rectangle(width / 2, 225, 260, 36, 0xdde6f8).setOrigin(0.5);
    this.langLabel = this.add.text(width / 2, 225, `🌐  Language: ${lang}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      color: '#2d3561'
    }).setOrigin(0.5);

    langBox.setInteractive({ useHandCursor: true });
    langBox.on('pointerdown', () => this.scene.start('LanguageScene'));

    // ── Menu Buttons ────────────────────────────────────────────
    const buttons = [
      { label: '🔤  Word Construction',     scene: 'WordBuilderScene',    color: 0xa8d8ea, mode: 'word',     stage: 1 },
      { label: '📝  Sentence Construction',  scene: 'SentenceBuilderScene', color: 0xffd3b6, mode: 'sentence', stage: 1 },
      { label: '⭐  Practice Stage 1',       scene: 'WordBuilderScene',    color: 0xc8e6c9, mode: 'word',     stage: 1 },
      { label: '🏆  Practice Stage 2',       scene: 'WordBuilderScene',    color: 0xf8bbd0, mode: 'word',     stage: 2 },
      { label: '⚙️  Settings',               scene: 'SettingsScene',        color: 0xe1d5f0, mode: null,       stage: null }
    ];

    buttons.forEach((btn, i) => {
      const y = 300 + i * 82;
      this.createMenuButton(width / 2, y, btn.label, btn.color, () => {
        if (btn.mode) {
          this.registry.set('gameMode', btn.mode);
          this.registry.set('practiceStage', btn.stage);
        }
        this.scene.start(btn.scene);
      });
    });

    // ── Footer ──────────────────────────────────────────────────
    this.add.text(width / 2, height - 24, 'WordBuilder SA  •  All 11 Official Languages', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '11px',
      color: '#b0b4c8'
    }).setOrigin(0.5);
  }

  createMenuButton(x, y, label, color, callback) {
    const btn = this.add.rectangle(x, y, 340, 64, color).setOrigin(0.5);
    const shadow = this.add.rectangle(x + 3, y + 4, 340, 64, 0x000000, 0.08).setOrigin(0.5).setDepth(-1);

    const txt = this.add.text(x, y, label, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#2d3561',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      btn.setScale(1.03);
      txt.setScale(1.03);
      this.tweens.add({ targets: btn, y: y - 2, duration: 80, ease: 'Sine.Out' });
      this.tweens.add({ targets: txt, y: y - 2, duration: 80, ease: 'Sine.Out' });
    });

    btn.on('pointerout', () => {
      btn.setScale(1);
      txt.setScale(1);
      this.tweens.add({ targets: btn, y: y, duration: 80, ease: 'Sine.Out' });
      this.tweens.add({ targets: txt, y: y, duration: 80, ease: 'Sine.Out' });
    });

    btn.on('pointerdown', () => {
      this.tweens.add({ targets: [btn, txt], scaleX: 0.97, scaleY: 0.97, duration: 60, yoyo: true });
      this.time.delayedCall(120, callback);
    });

    return { btn, txt };
  }
}
