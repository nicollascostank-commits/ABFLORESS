export type ProductCategory = 'buques-boxes' | 'box-flowers' | 'assinaturas' | 'eventos';
export type CatalogCategory =
  | 'todos'
  | 'buques'
  | 'boxes-florais'
  | 'arranjos'
  | 'presentes'
  | 'box-flowers';

export interface CatalogCategoryMeta {
  id: CatalogCategory;
  name: string;
  description: string;
}

export type BuquesBoxesSubCategory =
  | 'todos'
  | 'rosas'
  | 'girassois'
  | 'lirios'
  | 'mistos'
  | 'boxes-cones'
  | 'ursos-chocolates';

export interface SubCategoryMeta<T extends string = string> {
  id: T;
  label: string;
}

export const BUQUES_BOXES_SUBCATEGORIES: SubCategoryMeta<BuquesBoxesSubCategory>[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'rosas', label: 'Rosas' },
  { id: 'girassois', label: 'Girassóis' },
  { id: 'lirios', label: 'Lírios' },
  { id: 'mistos', label: 'Buquês Mistos' },
  { id: 'boxes-cones', label: 'Boxes & Cones' },
  { id: 'ursos-chocolates', label: 'Com Ursos & Chocolates' },
];

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  catalogCategory: 'buques' | 'boxes-florais' | 'arranjos' | 'presentes' | 'box-flowers';
  subCategory?: string;
  price?: number;
  formattedPrice?: string;
  shortDescription: string;
  fullDescription?: string;
  components?: string;
  image: string; // Unique primary photograph
  additionalImages?: string[]; // Multiple photos from different angles
  badge?: string;
  whatsAppUrl?: string;
  status: 'published' | 'draft' | 'coming_soon';
  featured?: boolean;
}

export interface CategoryStructure {
  id: ProductCategory;
  name: string;
  subtitle: string;
  description: string;
  status: 'active' | 'coming_soon';
  availableCount: number;
}

/**
 * Categories Configuration:
 * - Active: "Buquês & Box Florais para Presentear" (Primary active commercial category)
 * - Prepared for future additions: "Assinaturas Florais" & "Decorações de Eventos"
 */
export const CATEGORIES_CONFIG: CategoryStructure[] = [
  {
    id: 'buques-boxes',
    name: 'Buquês & Box Florais para Presentear',
    subtitle: 'Todos os dias você pode presentear com flores',
    description:
      'Um pedido de desculpas, um pedido de namoro, uma visita a um amigo, um simples "lembrei de você", um noivado ou a chegada de uma viagem. Existem muitos momentos em que as flores se fazem presentes e tornam cada ocasião ainda mais especial.',
    status: 'active',
    availableCount: 31,
  },
  {
    id: 'assinaturas',
    name: 'Assinaturas Florais',
    subtitle: 'Flores frescas com curadoria periódica',
    description:
      'Estrutura preparada para o serviço de assinaturas florais residenciais e corporativas da AB Flores. Projetos sob medida com entrega programada em Fortaleza.',
    status: 'coming_soon',
    availableCount: 0,
  },
  {
    id: 'eventos',
    name: 'Decorações de Eventos',
    subtitle: 'Cenografia e ambientação botânica autoral',
    description:
      'Projetos florais exclusivos para eventos sociais, empresariais, cerimônias e casamentos assinados pelo artista visual Arley Borges.',
    status: 'coming_soon',
    availableCount: 0,
  },
];

export const CATALOG_CATEGORIES_CONFIG: CatalogCategoryMeta[] = [
  { id: 'todos', name: 'Todos', description: 'Todas as criações autorais da AB Flores' },
  { id: 'buques', name: 'Buquês', description: 'Buquês nobres de rosas, lírios e girassóis selecionados' },
  { id: 'boxes-florais', name: 'Boxes Florais', description: 'Caixas redondas, sacolas box e caixas surpresa' },
  { id: 'arranjos', name: 'Arranjos & Cones', description: 'Arranjos em cones florais e composições botânicas' },
  { id: 'presentes', name: 'Presentes & Especiais', description: 'Combos afetivos com pelúcia, rosas, espumante e Ferrero Rocher' },
  { id: 'box-flowers', name: 'Box Flowers para Presentes', description: 'Caixas rígidas de luxo, hatboxes, sacolas vitrine e combos especiais' },
];

/**
 * Official verified products of "Buquês & Box Florais para Presentear"
 * - 20 authentic creations from the official atelier product cards
 * - 6 authentic creations recovered from the former packaging section (real sellable products)
 * Total: 26 products. Strict deduplication: each product has a unique photograph.
 * Top 6 products (indices 0-5) are featured on the homepage in a 3-column desktop / 2-column mobile grid.
 */
