import { Metadata } from 'next';

// Base metadata configuration
export const metadata: Metadata = {
  title: {
    default: 'Evening Labs',
    template: '%s | Evening Labs',
  },
  description: 'Evening Labs - Building innovative solutions for the modern web',
  keywords: [
    'web development',
    'software development',
    'technology',
    'innovation',
    'evening labs',
  ],
  authors: [{ name: 'Evening Labs' }],
  creator: 'Evening Labs',
  publisher: 'Evening Labs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://eveninglabs.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eveninglabs.com', // Replace with your actual domain
    siteName: 'Evening Labs',
    title: 'Evening Labs',
    description: 'Evening Labs - Building innovative solutions for the modern web',
    images: [
      {
        url: '/og-image.jpg', // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: 'Evening Labs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evening Labs',
    description: 'Evening Labs - Building innovative solutions for the modern web',
    images: ['/og-image.jpg'], // Add your Twitter image
    creator: '@eveninglabs', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
};

// Page-specific metadata functions
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
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
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : metadata.openGraph?.images,
    },
    twitter: {
      ...metadata.twitter,
      title,
      images: image ? [image] : metadata.twitter?.images,
    },
    alternates: {
      canonical: url,
    },
  };
}

// Common metadata for different page types
export const metadataTemplates = {
  home: generatePageMetadata({
    title: 'Evening Labs',
    description: 'Evening Labs - Building innovative solutions for the modern web',
    path: '/',
  }),
  
  about: generatePageMetadata({
    title: 'About Us',
    description: 'Learn more about Evening Labs and our mission to build innovative web solutions',
    path: '/about',
  }),
  
  contact: generatePageMetadata({
    title: 'Contact',
    description: 'Get in touch with Evening Labs for your next project',
    path: '/contact',
  }),
  
  blog: generatePageMetadata({
    title: 'Blog',
    description: 'Latest insights and updates from Evening Labs',
    path: '/blog',
  }),
  
  projects: generatePageMetadata({
    title: 'Projects',
    description: 'Explore our portfolio of innovative web projects',
    path: '/projects',
  }),
};
