import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import LanguageScene from './scenes/LanguageScene.js';
import WordBuilderScene from './scenes/WordBuilderScene.js';
import SentenceBuilderScene from './scenes/SentenceBuilderScene.js';
import SettingsScene from './scenes/SettingsScene.js';

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 854,
  parent: 'game-container',
  backgroundColor: '#f0f4ff',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 480,
    height: 854
  },
  scene: [
    BootScene,
    MenuScene,
    LanguageScene,
    WordBuilderScene,
    SentenceBuilderScene,
    SettingsScene
  ]
};

const game = new Phaser.Game(config);

export default game;
