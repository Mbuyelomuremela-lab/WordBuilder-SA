import Phaser from 'phaser';

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SettingsScene' });
    this.volume = 70;
    this.musicEnabled = true;
  }

  create() {
    const { width, height } = this.scale;

    // Load current settings
    const settings = this.registry.get('settings') || { volume: 70, musicEnabled: true };
    this.volume = settings.volume;
    this.musicEnabled = settings.musicEnabled;

    // ── Background ──────────────────────────────────────────────
    this.add.rectangle(width / 2, height / 2, width, height, 0xf5f0ff);
    this.add.rectangle(0, 0, width, 8, 0x7c5cbf).setOrigin(0, 0);

    // ── Header ──────────────────────────────────────────────────
    this.add.rectangle(width / 2, 40, width, 70, 0x7c5cbf).setOrigin(0.5);
    this.add.text(width / 2, 40, '⚙️  Settings', {
      fontFamily: 'Georgia, serif',
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // ── Volume section ───────────────────────────────────────────
    this.add.rectangle(width / 2, 160, width - 40, 130, 0xffffff, 1)
      .setOrigin(0.5)
      .setStrokeStyle(1, 0xd0c0f0);

    this.add.text(width / 2, 115, '🔊  Volume', {
      fontFamily: 'Georgia, serif',
      fontSize: '20px',
      color: '#2d3561',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Volume value display
    this.volumeLabel = this.add.text(width / 2, 148, `${this.volume}%`, {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '26px',
      color: '#7c5cbf'
    }).setOrigin(0.5);

    // Slider track
    const sliderX = 60;
    const sliderW = width - 120;
    const sliderY = 185;
    const trackBg = this.add.rectangle(sliderX + sliderW / 2, sliderY, sliderW, 10, 0xe0d0f8).setOrigin(0.5);

    // Slider fill
    this.sliderFill = this.add.rectangle(sliderX, sliderY, sliderW * (this.volume / 100), 10, 0x7c5cbf).setOrigin(0, 0.5);

    // Slider knob
    const knobX = sliderX + sliderW * (this.volume / 100);
    this.knob = this.add.rectangle(knobX, sliderY, 26, 26, 0x7c5cbf).setOrigin(0.5);
    this.knob.setInteractive({ draggable: true });

    this.input.setDraggable(this.knob);

    this.knob.on('drag', (pointer, dragX) => {
      const clamped = Phaser.Math.Clamp(dragX, sliderX, sliderX + sliderW);
      this.knob.x = clamped;
      this.volume = Math.round(((clamped - sliderX) / sliderW) * 100);
      this.sliderFill.width = clamped - sliderX;
      this.volumeLabel.setText(`${this.volume}%`);
    });

    // Also click on track to set volume
    trackBg.setInteractive();
    trackBg.on('pointerdown', (pointer) => {
      const clamped = Phaser.Math.Clamp(pointer.x, sliderX, sliderX + sliderW);
      this.knob.x = clamped;
      this.volume = Math.round(((clamped - sliderX) / sliderW) * 100);
      this.sliderFill.width = clamped - sliderX;
      this.volumeLabel.setText(`${this.volume}%`);
    });

    // ── Music toggle section ──────────────────────────────────────
    this.add.rectangle(width / 2, 330, width - 40, 80, 0xffffff, 1)
      .setOrigin(0.5)
      .setStrokeStyle(1, 0xd0c0f0);

    this.add.text(80, 330, '🎵  Background Music', {
      fontFamily: 'Georgia, serif',
      fontSize: '18px',
      color: '#2d3561'
    }).setOrigin(0, 0.5);

    // Toggle button
    this.toggleBg = this.add.rectangle(width - 70, 330, 56, 28, this.musicEnabled ? 0x7c5cbf : 0xcccccc)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    this.toggleKnob = this.add.rectangle(
      this.musicEnabled ? width - 70 + 14 : width - 70 - 14,
      330, 24, 24, 0xffffff
    ).setOrigin(0.5);

    this.toggleLabel = this.add.text(width - 70, 356, this.musicEnabled ? 'ON' : 'OFF', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '11px',
      color: this.musicEnabled ? '#7c5cbf' : '#999999'
    }).setOrigin(0.5);

    this.toggleBg.on('pointerdown', () => {
      this.musicEnabled = !this.musicEnabled;
      this.updateToggle();
    });

    // ── Language shortcut ─────────────────────────────────────────
    this.add.rectangle(width / 2, 440, width - 40, 70, 0xffffff, 1)
      .setOrigin(0.5)
      .setStrokeStyle(1, 0xd0c0f0);

    const lang = this.registry.get('selectedLanguage') || 'English';
    this.add.text(80, 440, `🌐  Language: ${lang}`, {
      fontFamily: 'Georgia, serif',
      fontSize: '17px',
      color: '#2d3561'
    }).setOrigin(0, 0.5);

    const changeLangBtn = this.add.rectangle(width - 80, 440, 100, 34, 0xe1d5f0).setOrigin(0.5);
    this.add.text(width - 80, 440, 'Change', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#7c5cbf',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    changeLangBtn.setInteractive({ useHandCursor: true });
    changeLangBtn.on('pointerdown', () => this.scene.start('LanguageScene'));

    // ── About section ─────────────────────────────────────────────
    this.add.rectangle(width / 2, 545, width - 40, 90, 0xffffff, 1)
      .setOrigin(0.5)
      .setStrokeStyle(1, 0xd0c0f0);

    this.add.text(width / 2, 520, 'About WordBuilder SA', {
      fontFamily: 'Georgia, serif',
      fontSize: '16px',
      color: '#2d3561',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 555, 'A language learning game for all 9\nSouth African official languages.', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      color: '#7a7fa8',
      align: 'center'
    }).setOrigin(0.5);

    // ── Save Button ───────────────────────────────────────────────
    const saveBtn = this.add.rectangle(width / 2, 660, 260, 52, 0x7c5cbf).setOrigin(0.5);
    this.add.text(width / 2, 660, '💾  Save Settings', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    saveBtn.setInteractive({ useHandCursor: true });
    saveBtn.on('pointerdown', () => this.saveSettings());

    // ── Back Button ───────────────────────────────────────────────
    const backBtn = this.add.rectangle(width / 2, 730, 200, 44, 0xccbbee).setOrigin(0.5);
    this.add.text(width / 2, 730, '← Back to Menu', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      color: '#5a3a8f',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    backBtn.setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => this.scene.start('MenuScene'));
  }

  updateToggle() {
    const { width } = this.scale;
    const onX = width - 70 + 14;
    const offX = width - 70 - 14;
    this.tweens.add({
      targets: this.toggleKnob,
      x: this.musicEnabled ? onX : offX,
      duration: 150,
      ease: 'Sine.InOut'
    });
    this.toggleBg.setFillStyle(this.musicEnabled ? 0x7c5cbf : 0xcccccc);
    this.toggleLabel.setText(this.musicEnabled ? 'ON' : 'OFF');
    this.toggleLabel.setColor(this.musicEnabled ? '#7c5cbf' : '#999999');
  }

  saveSettings() {
    const { width, height } = this.scale;
    const settings = {
      volume: this.volume,
      musicEnabled: this.musicEnabled
    };
    this.registry.set('settings', settings);
    localStorage.setItem('wordbuilder_settings', JSON.stringify(settings));

    // Save confirmation flash
    const flash = this.add.rectangle(width / 2, height / 2, width, height, 0x27ae60, 0.15).setOrigin(0.5);
    const msg = this.add.text(width / 2, 660 - 40, '✅ Saved!', {
      fontFamily: 'Georgia, serif',
      fontSize: '20px',
      color: '#27ae60',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: [flash, msg],
      alpha: 0,
      duration: 1000,
      delay: 500,
      onComplete: () => { flash.destroy(); msg.destroy(); }
    });
  }
}
