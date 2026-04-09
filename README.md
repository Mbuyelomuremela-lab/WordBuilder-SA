# WordBuilder SA 🇿🇦

A South African language learning game built with Phaser.js v3.60+ and Vite.

## Features

- **Word Construction** – Drag scrambled letters into the correct boxes to spell words
- **Sentence Construction** – Drag words into the correct order to build sentences
- **Practice Stage 1 & 2** – Two difficulty levels of word building
- **9 Languages** – English, Afrikaans, IsiZulu, IsiXhosa, Tshivenda, Sepedi, Xitsonga, Setswana, IsiNdebele
- **Settings** – Volume slider, music toggle, saved to localStorage
- **Mobile responsive** – Tested in Chrome DevTools device mode

## Quick Start

### Prerequisites
- Node.js 16+ installed

### Install & Run

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
wordbuilder-sa/
├── public/
│   ├── index.html
│   └── assets/
│       ├── audio/       (add .mp3/.ogg files here)
│       └── images/      (add image assets here)
├── src/
│   ├── main.js          ← Phaser game config & scene list
│   ├── data/
│   │   └── wordData.js  ← All words & sentences for all languages
│   └── scenes/
│       ├── BootScene.js         ← Loading screen + registry init
│       ├── MenuScene.js         ← Main menu
│       ├── LanguageScene.js     ← Language selection grid
│       ├── WordBuilderScene.js  ← Drag-letter word game
│       ├── SentenceBuilderScene.js ← Drag-word sentence game
│       └── SettingsScene.js     ← Volume, music, language settings
├── package.json
├── vite.config.js
└── README.md
```

## How to Play

### Word Builder
1. Read the hint at the top (e.g. "A furry household pet")
2. Drag the scrambled letter tiles into the empty boxes
3. If correct → green highlight + score +10
4. Press **Next** to continue to the next word

### Sentence Builder
1. Read the hint (e.g. "Where does the cat sit?")
2. Drag the word tiles into the numbered slots in the correct order
3. Press **Check** to verify your answer
4. Green = correct position, Red = wrong position

## Extending the Game

### Add more words
Edit `src/data/wordData.js` and add entries to any language's `stage1` or `stage2` array:

```js
{ word: 'UBUNTU', hint: 'I am because we are' }
```

### Add more sentences
Edit the `SENTENCE_DATA` section in the same file:

```js
{ sentence: 'Ubuntu is our way of life', hint: 'What is ubuntu?' }
```

### Add audio
Place `.mp3` files in `public/assets/audio/` and load them in `BootScene.js`:

```js
this.load.audio('correct', 'assets/audio/correct.mp3');
```

Then play with:
```js
this.sound.play('correct');
```

## Tech Stack

- [Phaser.js 3.60+](https://phaser.io/) – Game framework
- [Vite 5](https://vitejs.dev/) – Build tool & dev server
- ES Modules – No CommonJS

## License

MIT — free to use and modify for educational purposes.
