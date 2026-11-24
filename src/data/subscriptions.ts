export type CorporateSubCategory =
  | 'todos'
  | 'recepcoes-showrooms'
  | 'lounges'
  | 'lirios-classicas'
  | 'orquideas-hortensias'
  | 'tropicais-esculturais';

export const CORPORATE_SUBCATEGORIES: Array<{ id: CorporateSubCategory; label: string }> = [
  { id: 'todos', label: 'Todos' },
  { id: 'recepcoes-showrooms', label: 'Recepções & Showrooms' },
  { id: 'lounges', label: 'Lounges & Salas de Espera' },
  { id: 'lirios-classicas', label: 'Lírios & Clássicas' },
  { id: 'orquideas-hortensias', label: 'Orquídeas & Hortênsias' },
  { id: 'tropicais-esculturais', label: 'Tropicais & Esculturais' },
];

export interface CorporateSubscriptionItem {
  id: string;
  image: string;
  caption: string;
  subCategory: Exclude<CorporateSubCategory, 'todos'>;
}

export interface DecorTipItem {
  id: string;
  image: string;
  title: string;
  quote: string;
}

export const CORPORATE_SUBSCRIPTION_ITEMS: CorporateSubscriptionItem[] = [
  {
    id: 'corp-1',
    image: '/assets/aistudio/9e794567-bbee-4f70-a629-fe9fa1c22114_1e506be5.jpeg',
    caption: 'Composição botânica autoral em lounge de atendimento',
    subCategory: 'lounges',
  },
  {
    id: 'corp-2',
    image: '/assets/aistudio/c921dbac-c2ad-4e77-bba8-184354581730_d06aaf79.jpeg',
    caption: 'Arranjo com cravos e alstroemérias em mesa de apoio',
    subCategory: 'lounges',
  },
  {
    id: 'corp-3',
    image: '/assets/aistudio/2bb1eba2-c3d2-4756-a8d6-3e8b6ffdf2e4_538ad9c3.jpeg',
    caption: 'Ambientação com flores nobres — Tania Bulhões Perfumes',
    subCategory: 'recepcoes-showrooms',
  },
  {
    id: 'corp-4',
    image: '/assets/aistudio/4d3dbc1a-4725-48ae-bb3c-06a647b1da91_0deec676.jpeg',
    caption: 'Arranjo de recepção com lírios brancos — Villa Vita Day Clinic',
    subCategory: 'recepcoes-showrooms',
  },
  {
    id: 'corp-5',
    image: '/assets/aistudio/d73217c1-a911-4183-872b-bbdce10cde1e_0f1841d0.jpeg',
    caption: 'Ambientação floral de showroom e mesas decoradas',
    subCategory: 'recepcoes-showrooms',
  },
  {
    id: 'corp-6',
    image: '/assets/aistudio/31d5ea06-749e-46c1-b2ba-a9ed7cc15cd2_43266c81.jpeg',
    caption: 'Lírios e folhagens de eucalipto em painel corporativo',
    subCategory: 'lirios-classicas',
  },
  {
    id: 'corp-7',
    image: '/assets/aistudio/960c567c-d090-4964-b5f0-eb8b185cf9f9_4be01c71.jpeg',
    caption: 'Vaso canelado translúcido com lírios brancos majestosos',
    subCategory: 'lirios-classicas',
  },
  {
    id: 'corp-8',
    image: '/assets/aistudio/58202afb-1bb4-4c05-a298-51d5fb266791_d41ad31d.jpeg',
    caption: 'Vaso em vidro trabalhado com tulipas amarelas radiantes',
    subCategory: 'lirios-classicas',
  },
  {
    id: 'corp-9',
    image: '/assets/aistudio/a839ad08-bbb6-4cca-ab63-4d2ad80cc399_461c4152.jpeg',
    caption: 'Centro de mesa escultural com costela-de-adão e helicônia',
    subCategory: 'tropicais-esculturais',
  },
  {
    id: 'corp-10',
    image: '/assets/aistudio/c369b62a-6dbf-4222-ab6f-36e8d147d71b_cc690899.jpeg',
    caption: 'Arranjo em bowl de cristal com orquídeas e lírios',
    subCategory: 'orquideas-hortensias',
  },
  {
    id: 'corp-11',
    image: '/assets/aistudio/4dbec413-9f6f-4c67-9e1a-314fbee6883d_f7ea29de.jpeg',
    caption: 'Mesa posta refinada com orquídeas e taças coloridas',
    subCategory: 'recepcoes-showrooms',
  },
  {
    id: 'corp-12',
    image: '/assets/aistudio/a4cb16e1-1f7d-422d-8e83-d8cd81ccb519_50d9c836.jpeg',
    caption: 'Mesa de jantar com arranjo de astromélias em tons quentes',
    subCategory: 'recepcoes-showrooms',
  },
  {
    id: 'corp-13',
    image: '/assets/aistudio/19b2f5e2-3ffd-4250-afa4-7ce49ec9b9b3_5bbdd612.jpeg',
    caption: 'Vaso de cristal lapidado com orquídeas denphal magenta',
    subCategory: 'orquideas-hortensias',
  },
  {
    id: 'corp-14',
    image: '/assets/aistudio/ad79eb32-f34e-45d1-973e-9894be30fd70_b6a77a22.jpeg',
    caption: 'Recepção com arranjos tropicais solares em cerâmica amarela',
    subCategory: 'lounges',
  },
  {
    id: 'corp-15',
    image: '/assets/aistudio/03952fd3-a749-4da6-996c-82dffa0fda46_60e323e5.jpeg',
    caption: 'Composição em bancada de mármore com celósias roxas',
    subCategory: 'tropicais-esculturais',
  },
  {
    id: 'corp-16',
    image: '/assets/aistudio/e6b190a6-de3c-42d7-aa0b-6f6297cdea60_ad16e124.jpeg',
    caption: 'Composição de vasos com lírios vermelhos e calas alaranjadas',
    subCategory: 'lirios-classicas',
  },
  {
    id: 'corp-17',
    image: '/assets/aistudio/43f326a5-cf6f-466e-8e84-0e9c139326fa_24818261.jpeg',
    caption: 'Bowl verde esmeralda com folhagens nobres e flores',
    subCategory: 'tropicais-esculturais',
  },
  {
    id: 'corp-18',
    image: '/assets/aistudio/80804f2f-3c71-4658-87e7-753e21b0b6e6_7acfdb0e.jpeg',
    caption: 'Cilindros de vidro com folhas de leque e antúrios verdes',
    subCategory: 'tropicais-esculturais',
  },
  {
    id: 'corp-19',
    image: '/assets/aistudio/cb0bb8f6-50af-4c96-9922-38221dff2bfe_4ba25de8.jpeg',
    caption: 'Vaso azul cobalto com flores brancas e eucalipto',
    subCategory: 'lirios-classicas',
  },
  {
    id: 'corp-20',
    image: '/assets/aistudio/ef6f2bed-9e95-48a5-99f4-cd11239afd52_f66e3725.jpeg',
    caption: 'Vaso azul esculpido com lírios cor-de-rosa em abertura',
    subCategory: 'lounges',
  },
  {
    id: 'corp-21',
    image: '/assets/aistudio/eecf7bde-ccf7-4ab7-b7e2-9443ff529c59_8c6e44bb.jpeg',
    caption: 'Vaso de cristal com hortênsia branca clássica e limonium',
    subCategory: 'orquideas-hortensias',
  },
  {
    id: 'corp-22',
    image: '/assets/aistudio/1df6f301-2157-40ca-b8b8-2da4ef8d6a07_5894b26b.jpeg',
    caption: 'Orquídeas phalaenopsis em vaso orgânico próximo ao piano',
    subCategory: 'orquideas-hortensias',
  },
];

