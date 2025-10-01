import { Metadata } from 'next';

// Base metadata configuration
export const metadata: Metadata = {
  title: {
    default: 'Evening Labs',
    template: '%s | Evening Labs'
  },
  description:
    'A creative digital studio crafting meaningful experiences at the intersection of design and technology.',
  keywords: [
    'digital agency',
    'web design',
    'ui/ux design',
    'web development',
    'creative studio',
    'brand identity',
    'digital strategy',
    'evening labs'
  ],
  authors: [{ name: 'Evening Labs' }],
  creator: 'Evening Labs',
  publisher: 'Evening Labs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://eveninglabs.co'),
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: { url: '/favicon.svg', type: 'image/svg+xml' }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eveninglabs.co',
    siteName: 'Evening Labs',
    title: 'Evening Labs - Creative Digital Studio',
    description:
      'A creative digital studio crafting meaningful experiences at the intersection of design and technology.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Evening Labs - Creative Digital Studio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evening Labs - Creative Digital Studio',
    description:
      'A creative digital studio crafting meaningful experiences at the intersection of design and technology.',
    images: ['/og-image.jpg'],
    creator: '@eveninglabs'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  category: 'business'
};

// Page-specific metadata functions
export function generatePageMetadata({
  title,
  description,
  path = '',
  image
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `https://eveninglabs.com${path}`;

  return {
    title,
    description: description || metadata.description,
    openGraph: {
      ...metadata.openGraph,
      title,
      url,
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : metadata.openGraph?.images
    },
    twitter: {
      ...metadata.twitter,
      title,
      images: image ? [image] : metadata.twitter?.images
    },
    alternates: {
      canonical: url
    }
  };
}

// Common metadata for different page types
export const metadataTemplates = {
  home: generatePageMetadata({
    title: 'Evening Labs',
    description:
      'Evening Labs - Building innovative solutions for the modern web',
    path: '/'
  }),

  about: generatePageMetadata({
    title: 'About Us',
    description:
      'Learn more about Evening Labs and our mission to build innovative web solutions',
    path: '/about'
  }),

  contact: generatePageMetadata({
    title: 'Contact',
    description: 'Get in touch with Evening Labs for your next project',
    path: '/contact'
  }),

  blog: generatePageMetadata({
    title: 'Blog',
    description: 'Latest insights and updates from Evening Labs',
    path: '/blog'
  }),

  projects: generatePageMetadata({
    title: 'Projects',
    description: 'Explore our portfolio of innovative web projects',
    path: '/projects'
  })
};
