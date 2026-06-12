import type { Card, Deck } from '../types';

export const italianDeck: Deck = {
  id: 'it-core',
  lang: 'it',
  name: 'Italiano · Vocabolario e grammatica',
  description: 'Parole utili e nodi grammaticali (genere, congiuntivo, preposizioni).',
};

export const italianCards: Card[] = [
  {
    id: 'it-1', lang: 'it', deckId: 'it-core', front: 'sprecare', back: '無駄にする、浪費する',
    pos: 'v.', tags: ['vocab'], example: 'Non sprecare tempo.', exampleTranslation: '時間を無駄にするな。',
  },
  {
    id: 'it-2', lang: 'it', deckId: 'it-core', front: 'la mano', back: '手',
    pos: 'n.', gender: 'f.', tags: ['vocab', 'gender-trap'],
    note: 'Eccezione: termina in -o ma è femminile → "le mani".',
  },
  {
    id: 'it-3', lang: 'it', deckId: 'it-core', front: 'congiuntivo (presente)', back: 'Penso che lui sia stanco.',
    pos: 'grammar', tags: ['grammar', 'congiuntivo'],
    example: 'Voglio che tu venga. / Benché sia tardi, esco.',
    note: 'Si usa dopo verbi di opinione/volontà/dubbio e congiunzioni come benché, affinché.',
  },
  {
    id: 'it-4', lang: 'it', deckId: 'it-core', front: 'magari', back: '①〜だといいな ②もしかしたら ③たとえ〜でも',
    pos: 'adv.', tags: ['vocab', 'polysemy'],
    example: '— Vuoi un caffè? — Magari! （ぜひ！）',
  },
  {
    id: 'it-5', lang: 'it', deckId: 'it-core', front: 'addirittura', back: 'なんと、〜まで（強調）',
    pos: 'adv.', tags: ['vocab', 'C1'], example: 'Ha studiato addirittura tre lingue.',
  },
  {
    id: 'it-6', lang: 'it', deckId: 'it-core', front: 'il problema', back: '問題',
    pos: 'n.', gender: 'm.', tags: ['vocab', 'gender-trap'],
    note: 'Maschile nonostante la -a (origine greca): "i problemi". Così tema, sistema, programma.',
  },
  {
    id: 'it-7', lang: 'it', deckId: 'it-core', front: 'ci vuole / ci vogliono', back: '〜が必要だ（時間・もの）',
    pos: 'grammar', tags: ['grammar', 'idiom'],
    example: 'Ci vuole un’ora. / Ci vogliono due ore.',
    note: 'Il verbo concorda con ciò che è necessario, non con la persona.',
  },
  {
    id: 'it-8', lang: 'it', deckId: 'it-core', front: 'pure', back: '①〜も ②どうぞ ③たとえ〜でも',
    pos: 'adv.', tags: ['vocab', 'polysemy'], example: 'Entra pure! （どうぞお入りください）',
  },
  {
    id: 'it-9', lang: 'it', deckId: 'it-core', front: 'cavarsela', back: 'なんとか切り抜ける、うまくやる',
    pos: 'v. (pronominale)', tags: ['vocab', 'idiom'],
    example: 'Te la cavi bene in italiano.',
    note: 'Verbo pronominale con "la" + "ne" lessicalizzati.',
  },
  {
    id: 'it-10', lang: 'it', deckId: 'it-core', front: 'passato remoto vs. prossimo', back: 'fece (remoto) / ha fatto (prossimo)',
    pos: 'grammar', tags: ['grammar', 'aspetto'],
    note: 'Il remoto domina nella narrazione scritta e nel Sud; il prossimo nel parlato del Nord.',
  },
  {
    id: 'it-11', lang: 'it', deckId: 'it-core', front: 'la costruzione media', back: 'Questo libro si legge facilmente.',
    pos: 'syntax', tags: ['linguistics', 'syntax'],
    note: 'Il "si" medio-passivo dà lettura generica/disposizionale, come il middle inglese.',
  },
  {
    id: 'it-12', lang: 'it', deckId: 'it-core', front: 'tuttavia', back: 'しかしながら、それでも',
    pos: 'conj.', tags: ['vocab', 'connettivo'],
  },
  {
    id: 'it-13', lang: 'it', deckId: 'it-core', front: 'accorgersi (di)', back: '〜に気づく',
    pos: 'v. (riflessivo)', tags: ['vocab'], example: 'Mi sono accorto dell’errore.',
  },
  {
    id: 'it-14', lang: 'it', deckId: 'it-core', front: 'sebbene', back: '〜にもかかわらず（+ 接続法）',
    pos: 'conj.', tags: ['grammar', 'congiuntivo'], example: 'Sebbene piova, usciamo.',
  },
  {
    id: 'it-15', lang: 'it', deckId: 'it-core', front: 'a meno che (non)', back: '〜でない限り（+ 接続法）',
    pos: 'conj.', tags: ['grammar', 'congiuntivo'],
    example: 'Non vengo, a meno che tu non insista.',
    note: 'Il "non" è espletivo (pleonastico), non nega davvero.',
  },
];
