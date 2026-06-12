import type { Card, Deck } from '../types';

export const englishDeck: Deck = {
  id: 'en-core',
  lang: 'en',
  name: 'English · Advanced & Usage',
  description: 'Sophisticated vocabulary and points that trip up advanced speakers.',
};

export const englishCards: Card[] = [
  {
    id: 'en-1', lang: 'en', deckId: 'en-core', front: 'perfunctory', back: 'おざなりの、形だけの',
    ipa: '/pərˈfʌŋktəri/', pos: 'adj.', tags: ['vocab', 'C1'],
    example: 'He gave a perfunctory nod and walked off.',
    exampleTranslation: '彼はおざなりに頷いて立ち去った。',
    note: 'Connotes doing the minimum without care — stronger than "quick".',
  },
  {
    id: 'en-2', lang: 'en', deckId: 'en-core', front: 'belie', back: '（外見が）〜と矛盾する、見せかける',
    ipa: '/bɪˈlaɪ/', pos: 'v.', tags: ['vocab', 'C2'],
    example: 'Her calm voice belied her nervousness.',
    note: 'Tricky: "belie" can mean both "contradict" and "give a false impression of".',
  },
  {
    id: 'en-3', lang: 'en', deckId: 'en-core', front: 'ubiquitous', back: '至る所にある、遍在する',
    ipa: '/juːˈbɪkwɪtəs/', pos: 'adj.', tags: ['vocab', 'C1'],
    example: 'Smartphones are now ubiquitous.',
  },
  {
    id: 'en-4', lang: 'en', deckId: 'en-core', front: 'fewer vs. less', back: 'fewer = 可算名詞 / less = 不可算名詞',
    pos: 'usage', tags: ['grammar', 'usage'],
    example: 'fewer items, less water — *less items* is non-standard.',
    note: 'Quantity that can be counted → fewer; mass/uncountable → less.',
  },
  {
    id: 'en-5', lang: 'en', deckId: 'en-core', front: 'comprise vs. compose', back: '全体 comprises 部分 / 部分 compose 全体',
    pos: 'usage', tags: ['grammar', 'usage'],
    example: 'The whole comprises the parts. The parts compose the whole.',
    note: '"is comprised of" is widely used but criticised by purists; prefer "comprises" or "is composed of".',
  },
  {
    id: 'en-6', lang: 'en', deckId: 'en-core', front: 'inchoate', back: '始まったばかりの、未完成の',
    ipa: '/ɪnˈkoʊət/', pos: 'adj.', tags: ['vocab', 'C2'],
    note: 'Related to "inchoative" aspect in linguistics — denoting the start of a state.',
  },
  {
    id: 'en-7', lang: 'en', deckId: 'en-core', front: 'the subjunctive (mandative)', back: 'I insist that he be present.',
    pos: 'grammar', tags: ['grammar', 'syntax'],
    example: 'It is essential that she arrive on time. (not "arrives")',
    note: 'After verbs/adjectives of demand, the bare infinitive form is used regardless of person.',
  },
  {
    id: 'en-8', lang: 'en', deckId: 'en-core', front: 'cleave', back: '①裂く ②くっつく（正反対の意味）',
    ipa: '/kliːv/', pos: 'v.', tags: ['vocab', 'auto-antonym'],
    note: 'A contronym: "cleave apart" vs. "cleave to". Past forms: cleaved / clove / cleft.',
  },
  {
    id: 'en-9', lang: 'en', deckId: 'en-core', front: 'nascent', back: '生まれたばかりの、発生期の',
    ipa: '/ˈnæsənt/', pos: 'adj.', tags: ['vocab', 'C1'],
    example: 'a nascent industry',
  },
  {
    id: 'en-10', lang: 'en', deckId: 'en-core', front: 'whom (after preposition)', back: 'To whom did you speak?',
    pos: 'grammar', tags: ['grammar', 'register'],
    note: 'Formal register keeps "whom" as object; informal English drops it: "Who did you speak to?"',
  },
  {
    id: 'en-11', lang: 'en', deckId: 'en-core', front: 'sanguine', back: '楽観的な、血色の良い',
    ipa: '/ˈsæŋɡwɪn/', pos: 'adj.', tags: ['vocab', 'C2'],
    example: 'She remained sanguine about the outcome.',
  },
  {
    id: 'en-12', lang: 'en', deckId: 'en-core', front: 'middle construction', back: 'This book reads easily. （中間構文）',
    pos: 'syntax', tags: ['linguistics', 'syntax'],
    example: 'The bread cuts well. / Bureaucrats bribe easily.',
    note: 'Active form, passive-like meaning, generic/dispositional reading; the agent is suppressed.',
  },
  {
    id: 'en-13', lang: 'en', deckId: 'en-core', front: 'pied-piping', back: '前置詞を伴った wh 移動',
    pos: 'syntax', tags: ['linguistics', 'syntax'],
    example: 'To whom did you give it? (vs. preposition stranding: Who did you give it to?)',
  },
  {
    id: 'en-14', lang: 'en', deckId: 'en-core', front: 'equivocate', back: '言葉を濁す、曖昧に言う',
    ipa: '/ɪˈkwɪvəkeɪt/', pos: 'v.', tags: ['vocab', 'C1'],
  },
  {
    id: 'en-15', lang: 'en', deckId: 'en-core', front: 'phlegmatic', back: '冷静沈着な、無感動な',
    ipa: '/flɛɡˈmætɪk/', pos: 'adj.', tags: ['vocab', 'C2'],
  },
  {
    id: 'en-16', lang: 'en', deckId: 'en-core', front: 'NPI licensing', back: 'I have *not* ever been there. / *I have ever been there.',
    pos: 'semantics', tags: ['linguistics', 'semantics'],
    note: 'Negative-polarity items like "ever/any" need a downward-entailing licensor (negation, questions, conditionals).',
  },
];