export const PRODUCTS_DATA: Product[] = [
  // 1. Destaque Homepage #1
  {
    id: 'ab-bouquet-tropical',
    name: 'Bouquet Tropical',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'mistos',
    price: 249.0,
    formattedPrice: 'R$ 249,00',
    shortDescription: 'Cores vibrantes e folhagens exóticas que traduzem alegria e boas energias.',
    fullDescription: 'Criação autoral de Arley Borges com antúrios tropicais, girassóis solares, alpínias vermelhas e folhagens de alta durabilidade, envoltas em papel kraft e amarração em juta natural.',
    components: 'Girassóis nobres, antúrios tropicais, alpínias vermelhas, folhagens exóticas, papel kraft e juta.',
    image: '/assets/aistudio/ceb17082-106e-436b-a3f8-1e9c713900cd_071cec54.jpeg',
    badge: 'Destaque Autoral',
    status: 'published',
    featured: true,
  },
  // 2. Destaque Homepage #2
  {
    id: 'ab-buque-lirios-campestres-rosados',
    name: 'Buquê Lírios e Flores Campestres em Tons Rosados',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'lirios',
    price: 345.0,
    formattedPrice: 'R$ 345,00',
    shortDescription: 'A delicadeza dos lírios e o charme das flores do campo em uma composição romântica e encantadora.',
    fullDescription: 'Lírio oriental nobre cercado por flores campestres em tonalidades rosadas, chuva-de-prata e embalagem em dupla camada rosé com tag exclusiva da AB Flores.',
    components: 'Lírio oriental nobre, flores do campo em degradê rosé, chuva-de-prata fresca e papel nobre com tag institucional.',
    image: '/assets/aistudio/da6c3374-f8c9-4b39-af63-8d679303d700_07567cf0.jpeg',
    badge: 'Romântico Premium',
    status: 'published',
    featured: true,
  },
  // 3. Destaque Homepage #3
  {
    id: 'ab-buque-tons-rosados-branco',
    name: 'Buquê em Tons Rosados e Branco',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'rosas',
    price: 197.0,
    formattedPrice: 'R$ 197,00',
    shortDescription: '05 rosas selecionadas nobres com delicadas flores do campo e folhagens.',
    fullDescription: 'Cinco rosas nobres em tons suaves de rosé e branco, entremeadas por delicadas margaridinhas, gypsofila e folhagens de corte, com acabamento em papel rosé acetinado e laço com fita institucional.',
    components: '5 rosas nobres (rosé e brancas), margaridas miúdas, chuva-de-prata, papel rosé e laço de cetim com tag.',
    image: '/assets/aistudio/bdfaa983-b310-4002-abcc-e22a252fae4b_0ab7a21d.jpeg',
    badge: 'Mais Pedido',
    status: 'published',
    featured: true,
  },
  // 4. Destaque Homepage #4
  {
    id: 'ab-box-encanto',
    name: 'Box Encanto com Pelúcia e Ferrero',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'presentes',
    subCategory: 'ursos-chocolates',
    price: 249.0,
    formattedPrice: 'R$ 249,00',
    shortDescription: 'Box redonda nobre com rosas vermelhas, ursinho de pelúcia e bombons Ferrero Rocher.',
    fullDescription: 'Caixa redonda cartonada de alto padrão com laço de cetim marrom e tag "Feito com amor". Acomoda rosas vermelhas vivas, tuia aromática, ursinho de pelúcia premium e 3 chocolates Ferrero Rocher.',
    components: 'Rosas vermelhas nobres, ursinho de pelúcia macio, 3 bombons Ferrero Rocher, folhagens de tuia, box cartonada e laço marrom com tag.',
    image: '/assets/aistudio/d775bb14-5456-4ccc-9fce-0948319c0046_a7383a6b.jpeg',
    badge: 'Presente Completo',
    status: 'published',
    featured: true,
  },
  // 5. Destaque Homepage #5
  {
    id: 'ab-raio-de-sol',
    name: 'Raio de Sol',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'girassois',
    price: 150.0,
    formattedPrice: 'R$ 150,00',
    shortDescription: 'Leveza, alegria e bons sentimentos para iluminar o seu dia.',
    fullDescription: 'Composição solar com 03 girassóis radiantes de primeira linha, nuvem delicada de gypsophila e folhagens selecionadas. Envolvido em papel kraft com laço de cetim verde e tag oficial da AB Flores.',
    components: '03 girassóis radiantes, gypsophila delicada, folhagens selecionadas, papel kraft e laço verde oliva.',
    image: '/assets/aistudio/495ebbc1-4074-4b03-b4f1-33d7829ed8ec_783d4b54.jpeg',
    badge: 'Mais Vendido',
    status: 'published',
    featured: true,
  },
  // 6. Destaque Homepage #6
  {
    id: 'ab-box-coracao-flores',
    name: 'Box Coração em Flores com Urso e Chocolates',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'presentes',
    subCategory: 'ursos-chocolates',
    price: 165.0,
    formattedPrice: 'R$ 165,00',
    shortDescription: 'Combo afetivo com 3 rosas, urso de pelúcia com coração e bombons Ferrero Rocher.',
    fullDescription: 'Apresentação especial com 3 rosas vermelhas selecionadas, ursinho de pelúcia fofinho segurando coração "Te Amo", 3 bombons finos Ferrero Rocher e sacola especial.',
    components: '3 rosas vermelhas selecionadas, ursinho de pelúcia, 3 bombons Ferrero Rocher, folhagens e embalagem especial com laço.',
    image: '/assets/aistudio/4ec07901-1356-43db-870b-664fed6e2d50_4a25653a.jpeg',
    badge: 'Romântico',
    status: 'published',
    featured: true,
  },
  // 7. Catálogo Completo
  {
    id: 'ab-buque-03-rosas',
    name: 'Buquê com 03 Rosas',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'rosas',
    price: 140.0,
    formattedPrice: 'R$ 140,00',
    shortDescription: 'Três rosas que traduzem sentimentos verdadeiros. Simples, romântico e inesquecível.',
    fullDescription: 'Três rosas selecionadas premium em botão exuberante, com folhagens nobres, gypsofila e complementos. Embalagem sofisticada em papel jornal editorial com laço de cetim vermelho.',
    components: '3 rosas selecionadas premium, folhagens nobres e complementos, papel jornal editorial e laço de cetim vermelho.',
    image: '/assets/aistudio/20eadd91-ad4c-44cc-b35c-b1d9972c5d4d_1e3bf8c6.jpeg',
    badge: 'Romântico',
    status: 'published',
  },
  // 8. Catálogo Completo
  {
    id: 'ab-buque-06-lirios',
    name: 'Buquê com 6 Lírios e Complemento',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'lirios',
    price: 249.0,
    formattedPrice: 'R$ 249,00',
    shortDescription: 'Um gesto que transmite delicadeza, carinho e bons sentimentos.',
    fullDescription: 'Seis botões e flores abertas de lírios cor-de-rosa perfumados, com gypsofila fresca e complementos em degradê suave, em papel kraft com seda rosé e laço refinado.',
    components: '6 lírios cor-de-rosa nobres, gypsofila, folhagens finas, papel kraft e laço acetinado.',
    image: '/assets/aistudio/fc0df96f-bd4b-48d3-9074-dc162cbb9afa_7e60d684.jpeg',
    badge: 'Sofisticado',
    status: 'published',
  },
  // 9. Catálogo Completo
  {
    id: 'ab-ramalhete-lirios-astromelias',
    name: 'Ramalhete com Lírios, Flor do Campo e Astromélias',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'lirios',
    price: 179.0,
    formattedPrice: 'R$ 179,00',
    shortDescription: 'Harmonia perfeita entre a majestade dos lírios e a leveza das flores campestres.',
    fullDescription: 'Composição botânica equilibrada com lírios em tom pastel, astromélias vibrantes e mix de flores do campo frescas, finalizado em embalagem nobre com laço personalizado.',
    components: 'Lírios selecionados, astromélias coloridas, flores campestres e gypsofila.',
    image: '/assets/aistudio/398ba827-6489-4a96-922b-6b41b73bc187_b0164134.jpeg',
    badge: 'Delicadeza',
    status: 'published',
  },
  // 10. Catálogo Completo
  {
    id: 'ab-box-azul-girassol',
    name: 'Box Azul com Girassol',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'boxes-florais',
    subCategory: 'boxes-cones',
    price: 235.0,
    formattedPrice: 'R$ 235,00',
    shortDescription: 'Elegância contemporânea em box circular azul claro com girassol radiante.',
    fullDescription: 'Box rígida cartonada azul celeste com laço de cetim, contendo girassol nobre em abertura perfeita acompanhado de flores de complemento e folhagens aromáticas.',
    components: 'Girassol de alta durabilidade, flores de corte complementares, folhagens nobres e box rígida azul celeste com laço.',
    image: '/assets/aistudio/2db47a57-e2e5-478e-b524-86806723c0c9_05db1bcb.jpeg',
    badge: 'Design Moderno',
    status: 'published',
  },
  // 11. Catálogo Completo
  {
    id: 'ab-ramalhete-azul-margaridas-lirios',
    name: 'Ramalhete em Tons de Azul com Margaridas e Lírios Brancos',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'lirios',
    price: 189.0,
    formattedPrice: 'R$ 189,00',
    shortDescription: 'Serenidade e pureza expressas em lírios brancos e flores campestres em tonalidades azuis.',
    fullDescription: 'Criação com lírios brancos perfumados, margaridas e flores do campo tingidas artesanalmente em azul celeste, envoltas em papel especial com laço de cetim.',
    components: 'Lírios brancos orientais, margaridas selecionadas, flores campestres em tom azul e papel especial.',
    image: '/assets/aistudio/28ce3ae6-5cf1-4c5b-8aff-5e0e8f60ff85_25ea50af.jpeg',
    badge: 'Exclusivo',
    status: 'published',
  },
  // 12. Catálogo Completo
  {
    id: 'ab-cone-primavera',
    name: 'Cone Primavera',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'arranjos',
    subCategory: 'boxes-cones',
    price: 85.9,
    formattedPrice: 'R$ 85,90',
    shortDescription: 'Alegria e frescor em formato de cone para presentear com charme e leveza.',
    fullDescription: 'Arranjo prático e encantador em formato cônico com astromélias cor-de-rosa, chuva-de-prata e folhagens verdes em cone de acabamento acetinado com laço de fita.',
    components: 'Astromélias frescas, gypsofila delicada, folhagens nobres e cone decorativo com laço.',
    image: '/assets/aistudio/1624cab7-8230-4b80-bb9d-e70ff5f3f037_2d6fb332.jpeg',
    badge: 'Custo-Benefício',
    status: 'published',
  },
  // 13. Catálogo Completo
  {
    id: 'ab-buque-amor-perfeito-12-rosas',
    name: 'Buquê Amor Perfeito — 12 Rosas Clássicas',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'rosas',
    price: 315.0,
    formattedPrice: 'R$ 315,00',
    shortDescription: 'O clássico dos clássicos: doze rosas vermelhas nobres com gypsofila e eucalipto.',
    fullDescription: 'Uma dúzia de rosas vermelhas aveludadas de botão generoso, dispostas em arranjo circular clássico com nuvem de gypsofila fresca e folhagens aromáticas de eucalipto, envoltas em papel especial com laço de cetim.',
    components: '12 rosas vermelhas importadas, gypsofila fresca, folhas de eucalipto, papel nobre e fita de cetim.',
    image: '/assets/aistudio/2b234f72-3a32-4de6-b5a7-216707cf27c8_df9a10f1.jpeg',
    badge: 'Clássico Inesquecível',
    status: 'published',
  },
  // 14. Catálogo Completo
  {
    id: 'ab-buque-amor-perfeito-coracao',
    name: 'Buquê Amor Perfeito — Coração',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'rosas',
    price: 315.0,
    formattedPrice: 'R$ 315,00',
    shortDescription: 'Composição autoral em formato de coração unindo rosas vermelhas e gypsofila.',
    fullDescription: 'Design floral escultural exclusivo de Arley Borges: metade do buquê em rosas vermelhas densas e metade em gypsofila delicada, formando uma silhueta expressiva de coração.',
    components: 'Rosas vermelhas selecionadas, farta gypsofila branca, embalagem especial em degradê e laço acetinado.',
    image: '/assets/aistudio/0e76bfec-4594-4139-a4f9-fa661c12720e_740451c8.jpeg',
    badge: 'Criação Artística',
    status: 'published',
  },
  // 15. Catálogo Completo
  {
    id: 'ab-buque-solar',
    name: 'Buquê Solar de Girassóis',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'girassois',
    price: 270.0,
    formattedPrice: 'R$ 270,00',
    shortDescription: 'Dez girassóis exuberantes que irradiam energia, vitalidade e alegria genuína.',
    fullDescription: 'Arranjo desconstruído e moderno com 10 girassóis selecionados de grande porte, complementados por gypsofila e folhagens nobres, com papel kraft encorpado e fita institucional.',
    components: '10 girassóis selecionados, gypsofila, folhagens verdes, papel kraft duplex e laço artesanal.',
    image: '/assets/aistudio/3d997953-38c8-461d-bcb1-6a60d22ae8ed_dd179631.jpeg',
    badge: 'Energia & Luz',
    status: 'published',
  },
  // 16. Catálogo Completo
  {
    id: 'ab-ramalhete-raio-de-sol',
    name: 'Ramalhete Raio de Sol',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'girassois',
    price: 99.0,
    formattedPrice: 'R$ 99,00',
    shortDescription: '01 girassol selecionado envolto em nuvem de gypsofila para um gesto carinhoso.',
    fullDescription: 'Um presente delicado, pontual e iluminado: um único girassol perfeito em abertura, cercado de gypsofila fresca e folhagens nobres em papel especial com laço de cetim.',
    components: '01 girassol selecionado, gypsofila delicada, folhagens verdes e acabamento em papel com fita.',
    image: '/assets/aistudio/920b0edb-88a3-4c1d-b553-130cb86f0fc9_0d1b622d.jpeg',
    badge: 'Gesto de Carinho',
    status: 'published',
  },
  // 17. Catálogo Completo
  {
    id: 'ab-buque-rustico-girassol',
    name: 'Buquê Rústico com Girassol',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'girassois',
    price: 275.0,
    formattedPrice: 'R$ 275,00',
    shortDescription: 'Girassóis vibrantes com gypsofila em juta natural e fita verde oliva.',
    fullDescription: 'Composição rústica chic com múltiplos girassóis abertos, chuva-de-prata farta e acabamento texturizado em juta natural com laço acetinado verde musgo.',
    components: 'Girassóis nobres, gypsofila fresca, acabamento em juta rústica de alta gramatura e laço verde musgo.',
    image: '/assets/aistudio/c1b9ff1c-cd95-4cde-9815-6c55072e8f27_edf395fe.jpeg',
    badge: 'Rústico Chic',
    status: 'published',
  },
  // 18. Catálogo Completo
  {
    id: 'ab-mini-buque-mix-flores',
    name: 'Mini Buquê com Mix de Flores',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'mistos',
    price: 135.0,
    formattedPrice: 'R$ 135,00',
    shortDescription: 'Lisianthus e flores campestres em arranjo delicado com papel rosé acetinado.',
    fullDescription: 'Arranjo compacto com mix de flores selecionadas como lisianthus, cravinas e astromélias em harmonia de cores pastéis, finalizado em papel rosé acetinado e laço marrom.',
    components: 'Mix de flores nobres (lisianthus e flores campestres), folhagens de corte, papel rosé e fita.',
    image: '/assets/aistudio/b8d0890d-0187-4234-b786-64558f79c6fe_cd42a6ff.jpeg',
    badge: 'Delicado',
    status: 'published',
  },
  // 19. Catálogo Completo
  {
    id: 'ab-caixa-surpresa-flores',
    name: 'Caixa Surpresa AB Flores',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'boxes-florais',
    subCategory: 'boxes-cones',
    price: 210.0,
    formattedPrice: 'R$ 210,00',
    shortDescription: 'Lírios brancos e flores em tonalidades lilás em caixa surpresa especial de presente.',
    fullDescription: 'Experiência inesquecível ao abrir: caixa estruturada com tampa que revela arranjo exuberante com lírios brancos, flores roxas e folhagens frescas, ideal para aniversários e celebrações.',
    components: 'Lírios brancos orientais, flores em tons de lilás e roxo, folhagens nobres e caixa cartonada especial.',
    image: '/assets/aistudio/c7f13da3-2c55-4198-9570-93b3d61d65fd_fb54f8fd.jpeg',
    badge: 'Surpresa Inesquecível',
    status: 'published',
  },
  // 20. Catálogo Completo
  {
    id: 'ab-mini-buque-02-girassol-astromelias',
    name: 'Mini Buquê com 02 Girassóis e Astromélias Brancas',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'girassois',
    price: 139.0,
    formattedPrice: 'R$ 139,00',
    shortDescription: '02 girassóis luminosos combinados com astromélias brancas e folhagens.',
    fullDescription: 'Combinação alegre e elegante de dois girassóis de botão aberto com astromélias brancas e gypsofila, envoltos em papel especial com laço de cetim verde.',
    components: '02 girassóis selecionados, astromélias brancas, gypsofila, folhagens e papel especial com laço.',
    image: '/assets/aistudio/7d41b21b-d753-4acd-9efc-338fdcd1c047_75116c88.jpeg',
    badge: 'Alegria e Luz',
    status: 'published',
  },
  // 21. Recuperado de Embalagens & Experiência (Produto Real de Venda)
  {
    id: 'ab-paixao-imperial-sacola',
    name: 'Paixão Imperial — Sacola Rígida com Rosas, Pelúcia & Ferrero',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'presentes',
    subCategory: 'ursos-chocolates',
    formattedPrice: 'Preço a consultar',
    shortDescription: 'Sacola alta estruturada com buquê de rosas vermelhas aveludadas, urso de pelúcia e bombons Ferrero Rocher.',
    fullDescription: 'Apresentação exclusiva da AB Flores: sacola alta em papelão rígido com visor transparente, acomodando um farto buquê de rosas vermelhas com chuva-de-prata, caixa de chocolates Ferrero Rocher e ursinho com laço xadrez.',
    components: 'Rosas vermelhas aveludadas, chuva-de-prata, caixa Ferrero Rocher, ursinho de pelúcia, papel xadrez e sacola bolsa alta com visor.',
    image: '/assets/aistudio/ff93e7db-86bc-48d3-9aae-4c09be9d9acb_0977ad33.jpeg',
    badge: 'Presente Completo',
    status: 'published',
  },
  // 22. Recuperado de Embalagens & Experiência (Produto Real de Venda)
  {
    id: 'ab-box-carinho-pelucia-ferrero',
    name: 'Box Carinho com Ursinho & Chocolates Ferrero',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'presentes',
    subCategory: 'ursos-chocolates',
    formattedPrice: 'Preço a consultar',
    shortDescription: 'Box redonda cartonada com rosas vermelhas vivas, ursinho de pelúcia fofinho e chocolates finos com tag "Feito com amor".',
    fullDescription: 'Caixa redonda estruturada com laço de cetim marrom, abrigando botões de rosa vermelha selecionada, folhagens verdes aromáticas, 3 bombons Ferrero Rocher e ursinho de pelúcia.',
    components: 'Rosas vermelhas, urso de pelúcia antialérgico, 3 bombons Ferrero Rocher, folhagens de cedro/eucalipto, box cartonada e laço marrom.',
    image: '/assets/aistudio/ddeb1465-46c0-4806-b95a-c928dfb0ef94_ad0ff25e.jpeg',
    badge: 'Afeto',
    status: 'published',
  },
  // 23. Recuperado de Embalagens & Experiência (Produto Real de Venda)
  {
    id: 'ab-cones-com-girassol',
    name: 'Cones com Girassol em Sacola Kraft',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'arranjos',
    subCategory: 'boxes-cones',
    formattedPrice: 'Preço a consultar',
    shortDescription: 'Cones individuais de girassol com folhagens em sacolas kraft com visor transparente e tag oficial AB Flores.',
    fullDescription: 'Apresentação prática, charmosa e sofisticada. Girassóis frescos acomodados em cones verticais com tuia e folhagens nobres, em sacolas kraft com visor e laço verde musgo.',
    components: 'Girassóis selecionados, folhagens de tuia, cones de papel kraft, sacolas com visor transparente e tag oficial.',
    image: '/assets/aistudio/4746606b-f09c-43c2-842f-8cac410501ee_61340d06.jpeg',
    badge: 'Versátil',
    status: 'published',
  },
  // 24. Recuperado de Embalagens & Experiência (Produto Real de Venda)
  {
    id: 'ab-flowers-box-mini-vaso',
    name: 'Flowers Box com Mini Vaso em Cerâmica',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'boxes-florais',
    subCategory: 'boxes-cones',
    formattedPrice: 'Preço a consultar',
    shortDescription: 'Caixa bolsa verde sálvia estruturada com visor transparente, buquê de flores selecionadas e mini vaso cerâmico.',
    fullDescription: 'Design floral contemporâneo com a identidade AB Flores: sacola box rígida com alça de tecido, visor transparente, buquê em papel jornal editorial e mini vaso de cerâmica para acomodar o arranjo.',
    components: 'Buquê de flores selecionadas com cravinas e astromélias, papel editorial "I LOVE YOU", caixa bolsa verde com alça e mini vaso em cerâmica.',
    image: '/assets/aistudio/face0d04-192f-424c-af54-a105f9824574_f4bd963f.jpeg',
    badge: 'Design Exclusivo',
    status: 'published',
  },
  // 25. Recuperado de Embalagens & Experiência (Produto Real de Venda)
  {
    id: 'ab-buque-lirios-astromelias-editorial',
    name: 'Buquê Lírios & Astromélias Editorial',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'lirios',
    formattedPrice: 'Preço a consultar',
    shortDescription: 'Lírios brancos e astromélias pink em papel de jornal vintage editorial com tag AB Flores e laço branco.',
    fullDescription: 'Estética editorial refinada inspirada nas floriculturas europeias. Lírios brancos em abertura e botões com astromélias vibrantes em embalagem de jornal impresso e fita branca.',
    components: 'Lírios brancos orientais, astromélias cor-de-rosa/pink, folhagens de corte, papel jornal editorial e laço branco.',
    image: '/assets/aistudio/f1f7e8e6-070c-4abc-92c5-62d8e37c52d7_854a9aaf.jpeg',
    badge: 'Editorial',
    status: 'published',
  },
  // 26. Recuperado de Embalagens & Experiência (Produto Real de Venda)
  {
    id: 'ab-box-pelucias-flores-chocolates',
    name: 'Pelúcias! Boxs! Flores e Chocolates',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'presentes',
    subCategory: 'ursos-chocolates',
    formattedPrice: 'Preço a consultar',
    shortDescription: 'Composição de luxo com boxes circulares brancas, ursinhos de pelúcia, chocolates finos Ferrero Rocher e espumante.',
    fullDescription: 'Uma cenografia completa de presentes afetivos criada por Arley Borges. Reúne caixas redondas cartonadas com laços marrons oficiais, buquês em cones rosé, ursinhos de pelúcia antialérgicos, chocolates finos Ferrero Rocher e garrafa de espumante para brindar momentos inesquecíveis.',
    components: 'Box circular branca de luxo, ursinho de pelúcia fofo, chocolates Ferrero Rocher com fita personalizada Arley Borges, espumante selecionado, folhagens e cones florais.',
    image: '/assets/aistudio/653c93c4-e6a1-4941-bf12-f1d42eba4a4b_c9759860.jpeg',
    badge: 'Super Luxo',
    status: 'published',
  },
  // 27. Nova fotografia real incorporada após auditoria anti-duplicatas
  {
    id: 'ab-buque-rosas-vermelhas-editorial',
    name: 'Buquê de Rosas Vermelhas em Papel Jornal',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'rosas',
    formattedPrice: 'Preço a consultar',
    shortDescription: 'Rosas vermelhas abertas com gypsofila e folhas de samambaia em papel jornal e fita bordô.',
    fullDescription: 'Buquê montado no ateliê com rosas vermelhas abertas, gypsofila branca e folhas de samambaia, envolvido em papel jornal com fita de cetim bordô e tag AB Flores.',
    components: 'Rosas vermelhas, gypsofila branca, samambaia, papel jornal e fita de cetim bordô.',
    image: '/assets/aistudio/00206ad6-64c0-4f97-bbe0-409ee623157e_d4781faa.jpeg',
    badge: 'Clássico',
    status: 'published',
  },
  // 28. Nova fotografia real incorporada após auditoria anti-duplicatas
  {
    id: 'ab-buque-12-rosas-brancas-rosas',
    name: 'Buquê com 12 Rosas Brancas e Cor-de-Rosa',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'rosas',
    formattedPrice: 'Preço a consultar',
    shortDescription: 'Doze rosas em tons de branco e cor-de-rosa com gypsofila e tuia em embalagem rosa e laço marrom.',
    fullDescription: 'Buquê composto por 12 rosas brancas e cor-de-rosa com gypsofila e ramos de tuia, finalizado em papel rosé com laço de cetim marrom e cartão AB Flores.',
    components: '12 rosas brancas e cor-de-rosa, gypsofila, tuia, papel rosé e laço marrom.',
    image: '/assets/aistudio/53f97f7a-6b12-46a6-abb2-8462a39ac0c7_b5938fa6.jpeg',
    badge: '12 Rosas',
    status: 'published',
  },
  // 29. Nova fotografia real incorporada após auditoria anti-duplicatas
  {
    id: 'ab-buque-girassois-kraft',
    name: 'Buquê de Girassóis com Gypsofila no Kraft',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'girassois',
    formattedPrice: 'Preço a consultar',
    shortDescription: 'Girassóis abertos com gypsofila e folhagens verdes em papel kraft com laço marrom.',
    fullDescription: 'Arranjo com girassóis abertos, gypsofila branca, solidago e folhagens verdes em dupla camada de papel kraft e marrom com laço de cetim.',
    components: 'Girassóis, gypsofila branca, solidago, folhagens verdes, papel kraft e fita marrom.',
    image: '/assets/aistudio/7fe22269-7033-4e31-831c-0b7b0f93dace_3c24cbfa.jpeg',
    badge: 'Girassóis',
    status: 'published',
  },
  // 30. Nova fotografia real incorporada após auditoria anti-duplicatas
  {
    id: 'ab-buque-lirios-rosa-lilas',
    name: 'Buquê de Lírios Cor-de-Rosa com Gypsofila',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'buques',
    subCategory: 'lirios',
    formattedPrice: 'Preço a consultar',
    shortDescription: 'Lírios cor-de-rosa com gypsofila, solidago e eucalipto em embalagem lilás e kraft.',
    fullDescription: 'Buquê de lírios orientais cor-de-rosa combinados com gypsofila branca, solidago amarelo e folhas de eucalipto em papel kraft estampado e lilás com laço acetinado.',
    components: 'Lírios cor-de-rosa, gypsofila branca, solidago, eucalipto, papel kraft e lilás.',
    image: '/assets/aistudio/fab16014-3931-4c74-959e-5866d4ac0a8a_0d746398.jpeg',
    badge: 'Lírios',
    status: 'published',
  },
  // 31. Nova fotografia real incorporada após auditoria anti-duplicatas
  {
    id: 'ab-flowers-box-sacola-alstroemerias',
    name: 'Flowers Box Sacola Verde com Alstroemérias',
    category: 'buques-boxes',
    categoryLabel: 'Buquês & Box Florais',
    catalogCategory: 'boxes-florais',
    subCategory: 'boxes-cones',
    formattedPrice: 'Preço a consultar',
    shortDescription: 'Caixa sacola verde com buquê de alstroemérias rosadas e amarelas, crisântemos brancos e áster lilás.',
    fullDescription: 'Composição presenteável em caixa bolsa verde com visor, acomodando alstroemérias cor-de-rosa e amarelas, crisântemos, áster lilás e laço verde oliva.',
    components: 'Alstroemérias, crisântemos brancos, áster lilás, papel editorial "I LOVE YOU" e caixa bolsa verde.',
    image: '/assets/aistudio/c04eee27-bb7d-49dc-8a4f-52c3a278af9b_eece6494.jpeg',
    badge: 'Box Floral',
    status: 'published',
  },
];

