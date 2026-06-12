import type { Card, Deck } from '../types';

export const frenchDeck: Deck = {
  id: 'fr-core',
  lang: 'fr',
  name: 'Français · Niveau C1',
  description: 'Lexique soutenu et subtilités grammaticales (subjonctif, registres).',
};

export const frenchCards: Card[] = [
  {
    id: 'fr-1', lang: 'fr', deckId: 'fr-core', front: 'galvauder', back: '（言葉・価値を）安っぽくする、乱用する',
    ipa: '/ɡal.vo.de/', pos: 'v.', tags: ['vocab', 'C1'],
    example: 'Un mot galvaudé par la publicité.',
  },
  {
    id: 'fr-2', lang: 'fr', deckId: 'fr-core', front: 'le subjonctif', back: 'Il faut que tu viennes.',
    pos: 'grammar', tags: ['grammar', 'subjonctif'],
    example: 'Bien qu’il soit tard… / Je doute qu’il vienne.',
    note: 'Après les expressions de nécessité, doute, émotion et certaines conjonctions.',
  },
  {
    id: 'fr-3', lang: 'fr', deckId: 'fr-core', front: 'd’emblée', back: '即座に、最初から',
    ipa: '/dɑ̃.ble/', pos: 'loc. adv.', tags: ['vocab', 'C1'],
    example: 'Il a refusé d’emblée.',
  },
  {
    id: 'fr-4', lang: 'fr', deckId: 'fr-core', front: 'l’accord du participe passé', back: 'Les fleurs que j’ai achetées.',
    pos: 'grammar', tags: ['grammar', 'piège'],
    note: 'Avec "avoir", le participe s’accorde avec le COD seulement s’il précède le verbe.',
  },
  {
    id: 'fr-5', lang: 'fr', deckId: 'fr-core', front: 'foisonner', back: '豊富にある、満ちあふれる',
    ipa: '/fwa.zɔ.ne/', pos: 'v.', tags: ['vocab', 'C1'],
    example: 'Les idées foisonnent dans ce livre.',
  },
  {
    id: 'fr-6', lang: 'fr', deckId: 'fr-core', front: 'velléité', back: '（実行が伴わない）漠然とした意欲',
    ipa: '/ve.le.i.te/', pos: 'n.', gender: 'f.', tags: ['vocab', 'C2'],
    note: 'Une intention faible, sans passage à l’acte.',
  },
  {
    id: 'fr-7', lang: 'fr', deckId: 'fr-core', front: 'ne explétif', back: 'Je crains qu’il ne pleuve.',
    pos: 'grammar', tags: ['grammar', 'syntaxe'],
    note: '"ne" pléonastique sans valeur négative, après craindre, avant que, à moins que…',
  },
  {
    id: 'fr-8', lang: 'fr', deckId: 'fr-core', front: 'la tournure moyenne', back: 'Ce livre se lit facilement.',
    pos: 'syntax', tags: ['linguistics', 'syntax'],
    note: 'Le "se" moyen donne une lecture générique, parallèle au middle anglais.',
  },
  {
    id: 'fr-9', lang: 'fr', deckId: 'fr-core', front: 'éconduire', back: '（丁重に）断る、追い払う',
    ipa: '/e.kɔ̃.dɥiʁ/', pos: 'v.', tags: ['vocab', 'C2'],
  },
  {
    id: 'fr-10', lang: 'fr', deckId: 'fr-core', front: 'nonobstant', back: '〜にもかかわらず（文語）',
    ipa: '/nɔ.nɔp.stɑ̃/', pos: 'prép.', tags: ['vocab', 'registre soutenu'],
  },
  {
    id: 'fr-11', lang: 'fr', deckId: 'fr-core', front: 'l’antériorité (plus-que-parfait)', back: 'Quand il fut arrivé, on dîna.',
    pos: 'grammar', tags: ['grammar', 'temps'],
    note: 'Le passé antérieur marque une action achevée avant une autre au passé simple (registre littéraire).',
  },
  {
    id: 'fr-12', lang: 'fr', deckId: 'fr-core', front: 'rébarbatif', back: '取っつきにくい、無愛想な',
    ipa: '/ʁe.baʁ.ba.tif/', pos: 'adj.', tags: ['vocab', 'C1'],
  },
  {
    id: 'fr-13', lang: 'fr', deckId: 'fr-core', front: 'quitte à', back: 'たとえ〜することになっても',
    pos: 'loc.', tags: ['grammar', 'idiom'], example: 'Autant tout dire, quitte à choquer.',
  },
  {
    id: 'fr-14', lang: 'fr', deckId: 'fr-core', front: 'pérenne', back: '永続的な、不変の',
    ipa: '/pe.ʁɛn/', pos: 'adj.', tags: ['vocab', 'C2'],
  },
  {
    id: 'fr-15', lang: 'fr', deckId: 'fr-core', front: 'eu égard à', back: '〜を考慮すると（文語）',
    pos: 'loc. prép.', tags: ['vocab', 'registre soutenu'],
  },
];
