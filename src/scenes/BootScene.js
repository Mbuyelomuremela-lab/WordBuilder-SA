import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Draw loading screen
    const { width, height } = this.scale;

    const bg = this.add.rectangle(width / 2, height / 2, width, height, 0xf0f4ff);

    const titleText = this.add.text(width / 2, height / 2 - 60, 'WordBuilder SA', {
      fontFamily: 'Georgia, serif',
      fontSize: '36px',
      color: '#2d3561',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const loadingText = this.add.text(width / 2, height / 2 + 20, 'Loading...', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#7a7fa8'
    }).setOrigin(0.5);

    // Animated dots
    let dots = 0;
    this.time.addEvent({
      delay: 400,
      loop: true,
      callback: () => {
        dots = (dots + 1) % 4;
        loadingText.setText('Loading' + '.'.repeat(dots));
      }
    });

    // Progress bar background
    const barBg = this.add.rectangle(width / 2, height / 2 + 70, 280, 16, 0xd0d8f0).setOrigin(0.5);
    const barFill = this.add.rectangle(width / 2 - 140, height / 2 + 70, 0, 14, 0x4a6fa5).setOrigin(0, 0.5);

    this.load.on('progress', (value) => {
      barFill.width = 280 * value;
    });
  }

  create() {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('wordbuilder_settings');
    if (savedSettings) {
      this.registry.set('settings', JSON.parse(savedSettings));
    } else {
      this.registry.set('settings', {
        volume: 70,
        musicEnabled: true
      });
    }

    // Default language
    this.registry.set('selectedLanguage', 'English');
    this.registry.set('gameMode', 'word'); // 'word' or 'sentence'
    this.registry.set('practiceStage', 1);

    this.time.delayedCall(800, () => {
      this.scene.start('MenuScene');
    });
  }
}
