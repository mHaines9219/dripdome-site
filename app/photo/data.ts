export interface PhotographyCategory {
  category: string;
  images: string[];
}

export const photographyData: PhotographyCategory[] = [
  {
    category: 'EDITORIALS',
    images: [
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/cosmo.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/offtherails.jpeg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/inkednessa.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/galorerblack.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/lunalindemann.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/polyester.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/ladygunnavril.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/rollingstone.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/lunalindemann.jpg',
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
