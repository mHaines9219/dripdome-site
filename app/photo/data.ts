export interface PhotographyCategory {
  category: string;
  images: string[];
}

export const photographyData: PhotographyCategory[] = [
  {
    category: 'EDITORIALS',
    images: [
      'https://picsum.photos/800/800?random=1',
      'https://picsum.photos/800/800?random=2',
      'https://picsum.photos/800/800?random=3',
      'https://picsum.photos/800/800?random=3',
      'https://picsum.photos/800/800?random=3',
    ],
  },
  {
    category: 'ECOMMERCE',
    images: [
      'https://picsum.photos/800/800?random=4',
      'https://picsum.photos/800/800?random=5',
      'https://picsum.photos/800/800?random=5',
      'https://picsum.photos/800/800?random=5',
      'https://picsum.photos/800/800?random=5',
    ],
  },
  {
    category: 'INDIE PROJECTS',
    images: [
      'https://picsum.photos/800/800?random=6',
      'https://picsum.photos/800/800?random=7',
      'https://picsum.photos/800/800?random=7',
      'https://picsum.photos/800/800?random=8',
      'https://picsum.photos/800/800?random=9',
    ],
  },
];