/**
 * Portfolio/Gallery items (preserva integralmente os registros cadastrados e inclui novas fotografias reais enviadas).
 * Strictly differentiated from Catalog products: focuses on the storefront,
 * artist portraits, atelier exhibitions, and brand experience.
 */
export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
  objectPosition?: string;
  imageFit?: 'cover' | 'contain';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-fachada',
    title: 'Fachada Oficial AB Flores & Decoração',
    category: 'Estúdio & Loja Física',
    image: '/assets/aistudio/bb536c2f-00f4-49d5-8a8b-52d9be3909d4_bc3015c1.jpeg',
    caption: 'Loja e estúdio floral em Fortaleza com iluminação aconchegante, atendimento presencial e delivery.',
    objectPosition: 'object-center',
  },
  {
    id: 'gal-criacao-arley',
    title: 'Arley Borges no Processo Criativo',
    category: 'Atelier de Arte Floral',
    image: '/assets/aistudio/6595ed8b-0d53-4ad1-b270-941d6a9bec97_248d25e5.jpeg',
    caption: 'Montagem artesanal de composição com rosas vermelhas, antúrios e musgo vivo na bancada do ateliê.',
    objectPosition: 'object-[center_12%]',
  },
  {
    id: 'gal-editorial-2026',
    title: 'Editorial Arte Floral 2026 — Arley Borges',
    category: 'Edição Especial',
    image: '/assets/aistudio/d2d2978f-efcb-446c-b1ec-7d4d6a5036e5_c5ed00ea.jpeg',
    caption: 'Registro fotográfico oficial comemorativo: o artista visual que transforma botânica em experiências de afeto.',
    imageFit: 'contain',
  },
  {
    id: 'gal-vitrine-cones',
    title: 'Vitrine Interna & Cones Kraft com Girassol',
    category: 'Composição do Atelier',
    image: '/assets/aistudio/07d3c73c-1ad0-48f5-87b4-f7f94313984b_facc9c4e.jpeg',
    caption: 'Exposição de arranjos em cones kraft, plantas ornamentais e o selo institucional AB Flores.',
    objectPosition: 'object-center',
  },
  {
    id: 'gal-arley-ouro',
    title: 'Criação Festiva com Vaso Dourado & Rosas',
    category: 'Design Floral Autoral',
    image: '/assets/aistudio/cbca0b0c-a188-40ac-84a1-b3ac8e074951_5a345992.jpeg',
    caption: 'Arranjo comemorativo com rosas vermelhas selecionadas, antúrios verdes e fita personalizada no ateliê.',
    objectPosition: 'object-[center_12%]',
  },
  {
    id: 'gal-painel-celebrar',
    title: 'Painel Institucional — Celebrar Cada Momento',
    category: 'Portfólio AB Flores',
    image: '/assets/aistudio/f401c83c-1e28-467b-af9b-7f9e1dd0461b_8dbf9d2f.jpeg',
    caption: 'Coleção de buquês, boxes e cones autorais que marcam os momentos inesquecíveis da vida.',
    imageFit: 'contain',
  },
  {
    id: 'gal-colecao-presentes',
    title: 'Cenografia de Boxes, Pelúcias & Chocolates Finos',
    category: 'Experiência do Presente',
    image: '/assets/aistudio/653c93c4-e6a1-4941-bf12-f1d42eba4a4b_c9759860.jpeg',
    caption: 'Composição com caixas circulares brancas, pelúcias nobres, espumante e laços oficiais Arley Borges.',
    objectPosition: 'object-center',
  },
  {
    id: 'gal-identidade-oficial',
    title: 'Identidade Visual & Atendimento Oficial',
    category: 'Marca & Atendimento',
    image: '/assets/aistudio/5e48602f-5d94-44bb-a48a-db1fa5d33510_1d590b17.jpeg',
    caption: 'Identidade visual homologada: paleta verde oliva institucional, Instagram @abfloress e WhatsApp (85) 99239-5959.',
    imageFit: 'contain',
  },
  {
    id: 'gal-lirios-laranja-atelier',
    title: 'Composição com Lírios Alaranjados em Vaso Translúcido',
    category: 'Design Floral Autoral',
    image: '/assets/aistudio/IMG_9128_85e0dc3d.jpeg',
    caption: 'Arley Borges finalizando arranjo contemporâneo com lírios laranja no estúdio.',
    objectPosition: 'object-[center_12%]',
  },
  {
    id: 'gal-montagem-bancada-cobre',
    title: 'Bastidores de Criação com Rosas & Cobre',
    category: 'Atelier de Arte Floral',
    image: '/assets/aistudio/IMG_9129_c6ba38c8.jpeg',
    caption: 'Arley Borges compondo arranjo autoral com rosas vermelhas e folhagens em recipiente de cobre.',
    objectPosition: 'object-[center_12%]',
  },
  {
    id: 'gal-na-paleta-girassol',
    title: 'Na Paleta da Cor — Girassóis & Orquídeas',
    category: 'Atelier de Arte Floral',
    image: '/assets/aistudio/3f09b5c6-d45d-4e79-8291-38be8ca3801d_9ed4a273.jpeg',
    caption: 'Arley Borges com composição solar de girassóis e orquídeas no ateliê AB Flores & Decoração.',
    objectPosition: 'object-[center_36%]',
  },
  {
    id: 'gal-flores-que-encantam',
    title: 'AB Flores — Flores que Encantam, Detalhes que Permanecem',
    category: 'Experiência do Presente',
    image: '/assets/aistudio/IMG_9134_ecaeab7d.jpeg',
    caption: 'Arley Borges com box rosé e arranjo autoral de rosas e lírios — arte, beleza e emoção.',
    imageFit: 'contain',
  },
];

/**
 * Validation helper: ensures no duplicate image paths across products
 */
export function validateNoDuplicateImages(products: Product[]): boolean {
  const images = new Set<string>();
  for (const p of products) {
    if (images.has(p.image)) {
      console.warn(`[Audit] Duplicate image detected for product ${p.id}: ${p.image}`);
      return false;
    }
    images.add(p.image);
  }
  return true;
}

