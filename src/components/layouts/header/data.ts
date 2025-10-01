interface Link {
  label: string;
  href: string;
}

export const links: Link[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Words', href: '/words' },
  { label: 'Impact ', href: '/impact' },
  { label: 'Contact', href: '/contact' },
];

export type LinkType = typeof links;
