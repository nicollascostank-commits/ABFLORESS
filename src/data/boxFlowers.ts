import { getWhatsAppUrl } from '../utils/whatsapp';
import type { Product } from './products';

export type BoxFlowersSubCategory =
  | 'todos'
  | 'rosas'
  | 'chocolates'
  | 'ursos'
  | 'vinho'
  | 'devocional'
  | 'orquideas-lirios-tropicais'
  | 'girassois'
  | 'especiais';

export const BOX_FLOWERS_SUBCATEGORIES: Array<{ id: BoxFlowersSubCategory; label: string }> = [
  { id: 'todos', label: 'Todos' },
  { id: 'rosas', label: 'Boxes com Rosas' },
  { id: 'chocolates', label: 'Com Chocolates' },
  { id: 'ursos', label: 'Com Ursos de Pelúcia' },
  { id: 'vinho', label: 'Com Vinho & Celebração' },
  { id: 'devocional', label: 'Linha Devocional' },
  { id: 'orquideas-lirios-tropicais', label: 'Orquídeas, Lírios & Tropicais' },
  { id: 'girassois', label: 'Boxes com Girassóis' },
  { id: 'especiais', label: 'Boxes Especiais' },
];

export interface BoxFlowerItem {
  id: string;
  name: string;
  category: 'box-flowers';
  categoryLabel: string;
  subCategory: Exclude<BoxFlowersSubCategory, 'todos'>;
  formattedPrice: string;
  badge?: string;
  shortDescription: string;
  fullDescription?: string;
  components?: string;
  image: string;
  whatsAppMessage: string;
  whatsAppUrl: string;
}

/**
 * Builds the official WhatsApp consultation URL for a Box Flowers item:
 * "Olá! Tenho interesse no produto [NOME DO PRODUTO] da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?"
 * WhatsApp oficial: (85) 99239-5959
 */
export function createBoxFlowerWhatsAppUrl(productName: string): string {
  const message = `Olá! Tenho interesse no produto ${productName} da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?`;
  return getWhatsAppUrl(message);
}