export const DECORATION_TIPS_ITEMS: DecorTipItem[] = [
  {
    id: 'dica-1',
    image: '/assets/aistudio/793c7c92-7133-4ac8-ac13-83f1e82e0920_a1b121be.jpeg',
    title: 'Espaços que Pedem Cuidado',
    quote:
      'Essa é uma dúvida que eu vejo surgir constantemente! Na verdade, podemos colocar flores em qualquer lugar, mas há certos espaços que devem ser pensados com mais cuidado.',
  },
  {
    id: 'dica-2',
    image: '/assets/aistudio/39d44199-3126-412b-9199-0f5b3419dbc4_bf072c9b.jpeg',
    title: 'Flores na Cozinha',
    quote:
      'E na cozinha? Bom, você até pode colocar flores na cozinha, mas é preciso atentar-se a algo: as flores, quando estão perto de frutas, tendem a morrer mais rapidamente. Sabendo isso, talvez seja melhor usarmos um arranjo só de folhagens!',
  },
  {
    id: 'dica-3',
    image: '/assets/aistudio/d8338c5e-cefa-446a-a581-87ceb704701f_c8c0966a.jpeg',
    title: 'Locais Mais Indicados',
    quote:
      'Os locais mais indicados para colocarmos as flores são aqueles em que temos convívio social, como: sala de estar, sala de jantar, sala de TV, entrada da casa, varandas e lavabo. Esses lugares são sempre bem-vindos!',
  },
];
