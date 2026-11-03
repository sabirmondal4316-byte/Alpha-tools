export type ToolCategory = 'all' | 'image' | 'text' | 'calculators' | 'converters';

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  longDesc: string;
  category: ToolCategory;
  categoryLabel: string;
  iconName: string;
  badge?: string;
  tags: string[];
  features: string[];
  howToSteps: string[];
  faqs: { question: string; answer: string }[];
}

export type PageRoute =
  | 'home'
  | 'image-compressor'
  | 'image-resizer'
  | 'qr-code-generator'
  | 'word-counter'
  | 'age-calculator'
  | 'json-formatter'
  | 'jpg-to-png'
  | 'png-to-jpg'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';
