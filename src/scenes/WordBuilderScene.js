import Phaser from "phaser";
import { getWordData } from "../data/wordData.js";

const TILE_W = 46;
const TILE_H = 52;
const TILE_PAD = 6;

export default class WordBuilderScene extends Phaser.Scene {
  constructor() {
    super({ key: "WordBuilderScene" });
    this.currentWord = null;
    this.letterTiles = [];
    this.answerSlots = [];
    this.placedLetters = [];
    this.score = 0;
    this.wordIndex = 0;
    this.words = [];
  }

  create() {
    const { width, height } = this.scale;
    const lang = this.registry.get("selectedLanguage") || "English";
    const stage = this.registry.get("practiceStage") || 1;

    this.letterTiles = [];
    this.answerSlots = [];
    this.placedLetters = [];
    this.score = 0;
    this.wordIndex = 0;

    // Get word list for language & stage
    this.words = getWordData(lang, stage);
    this.wordIndex = 0;

    // ── Background ──────────────────────────────────────────────
    this.add.rectangle(width / 2, height / 2, width, height, 0xf0f4ff);
    this.add.rectangle(0, 0, width, 8, 0x4a6fa5).setOrigin(0, 0);

    // ── Header bar ──────────────────────────────────────────────
    this.add.rectangle(width / 2, 40, width, 70, 0x4a6fa5).setOrigin(0.5);

    this.add
      .text(20, 40, "🔤 Word Builder", {
        fontFamily: "Georgia, serif",
        fontSize: "20px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0, 0.5);

    this.scoreText = this.add
      .text(width - 20, 32, `Score: 0`, {
        fontFamily: "Arial, sans-serif",
        fontSize: "15px",
        color: "#ffffffcc",
      })
      .setOrigin(1, 0.5);

    this.langText = this.add
      .text(width - 20, 52, lang, {
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        color: "#ffffffaa",
      })
      .setOrigin(1, 0.5);

    // ── Instruction text ─────────────────────────────────────────
    this.add
      .text(width / 2, 100, "Drag letters into the boxes to spell the word", {
        fontFamily: "Arial, sans-serif",
        fontSize: "13px",
        color: "#7a7fa8",
        align: "center",
      })
      .setOrigin(0.5);

    // ── Word hint label ─────────────────────────────────────────
    this.hintText = this.add
      .text(width / 2, 138, "", {
        fontFamily: "Georgia, serif",
        fontSize: "20px",
        color: "#e07b39",
        fontStyle: "italic",
        align: "center",
      })
      .setOrigin(0.5);

    // ── Progress ─────────────────────────────────────────────────
    this.progressText = this.add
      .text(width / 2, 164, "", {
        fontFamily: "Arial, sans-serif",
        fontSize: "13px",
        color: "#aaaacc",
      })
      .setOrigin(0.5);

    // ── Back Button ──────────────────────────────────────────────
    const backBtn = this.add
      .rectangle(44, height - 40, 80, 36, 0xccccdd)
      .setOrigin(0.5);
    this.add
      .text(44, height - 40, "← Menu", {
        fontFamily: "Arial, sans-serif",
        fontSize: "13px",
        color: "#2d3561",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    backBtn.setInteractive({ useHandCursor: true });
    backBtn.on("pointerdown", () => this.scene.start("MenuScene"));

    // ── Next Word Button ─────────────────────────────────────────
    this.nextBtn = this.add
      .rectangle(width - 64, height - 40, 110, 36, 0x4a6fa5)
      .setOrigin(0.5)
      .setVisible(false);
    this.nextBtnText = this.add
      .text(width - 64, height - 40, "Next →", {
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setVisible(false);

    this.nextBtn.setInteractive({ useHandCursor: true });
    this.nextBtn.on("pointerdown", () => this.loadNextWord());

    // Start first word
    this.loadWord();
  }

  loadWord() {
    const { width } = this.scale;

    // Clear previous tiles
    this.letterTiles.forEach((t) => {
      t.rect.destroy();
      t.text.destroy();
    });
    this.answerSlots.forEach((s) => {
      s.rect.destroy();
      s.text.destroy();
    });
    this.letterTiles = [];
    this.answerSlots = [];
    this.placedLetters = new Array(100).fill(null);

    this.nextBtn.setVisible(false);
    this.nextBtnText.setVisible(false);

    if (this.wordIndex >= this.words.length) {
      this.showCompletionScreen();
      return;
    }

    const wordObj = this.words[this.wordIndex];
    this.currentWord = wordObj;

    this.hintText.setText(`💡 ${wordObj.hint}`);
    this.progressText.setText(
      `Word ${this.wordIndex + 1} of ${this.words.length}`,
    );

    const word = wordObj.word.toUpperCase();
    const letters = word.split("");

    // ── Answer Slots ─────────────────────────────────────────────
    const slotRowY = 260;
    const totalSlotsW = letters.length * (TILE_W + TILE_PAD) - TILE_PAD;
    const slotStartX = width / 2 - totalSlotsW / 2 + TILE_W / 2;

    letters.forEach((letter, i) => {
      const x = slotStartX + i * (TILE_W + TILE_PAD);
      const rect = this.add
        .rectangle(x, slotRowY, TILE_W, TILE_H, 0xffffff, 1)
        .setStrokeStyle(2, 0x99aacc);
      const txt = this.add
        .text(x, slotRowY, "", {
          fontFamily: "Arial Black, sans-serif",
          fontSize: "22px",
          color: "#2d3561",
        })
        .setOrigin(0.5);

      this.answerSlots.push({
        rect,
        text: txt,
        letter,
        filled: false,
        index: i,
      });
    });

    // ── Scrambled Letters ─────────────────────────────────────────
    const scrambled = this.scrambleLetters(letters);
    const colCount = Math.min(scrambled.length, 6);
    const tileRowY = 430;
    const tileRowY2 = 500;
    const totalTilesW = colCount * (TILE_W + TILE_PAD) - TILE_PAD;
    const tileStartX = width / 2 - totalTilesW / 2 + TILE_W / 2;

    scrambled.forEach((letter, i) => {
      const col = i % colCount;
      const row = Math.floor(i / colCount);
      const x = tileStartX + col * (TILE_W + TILE_PAD);
      const y = row === 0 ? tileRowY : tileRowY2;

      const tile = this.createLetterTile(x, y, letter, i);
      this.letterTiles.push(tile);
    });
  }

  scrambleLetters(letters) {
    const arr = [...letters];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Make sure it's not the same as original
    if (arr.join("") === letters.join("") && arr.length > 1) {
      [arr[0], arr[1]] = [arr[1], arr[0]];
    }
    return arr;
  }

  createLetterTile(x, y, letter, tileIndex) {
    const colors = [
      0xffd3b6, 0xa8d8ea, 0xc8e6c9, 0xf8bbd0, 0xe1d5f0, 0xfff9c4, 0xb3d4f5,
    ];
    const color = colors[tileIndex % colors.length];

    const rect = this.add
      .rectangle(x, y, TILE_W, TILE_H, color)
      .setStrokeStyle(2, 0x99aacc)
      .setInteractive({ draggable: true });

    const txt = this.add
      .text(x, y, letter, {
        fontFamily: "Arial Black, sans-serif",
        fontSize: "22px",
        color: "#2d3561",
      })
      .setOrigin(0.5);

    const tile = {
      rect,
      text: txt,
      letter,
      originX: x,
      originY: y,
      placed: false,
      slotIndex: -1,
    };

    // ── Drag events ──────────────────────────────────────────────
    this.input.setDraggable(rect);

    rect.on("dragstart", () => {
      if (tile.placed) {
        // Remove from slot
        const slot = this.answerSlots[tile.slotIndex];
        if (slot) {
          slot.filled = false;
          slot.rect.setStrokeStyle(2, 0x99aacc).setFillStyle(0xffffff);
          slot.text.setText("");
        }
        tile.placed = false;
        tile.slotIndex = -1;
        tile.rect.setFillStyle(color);
        tile.text.setVisible(true);
      }
      rect.setDepth(10);
      txt.setDepth(11);
      this.tweens.add({
        targets: [rect, txt],
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 80,
      });
    });

    rect.on("drag", (pointer, dragX, dragY) => {
      rect.x = dragX;
      rect.y = dragY;
      txt.x = dragX;
      txt.y = dragY;
    });

    rect.on("dragend", (pointer) => {
      rect.setDepth(0);
      txt.setDepth(1);
      this.tweens.add({
        targets: [rect, txt],
        scaleX: 1,
        scaleY: 1,
        duration: 80,
      });

      // Check if dropped onto a slot
      const dropped = this.findSlotAt(pointer.x, pointer.y);

      if (dropped && !dropped.filled) {
        // Snap to slot
        rect.x = dropped.rect.x;
        rect.y = dropped.rect.y;
        txt.x = dropped.rect.x;
        txt.y = dropped.rect.y;
        txt.setVisible(false);

        dropped.filled = true;
        dropped.text.setText(letter);
        dropped.text.setColor(
          dropped.letter === letter ? "#27ae60" : "#e74c3c",
        );
        dropped.rect.setStrokeStyle(
          2,
          dropped.letter === letter ? 0x27ae60 : 0xe74c3c,
        );

        tile.placed = true;
        tile.slotIndex = dropped.index;

        this.checkAnswer();
      } else {
        // Return to origin
        this.tweens.add({
          targets: [rect, txt],
          x: tile.originX,
          y: tile.originY,
          duration: 200,
          ease: "Back.Out",
        });
        if (tile.placed) {
          txt.setVisible(false);
        } else {
          txt.setVisible(true);
        }
      }
    });

    return tile;
  }

  findSlotAt(px, py) {
    for (const slot of this.answerSlots) {
      const dx = Math.abs(slot.rect.x - px);
      const dy = Math.abs(slot.rect.y - py);
      if (dx < TILE_W * 0.7 && dy < TILE_H * 0.7) {
        return slot;
      }
    }
    return null;
  }

  checkAnswer() {
    const allFilled = this.answerSlots.every((s) => s.filled);
    if (!allFilled) return;

    const answer = this.answerSlots.map((s) => s.text.text).join("");
    const correct = this.currentWord.word.toUpperCase();

    if (answer === correct) {
      this.showSuccess();
    } else {
      this.showError();
    }
  }

  showSuccess() {
    this.sound.play("correct");

    const { width, height } = this.scale;

    // Green flash all slots
    this.answerSlots.forEach((s) => {
      s.rect.setFillStyle(0xc8f7c5);
      this.tweens.add({
        targets: s.rect,
        scaleX: 1.15,
        scaleY: 1.15,
        duration: 120,
        yoyo: true,
      });
    });

    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    // Success banner
    const banner = this.add
      .rectangle(width / 2, height / 2, 320, 80, 0x27ae60, 0.92)
      .setOrigin(0.5);
    const bannerTxt = this.add
      .text(width / 2, height / 2, "✅  Correct! +10", {
        fontFamily: "Georgia, serif",
        fontSize: "26px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: [banner, bannerTxt],
      alpha: 0,
      duration: 1200,
      delay: 800,
      onComplete: () => {
        banner.destroy();
        bannerTxt.destroy();
      },
    });

    this.nextBtn.setVisible(true);
    this.nextBtnText.setVisible(true);
    this.wordIndex++;
  }

  showError() {
    const { width, height } = this.scale;

    // Red flash
    const banner = this.add
      .rectangle(width / 2, height / 2, 320, 80, 0xe74c3c, 0.9)
      .setOrigin(0.5);
    const bannerTxt = this.add
      .text(width / 2, height / 2, "❌  Try Again!", {
        fontFamily: "Georgia, serif",
        fontSize: "26px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: [banner, bannerTxt],
      alpha: 0,
      duration: 1000,
      delay: 700,
      onComplete: () => {
        banner.destroy();
        bannerTxt.destroy();
        // Reset slots
        this.answerSlots.forEach((s) => {
          s.filled = false;
          s.text.setText("");
          s.rect.setStrokeStyle(2, 0x99aacc).setFillStyle(0xffffff);
        });
        // Return tiles to origin
        this.letterTiles.forEach((t) => {
          t.placed = false;
          t.slotIndex = -1;
          t.text.setVisible(true);
          this.tweens.add({
            targets: [t.rect, t.text],
            x: t.originX,
            y: t.originY,
            duration: 200,
            ease: "Back.Out",
          });
        });
      },
    });
  }

  loadNextWord() {
    this.loadWord();
  }

  showCompletionScreen() {
    const { width, height } = this.scale;

    this.add
      .rectangle(width / 2, height / 2, width - 40, 360, 0xffffff, 0.95)
      .setOrigin(0.5)
      .setStrokeStyle(3, 0x4a6fa5);

    this.add
      .text(width / 2, height / 2 - 120, "🏆", { fontSize: "56px" })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 - 50, "Stage Complete!", {
        fontFamily: "Georgia, serif",
        fontSize: "30px",
        color: "#2d3561",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 10, `Final Score: ${this.score}`, {
        fontFamily: "Arial, sans-serif",
        fontSize: "22px",
        color: "#e07b39",
      })
      .setOrigin(0.5);

    const menuBtn = this.add
      .rectangle(width / 2, height / 2 + 80, 200, 48, 0x4a6fa5)
      .setOrigin(0.5);
    this.add
      .text(width / 2, height / 2 + 80, "← Back to Menu", {
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    menuBtn.setInteractive({ useHandCursor: true });
    menuBtn.on("pointerdown", () => this.scene.start("MenuScene"));

    const replayBtn = this.add
      .rectangle(width / 2, height / 2 + 140, 200, 48, 0x27ae60)
      .setOrigin(0.5);
    this.add
      .text(width / 2, height / 2 + 140, "↺ Play Again", {
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    replayBtn.setInteractive({ useHandCursor: true });
    replayBtn.on("pointerdown", () => this.scene.restart());
  }
}
