export enum WordType {
  Noun,
  Number,
  Number10,
  Number100,
  NumberTrailingAccented10OrAccented100,
  Number1000P,
  Number100000000,
  NumberPacket,
  GenericCounter,
  WesternCounter,
  ShortWesternCounter,
  CommonCounter,
  HeibanCounter,
  FirstMoraHighCounter, // Removes the downstep of the first element of a number, and exhbit a downstep on the counter first mora
  IrregBanCounter, // Like Common counter, but 3 and 5 makes heiban instead odaka
  IrregNenCounter, // Like Common counter, but 3, 4 and 5 makes heiban instead odaka
  IrregHaiMaiHonCounter, // Like Common counter, but for 5.
  IrregSatsuHikiCounter, // Like Common counter, but if 1, 8, 11, 18 preceeds the counter, the whole element compound become odaka until the end of the counter
  IrregEnCounter, // Like Common counter, but 10 squares except 10 million create heiban compound / multiples of 1000 until 10000 and multiples of 10000 until 100000 also create heiban compounds
  HeibanAdverbialCounter, // When the number counter is used as an adverb => becomes heiban
  HeibanSatsuHikiAdverbialCounter, // When the number counter is used as an adverb, With 1, 6, 8, 10, 11, 16, 18 as a number => becomes heiban
  OdakaCounter,
  MonthCounter,
  LongParticle,
  LongParticleString,
}

export type KanjiNumber =
  | '零'
  | '一'
  | '二'
  | '三'
  | '四'
  | '五'
  | '六'
  | '七'
  | '八'
  | '九'
  | '十'
  | '百'
  | '千'
  | '万'
  | '億'
  | '兆'
  | '京';
