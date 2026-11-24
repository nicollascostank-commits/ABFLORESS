export interface VitrinePhoto {
  id: string;
  image: string;
  alt: string;
  caption?: string;
  /** Enquadramento vertical opcional para preservar fachadas e letreiros no topo */
  objectPosition?: 'top' | 'center';
}

export interface VitrineCollection {
  id: string;
  slug: string;
  title: string;
  /** Nome curto da campanha para listagens e filtros */
  campaignName: string;
  /** Ocasião comemorativa ou tema sazonal */
  occasion: string;
  /** Ano da campanha */
  year: string;
  /** Identificação combinada de ocasião e ano */
  seasonLabel: string;
  /** Indica se é a campanha atualmente em destaque na loja */
  isCurrentCampaign?: boolean;
  /** Breve descrição curatorial baseada exclusivamente nas fotografias reais da coleção */
  curatorialSubtitle: string;
  coverImage: string;
  coverObjectPosition?: 'top' | 'center';
  photos: VitrinePhoto[];
}

export interface CurrentVitrineHighlight {
  /** Slug da coleção atual dentro de VITRINE_COLLECTIONS */
  collectionSlug: string;
  /** Identificação institucional acima do título (ex.: AB FLORES APRESENTA) */
  presenter: string;
  /** Título principal da campanha em apresentação na página inicial */
  title: string;
  /** Nome completo da coleção sazonal vigente */
  collectionName: string;
  /** Descrição curta de apresentação da campanha */
  subtitle: string;
  /** Caminho da fotografia original exibida no destaque da página inicial */
  image: string;
  /** Descrição acessível da fotografia */
  imageAlt: string;
  /** Ocasião e ano da campanha vigente (facilita trocas mensais) */
  occasionLabel: string;
  /** Texto do botão que abre a página independente Vitrines & Inspirações */
  ctaLabel: string;
}

/**
 * DESTAQUE DA VITRINE ATUAL NA PÁGINA INICIAL
 * Estrutura preparada para atualizações mensais:
 * para publicar uma nova campanha mensal, basta atualizar os campos deste objeto
 * e marcar `isCurrentCampaign: true` na coleção correspondente em `VITRINE_COLLECTIONS`,
 * sem necessidade de reconstruir componentes visuais.
 */
export const CURRENT_VITRINE_HIGHLIGHT: CurrentVitrineHighlight = {
  collectionSlug: 'encantos-da-natureza-natal-2026',
  presenter: 'AB FLORES APRESENTA',
  title: 'A magia do Natal chegou',
  collectionName: 'Coleção Encantos da Natureza — Natal 2026',
  subtitle: 'Uma temporada de encanto, beleza e flores para celebrar momentos especiais.',
  image: '/assets/aistudio/4bbfdfc9-9d31-43f6-9092-22c2e70afc74_1908b50c.jpeg',
  imageAlt:
    'Coleção Encantos da Natureza — Natal 2026 — Fachada iluminada da AB Flores & Decoração com vitrine natalina',
  occasionLabel: 'Natal · 2026',
  ctaLabel: 'CONHEÇA NOSSAS VITRINES',
};

/**
 * Coleções reais de "Vitrines & Inspirações".
 * Organização preparada para atualizações mensais por ocasião e ano,
 * preservando exclusivamente fotografias originais de cada campanha.
 */