export const BOX_FLOWERS_ITEMS: BoxFlowerItem[] = [
  {
    id: 'box-flower-01',
    name: 'Box Elegância com Rosas Vermelhas e Gypsofila',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'rosas',
    formattedPrice: 'Preço a consultar',
    badge: 'Box Redondo',
    shortDescription:
      'Caixa redonda branca clássica com rosas vermelhas aveludadas, gypsofila fresca e laço dourado acetinado com selo do Ateliê AB Flores.',
    fullDescription:
      'Composição floral clássica em caixa rígida cilíndrica branca, finalizada com fita dourada e tag oficial AB Flores & Decoração.',
    components: 'Rosas vermelhas selecionadas, gypsofila fresca, folhagens verdes e fita dourada acetinada.',
    image: '/assets/aistudio/5967f475-f2dd-40e7-934f-90e7153e8062_8bac348c.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Elegância com Rosas Vermelhas e Gypsofila da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Elegância com Rosas Vermelhas e Gypsofila'),
  },
  {
    id: 'box-flower-02',
    name: 'Box Devocional com Imagem de Nossa Senhora',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'devocional',
    formattedPrice: 'Preço a consultar',
    badge: 'Linha Devocional',
    shortDescription:
      'Composição afetiva com imagem sacra de Nossa Senhora, alstroemérias salmão delicadas, gypsofila e acabamento em fita de cetim.',
    fullDescription:
      'Arranjo em caixa quadrada branca com detalhes de pedraria e laço salmão, abrigando imagem de Nossa Senhora entre alstroemérias e gypsofila.',
    components: 'Imagem de Nossa Senhora, alstroemérias salmão, gypsofila fresca, caixa artesanal e laço com brilho.',
    image: '/assets/aistudio/bbb12f4e-a84d-44ab-9915-2db5244b9ca5_dbb768f0.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Devocional com Imagem de Nossa Senhora da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Devocional com Imagem de Nossa Senhora'),
  },
  {
    id: 'box-flower-03',
    name: 'Sacola Box Vitrine com Imagem Sacra e Rosas Nobres',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'devocional',
    formattedPrice: 'Preço a consultar',
    badge: 'Box Vitrine',
    shortDescription:
      'Sacola box vitrine magenta com imagem de Nossa Senhora, rosas brancas nobres abertas, alstroemérias e folhagens de tuia.',
    fullDescription:
      'Apresentação em sacola rígida estruturada com janela panorâmica em tom vinho/magenta, destacando rosas brancas e imagem sacra.',
    components: 'Imagem de Nossa Senhora, rosas brancas nobres, alstroemérias brancas, gypsofila e tuia.',
    image: '/assets/aistudio/319b8920-a6d7-41e3-a3e6-43be2ba30c33_114d8a33.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Sacola Box Vitrine com Imagem Sacra e Rosas Nobres da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Sacola Box Vitrine com Imagem Sacra e Rosas Nobres'),
  },
  {
    id: 'box-flower-04',
    name: 'Box Kraft Presente com Mini Orquídea e Chocolates Ferrero Rocher',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'chocolates',
    formattedPrice: 'Preço a consultar',
    badge: 'Combo Presente',
    shortDescription:
      'Caixa kraft personalizada AB Flores com mini orquídea phalaenopsis lilás, caixa de bombons Ferrero Rocher e laço marsala.',
    fullDescription:
      'Presente refinado reunindo a durabilidade da mini orquídea viva, embalagem em tela rústica de juta, caixa de bombons finos e caixa kraft assinada.',
    components: 'Mini orquídea phalaenopsis lilás, caixa de bombons Ferrero Rocher, tela rústica e caixa kraft AB Flores.',
    image: '/assets/aistudio/b6186c39-408d-4836-96f5-070948557a7b_9d4ff2ec.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Kraft Presente com Mini Orquídea e Chocolates Ferrero Rocher da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Kraft Presente com Mini Orquídea e Chocolates Ferrero Rocher'),
  },
  {
    id: 'box-flower-06',
    name: 'Mostruário Ateliê — Caixas Box & Molduras para Presentear',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'especiais',
    formattedPrice: 'Preço a consultar',
    badge: 'Acervo Ateliê',
    shortDescription:
      'Apresentação no showroom do Ateliê AB Flores com as opções de caixas box estruturadas, porta-retratos artesanais e arranjos nobres.',
    fullDescription:
      'Ambiente expositor do ateliê com caixas de presente em madeira e papelaria fina, taças com flores desidratadas e molduras para fotos personalizadas.',
    components: 'Caixas box para presentes, porta-retratos decorativos, arranjos de rosas e ambientação exclusiva.',
    image: '/assets/aistudio/90239e34-f518-4358-a841-7e04927202df_0c4956ce.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Mostruário Ateliê — Caixas Box & Molduras para Presentear da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Mostruário Ateliê — Caixas Box & Molduras para Presentear'),
  },
  {
    id: 'box-flower-07',
    name: 'Box Flowers Pink Chic',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'rosas',
    formattedPrice: 'Preço a consultar',
    badge: 'Pink Chic',
    shortDescription:
      'Caixa quadrada pink vibrante com rosas fúcsia, mini rosas, alstroemérias e folhagens aromáticas de eucalipto.',
    fullDescription:
      'Composição romântica e marcante em tons de magenta e rosa, harmonizando gérberas, rosas colombianas, botões de mini rosa e folhas prateadas de eucalipto.',
    components: 'Rosas fúcsia, gérberas magenta, mini rosas, alstroemérias salpicadas e folhas de eucalipto.',
    image: '/assets/aistudio/f7744368-618d-48d9-af15-9787d1546ab3_743b556d.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Flowers Pink Chic da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Flowers Pink Chic'),
  },
  {
    id: 'box-flower-08',
    name: 'Box Luxo Ursinho de Pelúcia, Ferrero Rocher & Orquídea',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'ursos',
    formattedPrice: 'Preço a consultar',
    badge: 'Combo Luxo',
    shortDescription:
      'Hatbox rosé com urso de pelúcia felpudo, caixa de chocolates Ferrero Rocher, haste de orquídea amarela e buquês botânicos.',
    fullDescription:
      'Combo de presente completo e carinhoso em caixa redonda com fita marrom café, unindo pelúcia antialérgica, bombons finos e botânica selecionada.',
    components: 'Ursinho de pelúcia fofo, caixa Ferrero Rocher, haste de orquídea phalaenopsis amarela e mini buquês secos.',
    image: '/assets/aistudio/fd9a1b3b-1ab5-44d9-b682-6c9edd751dac_e657f9bb.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Luxo Ursinho de Pelúcia, Ferrero Rocher & Orquídea da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Luxo Ursinho de Pelúcia, Ferrero Rocher & Orquídea'),
  },
  {
    id: 'box-flower-09',
    name: 'Duo Box Ring Verde Sálvia com Alça de Corda',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'especiais',
    formattedPrice: 'Preço a consultar',
    badge: 'Design Botânico',
    shortDescription:
      'Caixas estruturadas formato anel vazado em tom verde sálvia com alça de corda para montagens florais contemporâneas.',
    fullDescription:
      'Design escultural circular perfeito para composições botânicas suspensas ou para compor decorações afetivas de presentes.',
    components: 'Caixas circulares em cartonagem premium verde sálvia com forro e cordão de suspensão.',
    image: '/assets/aistudio/736262c6-bcc8-4117-85b9-77409e89f7ee_83dba798.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Duo Box Ring Verde Sálvia com Alça de Corda da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Duo Box Ring Verde Sálvia com Alça de Corda'),
  },
  {
    id: 'box-flower-10',
    name: 'Box Hatbox Pastel Garden com Tulipas e Flores Nobres',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'rosas',
    formattedPrice: 'Preço a consultar',
    badge: 'Jardim Pastel',
    shortDescription:
      'Caixa redonda cinza com composição exuberante de rosas inglesas rosa, tulipas claras, gérberas e cravos bordô.',
    fullDescription:
      'Arranjo sofisticado em tons pastéis com flores imported style: tulipas suaves, rosas de jardim com abertura ondulada, cravos nobres e eucalipto.',
    components: 'Tulipas claras, rosas inglesas, gérberas pastel, cravos bordô, eucalipto e folhagens.',
    image: '/assets/aistudio/2b21e581-f110-4c03-8b95-5f76ae67d350_0c2d4f32.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Hatbox Pastel Garden com Tulipas e Flores Nobres da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Hatbox Pastel Garden com Tulipas e Flores Nobres'),
  },
  {
    id: 'box-flower-11',
    name: 'Box Trapézio Prata com Orquídeas Chuva de Ouro e Rosas',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'orquideas-lirios-tropicais',
    formattedPrice: 'Preço a consultar',
    badge: 'Trapézio Prata',
    shortDescription:
      'Caixa trapézio prateada com alça superior, orquídeas oncidium amarelas vibrantes, rosa branca nobre e gypsofila.',
    fullDescription:
      'Apresentação contemporânea em caixa envelope estruturada com orquídeas amarelas cascata, rosa branca aveludada e gypsofila.',
    components: 'Orquídeas oncidium chuva de ouro, rosa branca nobre, gypsofila e caixa trapézio prateada com fita.',
    image: '/assets/aistudio/6a3227c4-d9b3-4f19-bb71-fb88a548d7b3_bc2a8f70.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Trapézio Prata com Orquídeas Chuva de Ouro e Rosas da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Trapézio Prata com Orquídeas Chuva de Ouro e Rosas'),
  },
  {
    id: 'box-flower-13',
    name: 'Toque de Paixão — Box Coração com Chocolate e Rosas',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'chocolates',
    formattedPrice: 'Preço a consultar',
    badge: 'Romântico',
    shortDescription:
      'Caixa coração preta com rosas vermelhas premium, bombons Ferrero Rocher e fita de cetim bordô com laço nupcial.',
    fullDescription:
      'A expressão máxima do romance: metade preenchida com rosas vermelhas aveludadas e a outra metade com bombons Ferrero Rocher dourados, envoltos por laço acetinado bordô.',
    components: 'Rosas vermelhas aveludadas, bombons Ferrero Rocher em caixa rígida formato coração com fita acetinada.',
    image: '/assets/aistudio/d1a878f1-69f1-45c6-be69-65a9bfad74d7_c66d915d.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Toque de Paixão — Box Coração com Chocolate e Rosas da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Toque de Paixão — Box Coração com Chocolate e Rosas'),
  },
  {
    id: 'box-flower-14',
    name: 'Duo Box Trapézio Marsala Elegance',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'especiais',
    formattedPrice: 'Preço a consultar',
    badge: 'Design Trapézio',
    shortDescription:
      'Conjunto de caixas trapézio em tom marsala profundo com alças em fita de gorgurão para montagem de presentes botânicos nobres.',
    fullDescription:
      'Embalagens rígidas com formato afunilado e alças em fita marsala, projetadas para acolher arranjos verticais com presença cenográfica.',
    components: 'Caixas trapézio estruturadas em dois tamanhos com acabamento marsala e alças de tecido.',
    image: '/assets/aistudio/6aef957e-2f81-41ec-90c9-83bc75db535c_339125b5.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Duo Box Trapézio Marsala Elegance da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Duo Box Trapézio Marsala Elegance'),
  },
  {
    id: 'box-flower-15',
    name: 'Box Black Botânico Greenery com Dianthus e Hipérico',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'orquideas-lirios-tropicais',
    formattedPrice: 'Preço a consultar',
    badge: 'Verde Botânico',
    shortDescription:
      'Caixa redonda preta com folhagens nobres, dianthus green trick, ammi branco, bagas de hipérico e laço sálvia.',
    fullDescription:
      'Arranjo botânico com textura rica e tons verdes e brancos: pompons de dianthus verde vivo, flores de ammi, celosias e folhas de eucalipto em hatbox preto.',
    components: 'Dianthus green trick, ammi majus, hipérico pérola, eucalipto prateado e caixa hatbox preta.',
    image: '/assets/aistudio/475cf042-7b5a-4515-ba20-089fb9eacb68_54a4c4eb.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Black Botânico Greenery com Dianthus e Hipérico da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Black Botânico Greenery com Dianthus e Hipérico'),
  },
  {
    id: 'box-flower-16',
    name: 'Box Texturizado com Lírios Stargazer e Limonium',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'orquideas-lirios-tropicais',
    formattedPrice: 'Preço a consultar',
    badge: 'Lírios Nobres',
    shortDescription:
      'Caixa quadrada bege texturizada com lírios stargazer rosa abertos, limonium roxo e laço em fita verde oliva.',
    fullDescription:
      'Grandioso arranjo em caixa cúbica de tom areia com lírios cor-de-rosa perfumados, raminhos de limonium roxo e folhas selecionadas de eucalipto.',
    components: 'Lírios stargazer rosa, limonium roxo, eucalipto aromático e caixa texturizada com laço oliva.',
    image: '/assets/aistudio/99e9de32-4290-4ba5-b53b-aaf284a3e620_5dd3e945.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Texturizado com Lírios Stargazer e Limonium da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Texturizado com Lírios Stargazer e Limonium'),
  },
  {
    id: 'box-flower-17',
    name: 'Box Maria',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'devocional',
    formattedPrice: 'Preço a consultar',
    badge: 'Linha Devocional',
    shortDescription:
      'Criação autoral com imagem sacra de Nossa Senhora, terço de pérolas, rosas amarelas radiantes e crisântemos coloridos.',
    fullDescription:
      'Peça afetiva e devocional criada por Arley Borges com estátua de Nossa Senhora orante, terço delicado e um jardim circular de rosas amarelas e crisântemos.',
    components: 'Imagem de Nossa Senhora, terço de contas, rosas amarelas vivas, crisântemos coloridos e gypsofila.',
    image: '/assets/aistudio/8b21b4ff-99c6-404d-be89-cdfd4f52aeab_d5865221.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Maria da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Maria'),
  },
  {
    id: 'box-flower-18',
    name: 'Box Veludo Marsala com Rosas Vermelhas e Orquídeas',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'rosas',
    formattedPrice: 'Preço a consultar',
    badge: 'Veludo Nobre',
    shortDescription:
      'Caixa redonda aveludada em tom marsala com rosas vermelhas nobres, orquídeas amarelas oncidium e farta gypsofila.',
    fullDescription:
      'Caixa cilíndrica com toque de veludo marsala e alça em cordão trançado, com buquê denso de rosas vermelhas e chuviscos de orquídeas oncidium.',
    components: 'Rosas vermelhas, orquídeas oncidium chuva de ouro, gypsofila, tuia e caixa aveludada marsala.',
    image: '/assets/aistudio/232c7c97-c941-4519-ad65-67f6bf76fedc_a8bdc752.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Veludo Marsala com Rosas Vermelhas e Orquídeas da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Veludo Marsala com Rosas Vermelhas e Orquídeas'),
  },
  {
    id: 'box-flower-19',
    name: 'Box Especial Duplo Nível com Ferrero Rocher e Rosas',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'chocolates',
    formattedPrice: 'Preço a consultar',
    badge: 'Com Gaveta',
    shortDescription:
      'Caixa quadrada vermelha com andar superior de rosas vermelhas e alstroemérias e gaveta inferior com bombons Ferrero Rocher.',
    fullDescription:
      'Caixa presente vermelha com puxador metálico dourado na gaveta inferior que revela bombons Ferrero Rocher, coroada por rosas e alstroemérias vermelhas.',
    components: 'Rosas vermelhas, alstroemérias bordô, bombons Ferrero Rocher e tag Arley Borges em caixa com gaveta.',
    image: '/assets/aistudio/1d97b9a0-cdd7-40dc-9e31-af260e4d06eb_5f6ae30a.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Especial Duplo Nível com Ferrero Rocher e Rosas da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Especial Duplo Nível com Ferrero Rocher e Rosas'),
  },
  {
    id: 'box-flower-20',
    name: 'Box Magenta Luxo com Rosas e Chuva de Ouro',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'rosas',
    formattedPrice: 'Preço a consultar',
    badge: 'Magenta Luxo',
    shortDescription:
      'Caixa redonda magenta com laço de veludo dourado, rosas vermelhas, orquídeas amarelas e folhagens de tuia.',
    fullDescription:
      'Elegante caixa cilíndrica fúcsia com cordão lateral, adornada por laço com brilho dourado e arranjo de rosas vermelhas contrastando com orquídeas amarelas.',
    components: 'Rosas vermelhas, orquídeas oncidium, gypsofila, tuia e fita aveludada em hatbox magenta.',
    image: '/assets/aistudio/fbe7b56a-214b-4585-818b-1ba9637dc458_5e52a38d.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Magenta Luxo com Rosas e Chuva de Ouro da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Magenta Luxo com Rosas e Chuva de Ouro'),
  },
  {
    id: 'box-flower-21',
    name: 'Box Lavanda com Girassóis Radiantes',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'girassois',
    formattedPrice: 'Preço a consultar',
    badge: 'Girassóis',
    shortDescription:
      'Caixa redonda em tom lilás/lavanda com girassóis solares, nuvem de gypsofila e laço de cetim azul celeste.',
    fullDescription:
      'A alegria contagiante dos girassóis solares envolvidos em gypsofila fina, apresentados em hatbox lavanda com laço de cetim azul claro.',
    components: 'Girassóis nobres, gypsofila abundante, eucalipto, cartão AB Flores e laço azul em caixa lilás.',
    image: '/assets/aistudio/90bfebf5-2808-485a-b5af-beeff728dcc2_4be557ab.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Lavanda com Girassóis Radiantes da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Lavanda com Girassóis Radiantes'),
  },
  {
    id: 'box-flower-22',
    name: 'Box Flowers Elegance com Gaveta de Bombons',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'chocolates',
    formattedPrice: 'Preço a consultar',
    badge: 'Elegance',
    shortDescription:
      'Caixa vermelha com gaveta frontal de bombons Ferrero Rocher e topo repleto de rosas vermelhas, gloriosas e gypsofila.',
    fullDescription:
      'Fotografia do produto real com gaveta aberta destacando 8 bombons finos Ferrero Rocher e farto topo floral de rosas colombianas e gloriosas.',
    components: 'Rosas vermelhas, gloriosas tropicais, gypsofila, 8 bombons Ferrero Rocher e fita Arley Borges.',
    image: '/assets/aistudio/1ab72be7-d08e-4d36-933a-638a1e969fcb_efc0f370.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Flowers Elegance com Gaveta de Bombons da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Flowers Elegance com Gaveta de Bombons'),
  },
  {
    id: 'box-flower-23',
    name: 'Box Rosé Nossa Senhora de Fátima Prateada',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'devocional',
    formattedPrice: 'Preço a consultar',
    badge: 'Linha Devocional',
    shortDescription:
      'Hatbox rosé com imagem prateada de Nossa Senhora de Fátima, coroa de rosas brancas e cor-de-rosa e laço marrom café.',
    fullDescription:
      'A beleza e reverência da estátua prateada com coroa de Nossa Senhora de Fátima erguida sobre hatbox rosa claro com rosas champanhe, blush e gypsofila.',
    components: 'Imagem de Nossa Senhora de Fátima em acabamento prateado, mini rosas, rosas nobres e gypsofila.',
    image: '/assets/aistudio/824b16a5-a2c4-478b-86f5-c18767f2a414_bbc47041.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Rosé Nossa Senhora de Fátima Prateada da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Rosé Nossa Senhora de Fátima Prateada'),
  },
  {
    id: 'box-flower-24',
    name: 'Box Retangular Pérola com Lírios e Flores Tropicais',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'orquideas-lirios-tropicais',
    formattedPrice: 'Preço a consultar',
    badge: 'Mix Tropical',
    shortDescription:
      'Caixa retangular perolada com laço de cetim marfim, lírios stargazer rosa, rosa vermelha, antúrio verde e helicônia.',
    fullDescription:
      'Arranjo em caixa retangular com lírios perfumados abertos, antúrio verde vivo, rosa vermelha aveludada e helicônia amarela.',
    components: 'Lírios stargazer, antúrio verde, rosa vermelha, helicônia/sorvetão e folhagens exóticas.',
    image: '/assets/aistudio/a4bb03e0-bba1-4bce-9bf7-7cb6d8da48f0_e8a60785.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Retangular Pérola com Lírios e Flores Tropicais da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Retangular Pérola com Lírios e Flores Tropicais'),
  },
  {
    id: 'box-flower-25',
    name: 'Box Celebração — Vinho Cordillera Andina, Taças e Flores',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'vinho',
    formattedPrice: 'Preço a consultar',
    badge: 'Combo Celebração',
    shortDescription:
      'Caixa presente prata acetinada com garrafa de vinho Cordillera Andina, par de taças de cristal com ráfia e arranjo floral nobre.',
    fullDescription:
      'O presente ideal para comemorações a dois: vinho chileno selecionado, taças de cristal com detalhe rústico de ráfia e buquê de lírios e antúrios em caixa decorada.',
    components: 'Garrafa de vinho Cordillera Andina, duas taças de vinho, lírios stargazer, antúrios vermelhos e alstroemérias.',
    image: '/assets/aistudio/f5887e4f-6005-4b40-a44a-174c64e534e6_dc02ee18.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Celebração — Vinho Cordillera Andina, Taças e Flores da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Celebração — Vinho Cordillera Andina, Taças e Flores'),
  },
  {
    id: 'box-flower-26',
    name: 'Box Tiffany com Antúrio e Flores Nobres',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'orquideas-lirios-tropicais',
    formattedPrice: 'Preço a consultar',
    badge: 'Tiffany Chic',
    shortDescription:
      'Caixa quadrada azul tiffany com fita verde esmeralda, antúrio vermelho escultórico, gloriosas e folhagens.',
    fullDescription:
      'Contraste elegante entre o azul tiffany da caixa e os tons quentes de antúrio vermelho, gloriosas e solidago com laço esmeralda.',
    components: 'Antúrio vermelho, gloriosas exóticas, solidago amarelo, statice roxo e laço verde esmeralda.',
    image: '/assets/aistudio/6f1e97e8-327f-4164-9fc7-79ba95c9d0b3_012bb4b8.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Tiffany com Antúrio e Flores Nobres da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Tiffany com Antúrio e Flores Nobres'),
  },
  {
    id: 'box-flower-27',
    name: 'Box Tropical Chic com Orquídea Tigre e Frutas',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'orquideas-lirios-tropicais',
    formattedPrice: 'Preço a consultar',
    badge: 'Exótico & Frutas',
    shortDescription:
      'Caixa texturizada prata com orquídeas tigre (Arachnis), gloriosas, antúrio exótico, frutas nobres e eucalipto.',
    fullDescription:
      'Arranjo botânico autoral misturando orquídeas com padrão rajado tipo tigre, flores exóticas de gloriosa e frutas ornamentais em caixa de acabamento rústico chic.',
    components: 'Orquídea tigre, gloriosas, antúrios, frutas frescas nobres e folhagens tropicais.',
    image: '/assets/aistudio/4aab545f-c563-4f3a-aacf-1b21888f4936_858455d2.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Tropical Chic com Orquídea Tigre e Frutas da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Tropical Chic com Orquídea Tigre e Frutas'),
  },
  {
    id: 'box-flower-28',
    name: 'Box Maleta Rosa com Laço de Cetim e Mix Floral',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'rosas',
    formattedPrice: 'Preço a consultar',
    badge: 'Maleta Presente',
    shortDescription:
      'Caixa formato maleta em tom rosa suave com laço marfim, antúrio vermelho, rosas aveludadas, lírios e alstroemérias.',
    fullDescription:
      'Design em formato maleta com alça e tampa dobrável, criando um arranjo exuberante com antúrio vermelho, rosas, lírios e tag Arley Borges.',
    components: 'Antúrio vermelho, rosas vermelhas nobres, lírios rosa claro, alstroemérias e tag Arley Borges.',
    image: '/assets/aistudio/6a580c8a-cb5e-4a96-a389-70e6fe8cbdf2_6cabf786.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Maleta Rosa com Laço de Cetim e Mix Floral da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Maleta Rosa com Laço de Cetim e Mix Floral'),
  },
  {
    id: 'box-flower-30',
    name: 'Box Coração de Rosas Vermelhas e Ferrero Rocher',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'chocolates',
    formattedPrice: 'Preço a consultar',
    badge: 'Coração de Rosas',
    shortDescription:
      'Caixa em formato de coração com rosas vermelhas selecionadas e seleção de bombons Ferrero Rocher com laço Arley Borges.',
    fullDescription:
      'Design em formato de coração em caixa rígida preta, laço acetinado com fita personalizada do ateliê e combinação de rosas e bombons finos.',
    components: 'Rosas vermelhas aveludadas, bombons Ferrero Rocher, fita de cetim bordô personalizada e caixa coração preta.',
    image: '/assets/aistudio/97a69969-405c-4127-9ba8-0434cb4d06a0_8cbd3478.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Coração de Rosas Vermelhas e Ferrero Rocher da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Coração de Rosas Vermelhas e Ferrero Rocher'),
  },
  {
    id: 'box-flower-31',
    name: 'Box Imperial Red com Rosas, Orquídeas e Pingente Coração',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'rosas',
    formattedPrice: 'Preço a consultar',
    badge: 'Imperial Red',
    shortDescription:
      'Hatbox vermelho nobre com alça de cordão, rosas vermelhas premium, orquídeas oncidium, eucalipto e pingente dourado coração.',
    fullDescription:
      'Apresentação suntuosa em caixa redonda vermelha escarlate, laço dourado acetinado com pingente em coração e profusão de rosas vermelhas e orquídeas.',
    components: 'Rosas vermelhas selecionadas, orquídeas oncidium, gypsofila, tuia, eucalipto e laço dourado com pingente.',
    image: '/assets/aistudio/9fdfd233-3e48-4074-a43b-e11cc442a132_5d82e4c3.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Imperial Red com Rosas, Orquídeas e Pingente Coração da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Imperial Red com Rosas, Orquídeas e Pingente Coração'),
  },
  {
    id: 'box-flower-32',
    name: 'Box com Astromélias e Gaveta de Ferrero Rocher',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'chocolates',
    formattedPrice: 'Preço a consultar',
    badge: 'Astromélias',
    shortDescription:
      'Caixa preta com laço fita cinza, fartas astromélias cor-de-rosa/fúcsia, eucalipto e gaveta com 8 bombons Ferrero Rocher.',
    fullDescription:
      'Fotografia de produto autêntico mostrando a gaveta aberta de bombons Ferrero Rocher, topo farto de astromélias cor fúcsia e tag Arley Borges.',
    components: 'Astromélias fúcsia, folhas de eucalipto, gaveta de 8 bombons Ferrero Rocher e tag Arley Borges.',
    image: '/assets/aistudio/b8f3ee8f-5fa0-419a-9671-99426945a91f_c4381093.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box com Astromélias e Gaveta de Ferrero Rocher da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box com Astromélias e Gaveta de Ferrero Rocher'),
  },
  {
    id: 'box-flower-33',
    name: 'Box com Astromélias — Encarte Editorial',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'chocolates',
    formattedPrice: 'Preço a consultar',
    badge: 'Card Editorial',
    shortDescription:
      'Card editorial oficial com a composição do Box com Astromélias: rosas vermelhas premium, folhagens verdes nobres e chocolates.',
    fullDescription:
      'Encarte institucional com ficha descritiva da Box com Astromélias, indicado especialmente para românticos tradicionais.',
    components: 'Encarte oficial AB Flores — Ideal para românticos tradicionais.',
    image: '/assets/aistudio/c1f3b6e7-e296-46e4-b454-3a0cbb68e5c1_cf900dbd.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box com Astromélias — Encarte Editorial da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box com Astromélias — Encarte Editorial'),
  },
  {
    id: 'box-flower-34',
    name: 'Toque de Paixão — Box Coração (Encarte Editorial)',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'chocolates',
    formattedPrice: 'Preço a consultar',
    badge: 'Card Editorial',
    shortDescription:
      'Card editorial oficial da criação Toque de Paixão: box coração com chocolate Ferrero Rocher e rosas vermelhas.',
    fullDescription:
      'Encarte institucional oficial com o arranjo Toque de Paixão — Box coração com chocolate e rosas, ideal para amores delicados e elegantes.',
    components: 'Encarte oficial AB Flores — Ideal para amores delicados e elegantes.',
    image: '/assets/aistudio/86d72d9c-7917-4072-ad3c-481bcf9400e7_a355973e.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Toque de Paixão — Box Coração (Encarte Editorial) da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Toque de Paixão — Box Coração (Encarte Editorial)'),
  },
  {
    id: 'box-flower-35',
    name: 'Box Jardim Imperial com Rosas e Lisianthus',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'rosas',
    formattedPrice: 'Preço a consultar',
    badge: 'Jardim Imperial',
    shortDescription:
      'Caixa redonda com opulente mix de rosas fúcsia, lisianthus rosa, boca de leão e folhagens aromáticas de tuia.',
    fullDescription:
      'Composição vista de cima revelando a densidade de flores nobres: rosas vermelhas e fúcsia, lisianthus, boca de leão bordô e ramalhetes de tuia.',
    components: 'Rosas fúcsia e rosa claro, lisianthus, boca de leão bordô, tuia e cartão de presente.',
    image: '/assets/aistudio/335401fb-3b8b-466c-a008-78537ac5ca4e_480e5be8.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Jardim Imperial com Rosas e Lisianthus da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Jardim Imperial com Rosas e Lisianthus'),
  },
  {
    id: 'box-flower-36',
    name: 'Coleção Coração em Flores',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'ursos',
    formattedPrice: 'Preço a consultar',
    badge: 'Com Pelúcia',
    shortDescription:
      'Sacola box kraft com rosas vermelhas nobres, ursinho de pelúcia segurando coração vermelho, gypsofila e Ferrero Rocher.',
    fullDescription:
      'Criação oficial da Coleção Coração em Flores: sacola box kraft com laço de cetim bordô, urso carinhoso com coração em veludo, rosas e chocolates.',
    components: 'Rosas vermelhas, urso de pelúcia com coração, bombons Ferrero Rocher, gypsofila e laço bordô.',
    image: '/assets/aistudio/43b40a49-db7d-4878-8f9a-cb05c7ee7b70_246297cb.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Coleção Coração em Flores da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Coleção Coração em Flores'),
  },
  {
    id: 'box-flower-37',
    name: 'Box Feito com Amor — Pelúcia, Rosas e Ferrero Rocher',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'ursos',
    formattedPrice: 'Preço a consultar',
    badge: 'Feito com Amor',
    shortDescription:
      'Caixa redonda pérola sobre base rosa com urso de pelúcia branco, rosas vermelhas, bombons Ferrero Rocher e tag Feito com Amor.',
    fullDescription:
      'Arranjo em duplo hatbox cilíndrico com urso de pelúcia branco com laço xadrez, rosas vermelhas, bombons Ferrero Rocher e folhagens.',
    components: 'Ursinho de pelúcia branco, rosas vermelhas, Ferrero Rocher, tuia e fita marrom café.',
    image: '/assets/aistudio/ddeb1465-46c0-4806-b95a-c928dfb0ef94_ad0ff25e.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Feito com Amor — Pelúcia, Rosas e Ferrero Rocher da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Feito com Amor — Pelúcia, Rosas e Ferrero Rocher'),
  },
  {
    id: 'box-flower-38',
    name: 'Box Nobreza — Orquídeas e Pequenas Etéreas',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'orquideas-lirios-tropicais',
    formattedPrice: 'Preço a consultar',
    badge: 'Nobreza',
    shortDescription:
      'Card oficial da Box Nobreza: hatbox rosa bebê com orquídeas phalaenopsis nobres, lírios rosados e nuvem de gypsofila.',
    fullDescription:
      'Encarte fotográfico oficial do arranjo Box Nobreza — orquídeas e pequenas etéreas, montado em caixa redonda rosa bebê com fita marrom café.',
    components: 'Orquídeas phalaenopsis rosas, lírios rosa, mini rosas, gypsofila e fita de cetim café.',
    image: '/assets/aistudio/36ed602e-93d6-4976-9e6a-c7c5b7d7c70b_c28ea6b0.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Nobreza — Orquídeas e Pequenas Etéreas da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Nobreza — Orquídeas e Pequenas Etéreas'),
  },
  {
    id: 'box-flower-39',
    name: 'Paixão Imperial',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'ursos',
    formattedPrice: 'Preço a consultar',
    badge: 'Paixão Imperial',
    shortDescription:
      'Caixa vitrine alta branca com buquê de rosas vermelhas e gypsofila, caixa de bombons Ferrero Rocher e urso de pelúcia com gravata.',
    fullDescription:
      'Criação oficial Paixão Imperial apresentada em sacola box branca com alças superiores, abrigando farto buquê de rosas vermelhas, chocolates e pelúcia.',
    components: 'Buquê de rosas vermelhas e gypsofila, urso de pelúcia marrom, bombons Ferrero Rocher e sacola box vitrine.',
    image: '/assets/aistudio/ff93e7db-86bc-48d3-9aae-4c09be9d9acb_0977ad33.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Paixão Imperial da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Paixão Imperial'),
  },
  {
    id: 'box-flower-40',
    name: 'Box Elegância — Rosas Vermelhas',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'rosas',
    formattedPrice: 'Preço a consultar',
    badge: 'Box Elegância',
    shortDescription:
      'Hatbox cilíndrico marfim com fita e laço marsala, rosas vermelhas aveludadas e detalhes botânicos de celosia crista de galo.',
    fullDescription:
      'Encarte oficial da criação Box Elegância: rosas vermelhas de alta abertura coroadas por celosias vermelhas em hatbox clássico marfim.',
    components: 'Rosas vermelhas selecionadas, celosia crista de galo vermelha e caixa cilíndrica marfim.',
    image: '/assets/aistudio/55ddbaa2-fc65-4f2e-92f8-78aa051662e8_cfbd8397.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Elegância — Rosas Vermelhas da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Elegância — Rosas Vermelhas'),
  },
  {
    id: 'box-flower-42',
    name: 'Sacola Box Orquídea Phalaenopsis & Ursinho com Gravata',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'ursos',
    formattedPrice: 'Preço a consultar',
    badge: 'Orquídea & Pelúcia',
    shortDescription:
      'Sacola box verde musgo com planta de orquídea phalaenopsis lilás florindo, ursinho de pelúcia com gravata borboleta e laço em cetim oliva.',
    fullDescription:
      'Fotografia no Ateliê AB Flores exibindo sacola box verde oliva personalizada com orquídea viva em plena floração, ursinho de pelúcia de gravata e tag.',
    components: 'Orquídea phalaenopsis lilás em haste floral, ursinho de pelúcia com gravata de poá e sacola box com tag AB Flores.',
    image: '/assets/aistudio/f43c4006-8146-48f6-a121-89197a55141d_06e92896.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Sacola Box Orquídea Phalaenopsis & Ursinho com Gravata da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Sacola Box Orquídea Phalaenopsis & Ursinho com Gravata'),
  },
  {
    id: 'box-flower-43',
    name: 'Box Retrô Redondo Personalizado com Orquídeas e Antúrios',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'especiais',
    formattedPrice: 'Preço a consultar',
    badge: 'Personalizado',
    shortDescription:
      'Box anel vazado branco com alça em cordão: "Você escolhe as flores e nós montamos o seu arranjo personalizado! Feito com carinho".',
    fullDescription:
      'Opção personalizada onde o cliente escolhe as flores e o ateliê monta o arranjo exclusivo na caixa retrô vazada redonda.',
    components: 'Antúrios vermelhos brilhantes, orquídeas phalaenopsis rajadas, rosas chá, gérberas e fita Arley Borges.',
    image: '/assets/aistudio/206d6417-944d-4402-8839-ada1631d93bf_f22ca04a.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Retrô Redondo Personalizado com Orquídeas e Antúrios da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Retrô Redondo Personalizado com Orquídeas e Antúrios'),
  },
  {
    id: 'box-flower-44',
    name: 'Box Kraft com Lírios Brancos e Boca de Leão',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'orquideas-lirios-tropicais',
    formattedPrice: 'Preço a consultar',
    badge: 'Kraft Nobre',
    shortDescription:
      'Caixa retangular kraft com logotipo AB Flores, lírios brancos perfumados, boca de leão roxa e gypsofila delicada.',
    fullDescription:
      'Arranjo em caixa kraft ecológica carimbada com a marca oficial AB Flores, trazendo lírios brancos frescos em botão e abertura, boca de leão e folhagens.',
    components: 'Lírios brancos nobres, boca de leão roxa, gypsofila, folhagens de avenca e caixa kraft AB Flores.',
    image: '/assets/aistudio/3fd08ec8-1842-44d0-8bd0-b0d39d1b4821_bd255819.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Kraft com Lírios Brancos e Boca de Leão da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Kraft com Lírios Brancos e Boca de Leão'),
  },
  {
    id: 'box-flower-45',
    name: 'Box Flores, Vinho & Chocolates — Um Presente Incrível',
    category: 'box-flowers',
    categoryLabel: 'Box Flowers para Presentes',
    subCategory: 'vinho',
    formattedPrice: 'Preço a consultar',
    badge: 'Flores, Vinho & Bombons',
    shortDescription:
      'Caixa presente em papelão kraft com alstroemérias alaranjadas em vaso de vidro, garrafa de vinho, caixa de Ferrero Rocher e cartão afetuoso.',
    fullDescription:
      'Um presente incrível reunindo flores vivas em vaso de vidro para durar na casa, garrafa de vinho com laço verde e caixa de bombons Ferrero Rocher.',
    components: 'Vaso de vidro com alstroemérias bicolores, garrafa de vinho, caixa de Ferrero Rocher e cartão com tag AB Flores.',
    image: '/assets/aistudio/799e02ae-3d73-4766-89f3-5c39a79a0449_ad8c95ff.jpeg',
    whatsAppMessage:
      'Olá! Tenho interesse no produto Box Flores, Vinho & Chocolates — Um Presente Incrível da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?',
    whatsAppUrl: createBoxFlowerWhatsAppUrl('Box Flores, Vinho & Chocolates — Um Presente Incrível'),
  },
];

export function boxFlowerToProduct(item: BoxFlowerItem): Product {
  return {
    id: item.id,
    name: item.name,
    category: 'box-flowers',
    categoryLabel: item.categoryLabel,
    catalogCategory: 'box-flowers',
    subCategory: item.subCategory,
    formattedPrice: item.formattedPrice,
    shortDescription: item.shortDescription,
    fullDescription: item.fullDescription,
    components: item.components,
    image: item.image,
    badge: item.badge,
    whatsAppUrl: item.whatsAppUrl,
    status: 'published',
  };
}

export const BOX_FLOWERS_PRODUCTS: Product[] = BOX_FLOWERS_ITEMS.map(boxFlowerToProduct);

