import { WordType } from './wordType';

export interface WordPitch {
  word: string;
  kana: string;
  pitch: string;
  def?: string;
  wType: WordType[];
  behaviors?: Behavior[];
}

export interface NumberPitch extends WordPitch {
  wordAlt: string;
}

export type Behavior = {
  wordConcerned: string;
  where: 'before' | 'after';
  behavior: string;
  all: boolean;
};