export const VITRINE_COLLECTIONS: VitrineCollection[] = [
  {
    id: 'natal-2026',
    slug: 'encantos-da-natureza-natal-2026',
    title: 'Coleção Encantos da Natureza — Natal 2026',
    campaignName: 'Encantos da Natureza',
    occasion: 'Natal',
    year: '2026',
    seasonLabel: 'Natal · 2026',
    isCurrentCampaign: true,
    curatorialSubtitle:
      'Luzes quentes, orquídeas brancas, guirlandas, pinhas, pelúcias e caixas com laços verde e dourado na ambientação natalina assinada por Arley Borges.',
    coverImage: '/assets/aistudio/8de19d7b-48fd-4eb0-bb8e-58ef3511f779_9e8a4869.jpeg',
    coverObjectPosition: 'top',
    photos: [
      {
        id: 'natal-01',
        image: '/assets/aistudio/8de19d7b-48fd-4eb0-bb8e-58ef3511f779_9e8a4869.jpeg',
        alt: 'Coleção Encantos da Natureza — Natal 2026 — Fachada iluminada com vitrine natalina e estrela na porta',
        caption: 'Fachada iluminada com vitrine natalina, árvore decorada e estrela na porta de entrada.',
        objectPosition: 'top',
      },
      {
        id: 'natal-02',
        image: '/assets/aistudio/871c0c16-f551-426a-b246-05f24fb6267f_441a7060.jpeg',
        alt: 'Coleção Encantos da Natureza — Natal 2026 — Detalhe interno com pinhas, ursos e caixas com laços verde e dourado',
        caption: 'Detalhe interno com pinhas naturais, ursos decorativos e caixas com laços verde e dourado.',
        objectPosition: 'center',
      },
      {
        id: 'natal-03',
        image: '/assets/aistudio/b396da21-d9a7-455a-b966-956fff9a025d_c560e7b1.jpeg',
        alt: 'Coleção Encantos da Natureza — Natal 2026 — Vitrine noturna da loja decorada para o Natal',
        caption: 'Perspectiva noturna da vitrine com iluminação cênica e folhagens natalinas.',
        objectPosition: 'top',
      },
      {
        id: 'natal-04',
        image: '/assets/aistudio/6b84cb8e-dba7-405e-aa2a-64018ed77a10_26422d59.jpeg',
        alt: 'Coleção Encantos da Natureza — Natal 2026 — Composição com orquídeas brancas, guirlanda, pinhas e folhagens',
        caption: 'Composição com orquídeas brancas, guirlanda, pinhas e folhagens texturizadas.',
        objectPosition: 'center',
      },
      {
        id: 'natal-05',
        image: '/assets/aistudio/e0170e53-1c59-423d-a046-963e1e010f87_41cad2f0.jpeg',
        alt: 'Coleção Encantos da Natureza — Natal 2026 — Camadas, texturas e arranjos natalinos na vitrine',
        caption: 'Camadas botânicas, texturas e arranjos natalinos compondo a cena da loja.',
        objectPosition: 'center',
      },
    ],
  },
  {
    id: 'dia-das-maes-2026',
    slug: 'amor-maria-dia-das-maes-2026',
    title: 'Coleção Amor Maria — Dia das Mães 2026',
    campaignName: 'Amor Maria',
    occasion: 'Dia das Mães',
    year: '2026',
    seasonLabel: 'Dia das Mães · 2026',
    curatorialSubtitle:
      'Vitrine devocional e afetiva reunindo imagens sacras de Nossa Senhora, redomas delicadas, rosas, orquídeas e boxes para presentear.',
    coverImage: '/assets/aistudio/a9e33ed3-0c25-48e4-a72f-9931677e2a95_4325a127.jpeg',
    coverObjectPosition: 'top',
    photos: [
      {
        id: 'maes-01',
        image: '/assets/aistudio/a9e33ed3-0c25-48e4-a72f-9931677e2a95_4325a127.jpeg',
        alt: 'Coleção Amor Maria — Dia das Mães 2026 — Vitrine completa com imagens sacras, rosas, orquídeas e boxes',
        caption: 'Vitrine completa com imagens sacras, rosas, orquídeas e composição de boxes.',
        objectPosition: 'top',
      },
      {
        id: 'maes-02',
        image: '/assets/aistudio/adea4d49-1883-499a-84a4-44135693bb47_2fed7ed2.jpeg',
        alt: 'Coleção Amor Maria — Dia das Mães 2026 — Detalhe com Nossa Senhora, redomas, orquídeas e caixas presente',
        caption: 'Detalhe com Nossa Senhora, redomas iluminadas, orquídeas e caixas presente.',
        objectPosition: 'center',
      },
    ],
  },
  {
    id: 'botanica-2026',
    slug: 'colecao-botanica-2026',
    title: 'Coleção Botânica — 2026',
    campaignName: 'Coleção Botânica',
    occasion: 'Botânica',
    year: '2026',
    seasonLabel: 'Botânica · 2026',
    curatorialSubtitle:
      'Folhagens exuberantes, vasos em terracota, cachepôs, palmeiras e orquídeas em uma curadoria voltada à natureza viva dentro e fora da loja.',
    coverImage: '/assets/aistudio/104d836d-55e2-4231-ba31-57dec03faebd_618b7656.jpeg',
    coverObjectPosition: 'center',
    photos: [
      {
        id: 'botanica-01',
        image: '/assets/aistudio/104d836d-55e2-4231-ba31-57dec03faebd_618b7656.jpeg',
        alt: 'Coleção Botânica — 2026 — Composição de parede com plantas verdes, cachepôs e prateleiras',
        caption: 'Composição de parede com plantas verdes, cachepôs e prateleiras expositoras.',
        objectPosition: 'center',
      },
      {
        id: 'botanica-02',
        image: '/assets/aistudio/d1250b2f-994c-4729-8bb4-8fc35cf3cc83_0b18c7f4.jpeg',
        alt: 'Coleção Botânica — 2026 — Bancada com folhagens, aspargos, vasos em terracota e girassóis',
        caption: 'Bancada expositora com folhagens, aspargos ornamentais, vasos em terracota e girassóis.',
        objectPosition: 'center',
      },
      {
        id: 'botanica-03',
        image: '/assets/aistudio/24edd561-ae96-4f7f-9397-6e49ee5ed385_71c8782b.jpeg',
        alt: 'Coleção Botânica — 2026 — Vitrine frontal com espécies verdes e arbustos ornamentais',
        caption: 'Vitrine frontal reunindo espécies verdes e arbustos ornamentais em alturas variadas.',
        objectPosition: 'top',
      },
      {
        id: 'botanica-04',
        image: '/assets/aistudio/b93f96a3-1483-4b78-85f4-4522116d0bd9_2496e96a.jpeg',
        alt: 'Coleção Botânica — 2026 — Vitrine noturna com folhagens variadas, palmeiras e orquídeas',
        caption: 'Vitrine noturna com folhagens variadas, palmeiras e pontos focais de orquídeas.',
        objectPosition: 'top',
      },
    ],
  },
  {
    id: 'tema-copa-2026',
    slug: 'tema-copa-2026',
    title: 'Tema Copa 2026',
    campaignName: 'Tema Copa',
    occasion: 'Copa',
    year: '2026',
    seasonLabel: 'Copa · 2026',
    curatorialSubtitle:
      'Cenografia temática brasileira combinando girassóis, flores azuis, bandeirinhas juninas, troféu dourado e elementos festivos na vitrine.',
    coverImage: '/assets/aistudio/3570dc50-66bc-4eff-8175-2a4f91b86d26_94ddc85c.jpeg',
    coverObjectPosition: 'top',
    photos: [
      {
        id: 'copa-01',
        image: '/assets/aistudio/3570dc50-66bc-4eff-8175-2a4f91b86d26_94ddc85c.jpeg',
        alt: 'Tema Copa 2026 — Vitrine externa com troféu dourado, girassóis, bandeirinhas e elementos juninos',
        caption: 'Vitrine externa com troféu dourado, girassóis vibrantes, bandeirinhas e elementos juninos.',
        objectPosition: 'top',
      },
      {
        id: 'copa-02',
        image: '/assets/aistudio/a7dfdabe-8700-40c9-9804-fe091564f852_e4493fdd.jpeg',
        alt: 'Tema Copa 2026 — Detalhe interno com troféu, bola, girassóis e flores azuis',
        caption: 'Detalhe interno destacando troféu, bola temática, girassóis e flores em tons de azul.',
        objectPosition: 'center',
      },
    ],
  },
  {
    id: 'dia-dos-namorados-2026',
    slug: 'amor-em-flor-dia-dos-namorados-2026',
    title: 'Coleção Amor em Flor — Dia dos Namorados 2026',
    campaignName: 'Amor em Flor',
    occasion: 'Dia dos Namorados',
    year: '2026',
    seasonLabel: 'Dia dos Namorados · 2026',
    curatorialSubtitle:
      'Corações de rosas vermelhas, ursos de pelúcia, velas, taças, cones e boxes presente em uma celebração romântica em cada detalhe.',
    coverImage: '/assets/aistudio/2c4e89f9-f632-4d3c-9d99-a7b37dd32f03_d4d08c90.jpeg',
    coverObjectPosition: 'top',
    photos: [
      {
        id: 'namorados-01',
        image: '/assets/aistudio/2c4e89f9-f632-4d3c-9d99-a7b37dd32f03_d4d08c90.jpeg',
        alt: 'Coleção Amor em Flor — Dia dos Namorados 2026 — Vitrine noturna com corações de rosas vermelhas e urso central',
        caption: 'Vitrine noturna com corações de rosas vermelhas suspensos e urso central.',
        objectPosition: 'top',
      },
      {
        id: 'namorados-02',
        image: '/assets/aistudio/41ecf3ea-076c-4530-b105-db43d8c295e5_0980b566.jpeg',
        alt: 'Coleção Amor em Flor — Dia dos Namorados 2026 — Vitrine frontal com rosas vermelhas e urso de pelúcia',
        caption: 'Enquadramento frontal com profusão de rosas vermelhas e urso de pelúcia.',
        objectPosition: 'top',
      },
      {
        id: 'namorados-03',
        image: '/assets/aistudio/32535317-bda5-4ca6-b85e-21c7236b7b4d_effd15c7.jpeg',
        alt: 'Coleção Amor em Flor — Dia dos Namorados 2026 — Detalhe com rosas vermelhas, taças e Ferrero Rocher',
        caption: 'Detalhe de presente com rosas vermelhas, taças e bombons Ferrero Rocher.',
        objectPosition: 'center',
      },
      {
        id: 'namorados-04',
        image: '/assets/aistudio/88156d8c-4436-476b-8ebc-0af8107fbcfa_11b3484c.jpeg',
        alt: 'Coleção Amor em Flor — Dia dos Namorados 2026 — Ângulo lateral com arranjo alto de rosas vermelhas e velas',
        caption: 'Ângulo lateral com arranjo alto de rosas vermelhas e iluminação de velas.',
        objectPosition: 'center',
      },
      {
        id: 'namorados-05',
        image: '/assets/aistudio/374a7d0d-443e-44aa-9778-19735ad6358b_7fd36fb4.jpeg',
        alt: 'Coleção Amor em Flor — Dia dos Namorados 2026 — Composição com urso, buquês em cone e box coração vermelho',
        caption: 'Composição expositora com urso, buquês em cone e box coração vermelho.',
        objectPosition: 'center',
      },
    ],
  },
  {
    id: 'primavera-2026',
    slug: 'colecao-primavera-2026',
    title: 'Coleção Primavera — 2026',
    campaignName: 'Coleção Primavera',
    occasion: 'Primavera',
    year: '2026',
    seasonLabel: 'Primavera · 2026',
    curatorialSubtitle:
      'Paleta vibrante com buganvílias rosas, orquídeas amarelas, lírios, astromélias e gypsofila lilás celebrando a estação das flores.',
    coverImage: '/assets/aistudio/bb536c2f-00f4-49d5-8a8b-52d9be3909d4_bc3015c1.jpeg',
    coverObjectPosition: 'top',
    photos: [
      {
        id: 'primavera-01',
        image: '/assets/aistudio/bb536c2f-00f4-49d5-8a8b-52d9be3909d4_bc3015c1.jpeg',
        alt: 'Coleção Primavera — 2026 — Vitrine noturna com arranjos florais coloridos',
        caption: 'Vitrine noturna em plena harmonia cromática com arranjos florais coloridos.',
        objectPosition: 'top',
      },
      {
        id: 'primavera-02',
        image: '/assets/aistudio/808ad4a8-86ef-4575-8481-00f62bf6868e_6de9aa79.jpeg',
        alt: 'Coleção Primavera — 2026 — Composição com buganvílias rosas, orquídeas amarelas e gypsofila lilás',
        caption: 'Composição primaveril com buganvílias rosas, orquídeas amarelas e gypsofila lilás.',
        objectPosition: 'center',
      },
      {
        id: 'primavera-03',
        image: '/assets/aistudio/07d3c73c-1ad0-48f5-87b4-f7f94313984b_facc9c4e.jpeg',
        alt: 'Coleção Primavera — 2026 — Lírios rosas, astromélias vermelhas, limonium e aglaonemas na vitrine',
        caption: 'Lírios rosas, astromélias vermelhas, limonium e aglaonemas em destaque na vitrine.',
        objectPosition: 'center',
      },
    ],
  },
  {
    id: 'dia-dos-pais-2026',
    slug: 'dia-dos-pais-2026',
    title: 'Dia dos Pais — 2026',
    campaignName: 'Dia dos Pais',
    occasion: 'Dia dos Pais',
    year: '2026',
    seasonLabel: 'Dia dos Pais · 2026',
    curatorialSubtitle:
      'Ambientação elegante em verde-oliva e tons amadeirados com girassóis, folhagens esculturais, vasos cerâmicos e caixas presente personalizadas.',
    coverImage: '/assets/aistudio/3d740ff4-6d4d-4b70-8f05-f7c2509a4af2_ef5c319b.jpeg',
    coverObjectPosition: 'center',
    photos: [
      {
        id: 'pais-01',
        image: '/assets/aistudio/3d740ff4-6d4d-4b70-8f05-f7c2509a4af2_ef5c319b.jpeg',
        alt: 'Dia dos Pais — 2026 — Vitrine temática com girassóis, vasos cerâmicos verde-oliva e caixas presente',
        caption: 'Composição interna com girassóis, vasos cerâmicos verde-oliva e caixas presente.',
        objectPosition: 'center',
      },
      {
        id: 'pais-02',
        image: '/assets/aistudio/bd03bafd-5c85-4c61-9dc8-78fb284b0783_fba5a270.jpeg',
        alt: 'Dia dos Pais — 2026 — Fachada iluminada da AB Flores & Decoração com painel Pai, vasos verdes e caixas presente',
        caption:
          'Fachada iluminada da loja com painel comemorativo, gravatas-borboleta decorativas, folhagens, vasos verdes e caixas presente.',
        objectPosition: 'top',
      },
    ],
  },
];
