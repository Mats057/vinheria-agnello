export interface Wine {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  region: string;
  grape: string;
  year: number;
  type: 'tinto' | 'branco' | 'rosé' | 'espumante';
  sweetness: 'seco' | 'meio-seco' | 'suave' | 'doce';
  body: 'leve' | 'médio' | 'encorpado';
  agingPotential: string;
  description: string;
  technicalSheet: {
    alcohol: string;
    temperature: string;
    pairings: string[];
  };
  reviews: Review[];
  color: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const wines: Wine[] = [
  {
    id: 'reserva-tinto-cabernet-sauvignon',
    name: 'Reserva Tinto Cabernet Sauvignon',
    price: 120.0,
    image: 'red-wine-bottle',
    rating: 4.5,
    region: 'Vale dos Vinhedos, RS',
    grape: 'Cabernet Sauvignon',
    year: 2020,
    type: 'tinto',
    sweetness: 'seco',
    body: 'encorpado',
    agingPotential: '5-10 anos',
    color: '#8B0000',
    description:
      'Um vinho elegante e complexo, com notas de frutas vermelhas maduras, especiarias e um toque de carvalho. Taninos macios e final persistente.',
    technicalSheet: {
      alcohol: '13,5%',
      temperature: '16-18°C',
      pairings: ['Carnes vermelhas', 'Massas', 'Queijos maturados'],
    },
    reviews: [
      {
        id: 'r1',
        author: 'Marina Silva',
        rating: 5,
        comment: 'Excelente vinho! Perfeito para um jantar especial.',
        date: '2026-02-15',
      },
      {
        id: 'r2',
        author: 'Roberto Santos',
        rating: 4,
        comment: 'Muito bom, bem estruturado. Recomendo.',
        date: '2026-02-20',
      },
    ],
  },
  {
    id: 'chardonnay-premium',
    name: 'Chardonnay Premium',
    price: 95.0,
    image: 'white-wine-bottle',
    rating: 4.3,
    region: 'Serra Gaúcha, RS',
    grape: 'Chardonnay',
    year: 2022,
    type: 'branco',
    sweetness: 'seco',
    body: 'médio',
    agingPotential: '2-4 anos',
    color: '#FFD700',
    description:
      'Vinho branco fresco e aromático, com notas cítricas, frutas tropicais e um toque de baunilha. Ideal para harmonizar com peixes e frutos do mar.',
    technicalSheet: {
      alcohol: '12,5%',
      temperature: '8-10°C',
      pairings: ['Peixes', 'Frutos do mar', 'Aves'],
    },
    reviews: [
      {
        id: 'r3',
        author: 'Juliana Costa',
        rating: 4,
        comment: 'Refrescante e saboroso!',
        date: '2026-03-01',
      },
    ],
  },
  {
    id: 'merlot-reserva-especial',
    name: 'Merlot Reserva Especial',
    price: 145.0,
    image: 'red-wine-bottle',
    rating: 4.7,
    region: 'Campanha Gaúcha, RS',
    grape: 'Merlot',
    year: 2019,
    type: 'tinto',
    sweetness: 'seco',
    body: 'encorpado',
    agingPotential: '7-12 anos',
    color: '#8B0000',
    description:
      'Vinho tinto elegante com aromas de ameixa, cereja e chocolate. Taninos sedosos e final prolongado.',
    technicalSheet: {
      alcohol: '14%',
      temperature: '16-18°C',
      pairings: ['Carnes grelhadas', 'Cordeiro', 'Risoto'],
    },
    reviews: [
      {
        id: 'r4',
        author: 'Carlos Oliveira',
        rating: 5,
        comment: 'Um dos melhores Merlots que já provei!',
        date: '2026-02-28',
      },
    ],
  },
  {
    id: 'rose-elegance',
    name: 'Rosé Elegance',
    price: 78.0,
    image: 'rose-wine-bottle',
    rating: 4.2,
    region: 'Vale dos Vinhedos, RS',
    grape: 'Pinot Noir',
    year: 2023,
    type: 'rosé',
    sweetness: 'meio-seco',
    body: 'leve',
    agingPotential: '1-2 anos',
    color: '#FFB6C1',
    description:
      'Vinho rosé delicado com aromas de morango, framboesa e flores. Fresco e equilibrado.',
    technicalSheet: {
      alcohol: '11,5%',
      temperature: '6-8°C',
      pairings: ['Saladas', 'Massas leves', 'Queijos suaves'],
    },
    reviews: [],
  },
  {
    id: 'espumante-brut-nature',
    name: 'Espumante Brut Nature',
    price: 165.0,
    image: 'sparkling-wine-bottle',
    rating: 4.6,
    region: 'Serra Gaúcha, RS',
    grape: 'Chardonnay e Pinot Noir',
    year: 2021,
    type: 'espumante',
    sweetness: 'seco',
    body: 'leve',
    agingPotential: '3-5 anos',
    color: '#F5DEB3',
    description:
      'Espumante sofisticado com perlage fino e persistente. Notas de maçã verde, amêndoas e brioche.',
    technicalSheet: {
      alcohol: '12%',
      temperature: '4-6°C',
      pairings: ['Aperitivos', 'Frutos do mar', 'Sushi'],
    },
    reviews: [
      {
        id: 'r5',
        author: 'Patricia Lima',
        rating: 5,
        comment: 'Perfeito para celebrações!',
        date: '2026-03-03',
      },
    ],
  },
  {
    id: 'tannat-gran-reserva',
    name: 'Tannat Gran Reserva',
    price: 198.0,
    image: 'red-wine-bottle',
    rating: 4.8,
    region: 'Campanha Gaúcha, RS',
    grape: 'Tannat',
    year: 2018,
    type: 'tinto',
    sweetness: 'seco',
    body: 'encorpado',
    agingPotential: '10-15 anos',
    color: '#8B0000',
    description:
      'Vinho tinto robusto e intenso, com taninos firmes e notas de frutas escuras, especiarias e couro.',
    technicalSheet: {
      alcohol: '14,5%',
      temperature: '18-20°C',
      pairings: ['Churrasco', 'Caça', 'Queijos fortes'],
    },
    reviews: [
      {
        id: 'r6',
        author: 'Fernando Alves',
        rating: 5,
        comment: 'Excepcional! Vale cada centavo.',
        date: '2026-02-25',
      },
    ],
  },
];

export const getWinesByColor = (color: string): Wine[] => {
  return wines.filter((wine) => wine.color === color);
};

export const getWineById = (id: string): Wine | undefined => {
  return wines.find((wine) => wine.id === id);
};