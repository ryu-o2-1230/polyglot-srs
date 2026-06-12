import type { Card, Deck } from '../types';

export const russianDeck: Deck = {
  id: 'ru-core',
  lang: 'ru',
  name: 'Русский · Лексика и грамматика',
  description: 'Vocabulary with cases and aspect pairs — the core hurdles for learners.',
};

export const russianCards: Card[] = [
  {
    id: 'ru-1', lang: 'ru', deckId: 'ru-core', front: 'привыкать / привыкнуть (к + дат.)', back: '〜に慣れる',
    pos: 'v. (impf./pf.)', tags: ['vocab', 'aspect'],
    example: 'Я привык к холоду. (privyk k kholodu)',
    note: 'Requires dative. Aspect pair: process (impf.) vs. result (pf.).',
  },
  {
    id: 'ru-2', lang: 'ru', deckId: 'ru-core', front: 'genitive of negation', back: 'У меня нет времени. (no time)',
    pos: 'grammar', tags: ['grammar', 'case'],
    note: 'Existence/possession negated with "нет" + genitive: нет книги, нет денег.',
  },
  {
    id: 'ru-3', lang: 'ru', deckId: 'ru-core', front: 'успевать / успеть', back: '間に合う、〜する時間がある',
    pos: 'v. (impf./pf.)', tags: ['vocab', 'aspect'],
    example: 'Я не успел на поезд. (didn’t make the train)',
  },
  {
    id: 'ru-4', lang: 'ru', deckId: 'ru-core', front: 'нравиться (+ дат.)', back: '〜が気に入る（好む人は与格）',
    pos: 'v.', tags: ['grammar', 'case'],
    example: 'Мне нравится этот город. (Mne nravitsya — I like this city)',
    note: 'The liker is dative, the liked thing is the grammatical subject.',
  },
  {
    id: 'ru-5', lang: 'ru', deckId: 'ru-core', front: 'verbs of motion: идти / ходить', back: '一方向 (идти) / 往復・習慣 (ходить)',
    pos: 'grammar', tags: ['grammar', 'motion'],
    note: 'Unidirectional vs. multidirectional. Add prefixes (при-, у-, в-) to perfectivise.',
  },
  {
    id: 'ru-6', lang: 'ru', deckId: 'ru-core', front: 'обязательно', back: '必ず、絶対に',
    pos: 'adv.', tags: ['vocab'], example: 'Обязательно приходи! (obyazatel’no — be sure to come)',
  },
  {
    id: 'ru-7', lang: 'ru', deckId: 'ru-core', front: 'instrumental of profession', back: 'Он работает врачом. (works as a doctor)',
    pos: 'grammar', tags: ['grammar', 'case'],
    note: 'With "работать/быть" (past/future) the role takes the instrumental case.',
  },
  {
    id: 'ru-8', lang: 'ru', deckId: 'ru-core', front: 'получаться / получиться', back: 'うまくいく、結果として〜になる',
    pos: 'v. (impf./pf.)', tags: ['vocab', 'aspect'],
    example: 'У меня получилось! (I managed it / it worked out)',
  },
  {
    id: 'ru-9', lang: 'ru', deckId: 'ru-core', front: 'тем не менее', back: 'それにもかかわらず',
    pos: 'conj.', tags: ['vocab', 'connective'], note: 'tem ne menee',
  },
  {
    id: 'ru-10', lang: 'ru', deckId: 'ru-core', front: 'middle / средний залог', back: 'Книга легко читается.',
    pos: 'syntax', tags: ['linguistics', 'syntax'],
    note: 'The -ся reflexive yields a generic/dispositional middle reading, like the English middle.',
  },
  {
    id: 'ru-11', lang: 'ru', deckId: 'ru-core', front: 'хватать / хватить (+ род.)', back: '足りる、十分である',
    pos: 'v.', tags: ['grammar', 'case'],
    example: 'Мне не хватает денег. (I don’t have enough money)',
    note: 'Impersonal; the thing in short supply is genitive, the person dative.',
  },
  {
    id: 'ru-12', lang: 'ru', deckId: 'ru-core', front: 'aspect & negation', back: 'Не читай! (don’t — impf.) vs. Не прочитай (warning, pf.)',
    pos: 'grammar', tags: ['grammar', 'aspect'],
    note: 'Negated imperatives normally take the imperfective; perfective implies "be careful not to".',
  },
  {
    id: 'ru-13', lang: 'ru', deckId: 'ru-core', front: 'сутки', back: '24時間、一昼夜',
    pos: 'n. (pl. only)', tags: ['vocab'], note: 'sutki — a pluralia tantum noun: "трое суток" = three days.',
  },
  {
    id: 'ru-14', lang: 'ru', deckId: 'ru-core', front: 'оказываться / оказаться', back: '結局〜と判明する、〜の状態になる',
    pos: 'v. (impf./pf.)', tags: ['vocab', 'aspect'],
    example: 'Он оказался прав. (okazalsya prav — turned out to be right)',
  },
  {
    id: 'ru-15', lang: 'ru', deckId: 'ru-core', front: 'numerals + genitive', back: '2,3,4 → 単数生格 / 5+ → 複数生格',
    pos: 'grammar', tags: ['grammar', 'case'],
    example: 'два часа, пять часов',
    note: 'Quantifiers govern case: 2–4 take genitive singular, 5+ genitive plural.',
  },
];
