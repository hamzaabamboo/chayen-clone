import { words } from './words';

export class Game {
  state: GameState;
  info: GameInfo;
  words: string[];

  constructor(wordBank: string) {
    this.state = {
      score: 0,
      count: 0,
      currentWord: ''
    };
    const array = words[wordBank] || words.default;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.words = [...array];
    this.info = {
      count: this.words.length,
      bank: wordBank
    };
  }

  public setWord(): string {
    this.state.currentWord = this.words.pop();
    return this.state.currentWord;
  }

  public answer(ans: Answer) {
    if (ans === 'Correct') this.state.score++;
    this.state.count++;
    this.setWord();
  }

  public end() {
    const { score, count } = this.state;
    return { score, count };
  }
}

export type Answer = 'Correct' | 'Wrong' | 'Skip';

export interface GameState {
  currentWord: string;
  score: number;
  count: number;
}

export interface GameInfo {
  count: number;
  bank: string;
}
