import { ToolItem } from '../types';

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    slug: 'image-compressor',
    shortDesc: 'Compress JPG, PNG & WebP images to reduce file size without visible loss in quality.',
    longDesc: 'Reduce image file sizes instantly in your browser with high-efficiency HTML5 canvas compression. Control image quality, set max width or height constraints, and download single files or batch ZIP archives. 100% private with no server uploads.',
    category: 'image',
    categoryLabel: 'Image Tools',
    iconName: 'Minimize2',
    badge: 'Popular',
    tags: ['compress image', 'reduce image size', 'optimize photos', 'jpg compressor', 'png compressor'],
    features: [
      'High-performance client-side compression via HTML5 canvas',
      'Real-time before & after file size and savings percentage',
      'Adjustable quality compression slider (10% - 100%)',
      'Optional max width/height dimension constraint',
      'Interactive side-by-side split visual preview',
      'Batch upload with individual or bundled ZIP download'
    ],
    howToSteps: [
      'Drag and drop or select one or multiple image files (JPG, PNG, WebP).',
      'Adjust the compression quality slider to your desired balance of size and clarity.',
      'Check the real-time savings percentage and visual preview comparison.',
      'Click "Download Compressed" for a single file or "Download All as ZIP".'
    ],
    faqs: [
      {
        question: 'Are my images uploaded to any remote server?',
        answer: 'No. ALPHA TOOLS performs all image compression directly in your browser using client-side JavaScript and HTML5 Canvas. Your files never leave your device.'
      },
      {
        question: 'What image formats are supported?',
        answer: 'You can compress JPG/JPEG, PNG, and WebP files. You can also choose to export in original format, JPEG, or WebP.'
      },
      {
        question: 'What is the optimal quality level?',
        answer: 'A quality level between 70% and 80% usually reduces file size by 50% to 80% with virtually no perceptible loss in visual quality for the human eye.'
      }
    ]
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    slug: 'image-resizer',
    shortDesc: 'Resize photos to exact pixel dimensions, percentages, or popular social media presets.',
    longDesc: 'Quickly resize photos, banners, and digital graphics with instant aspect ratio locking, popular social media presets (Instagram, Facebook, YouTube, X/Twitter, Full HD), and format conversion.',
    category: 'image',
    categoryLabel: 'Image Tools',
    iconName: 'Maximize2',
    badge: 'Essential',
    tags: ['resize photo', 'social media crop', 'dimensions', 'scale image', 'pixel size'],
    features: [
      'Exact pixel dimension input or percentage scaling (25%, 50%, 75%, 150%, 200%)',
      'One-click aspect ratio lock to prevent image distortion',
      'Built-in social media presets (Instagram Square, Story, YouTube Thumbnail, etc.)',
      'Format selection between JPG, PNG, and WebP',
      'Live dimension and estimated file size display',
      'Clean high-resolution bilinear interpolation canvas resampling'
    ],
    howToSteps: [
      'Upload an image from your computer or phone.',
      'Enter custom width & height, choose a percentage scale, or click a preset.',
      'Keep the aspect ratio lock enabled to retain original proportions.',
      'Preview the resized output and download the image.'
    ],
    faqs: [
      {
        question: 'Will resizing stretch or distort my image?',
        answer: 'Not if the aspect ratio lock is enabled. Locking the ratio automatically updates the height when you change the width and vice versa.'
      },
      {
        question: 'What are the social media presets included?',
        answer: 'We provide presets for Instagram Square (1080x1080), Instagram Story (1080x1920), YouTube Thumbnail (1280x720), Twitter/X Post (1200x675), Full HD (1920x1080), and Passport size.'
      },
      {
        question: 'Is there a limit on image resolution?',
        answer: 'Because the processing runs in your browser, it can comfortably handle large photos up to 4K and 8K resolutions depending on your device memory.'
      }
    ]
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    shortDesc: 'Create customized QR codes for URLs, text, WiFi, email, SMS, and digital business cards.',
    longDesc: 'Generate high-resolution QR codes in seconds. Customize foreground & background colors, configure error correction levels, adjust margins, and download as PNG or SVG vector format for print.',
    category: 'calculators',
    categoryLabel: 'Generators',
    iconName: 'QrCode',
    badge: 'Popular',
    tags: ['qr code', 'generate qr', 'wifi qr code', 'vcard qr', 'custom qr maker'],
    features: [
      '6 content modes: URL, Plain Text, WiFi Network, Email, Phone/SMS, vCard Contact',
      'Custom foreground and background color pickers with curated palette presets',
      'Configurable error correction levels (Low, Medium, Quartile, High)',
      'Adjustable canvas resolution (200px to 800px) and margin padding',
      'Download as crystal-clear PNG image or infinite-scale vector SVG',
      'Direct copy-to-clipboard functionality'
    ],
    howToSteps: [
      'Select the QR code type (URL, WiFi, Text, Contact, etc.).',
      'Enter the required details (e.g., website address or WiFi credentials).',
      'Optionally customize color styling, margin, and resolution.',
      'Download as PNG or SVG, or copy the image directly.'
    ],
    faqs: [
      {
        question: 'Do these QR codes ever expire?',
        answer: 'No. The QR codes generated are static standard QR codes containing the direct encoded data. They never expire and will work permanently.'
      },
      {
        question: 'Which error correction level should I choose?',
        answer: 'Medium (15%) is great for digital screens. High (30%) is recommended if you plan to print the QR code on paper, menus, or outdoor banners.'
      },
      {
        question: 'How do WiFi QR codes work?',
        answer: 'When scanned with an iPhone or Android camera, a WiFi QR code prompts the user to join the network automatically without typing the password.'
      }
    ]
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    slug: 'word-counter',
    shortDesc: 'Count words, characters, sentences, paragraphs, reading time, and keyword density.',
    longDesc: 'A comprehensive text analytics and word count utility for writers, students, bloggers, and copywriters. Inspect character counts with and without spaces, reading and speaking duration, Flesch reading ease score, and top keyword frequencies.',
    category: 'text',
    categoryLabel: 'Text Tools',
    iconName: 'FileText',
    badge: 'Productivity',
    tags: ['word count', 'character count', 'reading time', 'text statistics', 'keyword density'],
    features: [
      'Instant real-time counting of words, characters (with/without spaces), sentences, and paragraphs',
      'Estimated reading time (200 wpm) and speaking time (130 wpm)',
      'Flesch Reading Ease readability scoring with difficulty grade',
      'Top keyword density frequency table with stopword exclusion toggle',
      'Text transformation actions: UPPERCASE, lowercase, Title Case, Sentence case',
      'One-click extra whitespace cleaner, clear, and copy to clipboard'
    ],
    howToSteps: [
      'Type or paste your text into the editor box, or click "Load Sample".',
      'View instant live counts for words, characters, sentences, and reading time.',
      'Check the keyword density analysis to optimize SEO repeat words.',
      'Use the case converter tools to transform text styling if needed.'
    ],
    faqs: [
      {
        question: 'How is the reading time calculated?',
        answer: 'Reading time is calculated at an average reading speed of 200 words per minute, while speaking time is based on 130 words per minute.'
      },
      {
        question: 'What is the Flesch Reading Ease score?',
        answer: 'It is a recognized formula that measures how easy a text is to understand. Scores between 60 and 70 are considered standard and easily readable by a general audience.'
      },
      {
        question: 'Is my confidential text private?',
        answer: 'Yes! Your text is never sent across the internet. All calculations are executed locally in your browser memory.'
      }
    ]
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    slug: 'age-calculator',
    shortDesc: 'Calculate your exact age in years, months, days, minutes, plus next birthday countdown.',
    longDesc: 'Find your precise chronological age down to the exact second with a live ticking timer. Discover your next birthday countdown, total days and weeks lived, Western and Chinese zodiac signs, generation classification, and estimated lifetime heartbeats.',
    category: 'calculators',
    categoryLabel: 'Calculators',
    iconName: 'Calendar',
    badge: 'Fun & Utility',
    tags: ['calculate age', 'birthday countdown', 'days lived', 'zodiac sign', 'chronological age'],
    features: [
      'Exact chronological age in Years, Months, and Days',
      'Live ticking seconds counter in real time',
      'Alternative units breakdown: Total Months, Weeks, Days, Hours, Minutes, and Seconds',
      'Next birthday countdown timer with exact day-of-week indicator',
      'Astrological insights: Western Zodiac sign & element + Chinese Zodiac animal',
      'Generation classifier (Gen Alpha, Gen Z, Millennial, Gen X, Boomer) and lifetime milestones'
    ],
    howToSteps: [
      'Select your date of birth using the date picker.',
      'Optionally pick a target comparison date (defaults to today).',
      'Read your exact chronological age and watch the real-time seconds tick.',
      'Explore your upcoming birthday countdown and fun biological metrics.'
    ],
    faqs: [
      {
        question: 'Does the calculator account for leap years?',
        answer: 'Yes, our algorithm accurately takes into account leap years and varying month lengths (28, 29, 30, and 31 days).'
      },
      {
        question: 'Can I calculate age as of a past or future date?',
        answer: 'Yes! You can customize the "Calculate age at date" field to find out how old you were at a specific past event or how old you will be in the future.'
      },
      {
        question: 'How are estimated heartbeats calculated?',
        answer: 'Biological estimates are based on an average resting human heart rate of 80 beats per minute and an average respiratory rate of 16 breaths per minute.'
      }
    ]
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    shortDesc: 'Format, beautify, validate, minify, and inspect JSON with an interactive tree viewer.',
    longDesc: 'Clean, format, and debug messy or unformatted JSON payloads. Features syntax validation with line/column error detection, key sorting, indentation options (2 spaces, 4 spaces, tab), minification, and an interactive collapsable tree viewer.',
    category: 'text',
    categoryLabel: 'Developer Tools',
    iconName: 'Braces',
    badge: 'Developer',
    tags: ['json beautifier', 'format json', 'json validator', 'minify json', 'json tree'],
    features: [
      'Instant syntax validation with precise error highlighting and line indicators',
      'Indentation controls: 2 spaces, 4 spaces, Tab character, or Minified compact mode',
      'Optional alphabetical key sorting for clean diffs',
      'Interactive visual tree viewer with expandable nodes and data type badges',
      'Upload .json files or select preloaded sample structures',
      'One-click formatted JSON copying and file download'
    ],
    howToSteps: [
      'Paste your raw JSON into the input editor or click "Load Sample".',
      'Click "Format JSON" to beautify with chosen indentation or "Minify" to compress.',
      'Toggle the "Tree View" tab to inspect nested arrays and objects interactively.',
      'Copy the output or download as a `.json` file.'
    ],
    faqs: [
      {
        question: 'Does this tool validate invalid JSON?',
        answer: 'Yes! If your JSON has syntax errors (like missing quotes, trailing commas, or unclosed brackets), it clearly pinpoints the error and suggests a correction.'
      },
      {
        question: 'Can I format large JSON files?',
        answer: 'Yes, the client-side parsing engine handles multi-megabyte JSON payloads with fast zero-latency processing.'
      },
      {
        question: 'What is the purpose of the Minify option?',
        answer: 'Minification removes all superfluous whitespace and line breaks, producing the smallest possible payload size for API transmission and storage.'
      }
    ]
  },
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG Converter',
    slug: 'jpg-to-png',
    shortDesc: 'Convert JPEG and JPG pictures to lossless high-fidelity PNG format in your browser.',
    longDesc: 'Transform lossy JPG/JPEG images into crisp, lossless PNG format. Perfect for graphic design, web assets, and preserving visual sharpness across multiple edits.',
    category: 'converters',
    categoryLabel: 'Converters',
    iconName: 'ArrowRightLeft',
    badge: 'Lossless',
    tags: ['jpg to png', 'jpeg to png', 'image converter', 'convert to png', 'photo conversion'],
    features: [
      '100% client-side conversion using HTML5 Canvas rendering',
      'Supports batch file conversion with parallel processing',
      'Detailed file size and dimension inspection before and after conversion',
      'Single file download or bundled ZIP archive download',
      'Zero server upload for absolute confidentiality and security',
      'Drag-and-drop workflow with instant image preview'
    ],
    howToSteps: [
      'Drop your JPG or JPEG files into the upload box or browse from your device.',
      'Preview the uploaded files and check their initial resolutions and sizes.',
      'Click "Convert to PNG" to process the images instantly.',
      'Download individual PNG files or click "Download All (ZIP)".'
    ],
    faqs: [
      {
        question: 'Why convert JPG to PNG?',
        answer: 'PNG is a lossless compression format, meaning it will not degrade in quality upon re-saving, making it ideal for diagrams, screenshots, typography, and editing.'
      },
      {
        question: 'Will converting a JPG to PNG make the background transparent?',
        answer: 'Standard JPGs do not contain transparency data. Converting to PNG retains the solid background unless you choose to make a specific color transparent.'
      },
      {
        question: 'Is there a limit on how many images I can convert?',
        answer: 'You can convert multiple images at once. The tool processes them directly on your machine without server rate limits.'
      }
    ]
  },
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG Converter',
    slug: 'png-to-jpg',
    shortDesc: 'Convert PNG images to compact JPG format with custom background color and quality control.',
    longDesc: 'Convert large PNG files to lightweight JPEG/JPG images to significantly reduce file size for websites, emails, and presentations. Includes background color selection for transparent PNGs so your images don’t end up with black backgrounds.',
    category: 'converters',
    categoryLabel: 'Converters',
    iconName: 'RefreshCw',
    badge: 'Compact',
    tags: ['png to jpg', 'png to jpeg', 'compress png', 'convert png', 'photo converter'],
    features: [
      'Customizable background fill color for transparent PNG areas (White, Off-white, Black, or custom hex)',
      'Adjustable JPEG quality slider (10% to 100%) for fine-tuned compression',
      'Instant before & after file size savings comparison',
      'Batch conversion support with single or all-in-one ZIP download',
      'Completely client-side with zero data uploaded to third parties',
      'Responsive drag-and-drop user interface'
    ],
    howToSteps: [
      'Upload one or more PNG images into the dropzone.',
      'Select a background color for any transparent areas (default is clean white).',
      'Adjust the JPG quality slider (85% is recommended for superb balance).',
      'Click "Convert to JPG" and download your lightweight JPEG files.'
    ],
    faqs: [
      {
        question: 'What happens to transparent backgrounds in PNGs?',
        answer: 'Since JPG does not support transparency, our converter lets you choose a background fill color (white by default, or any color you prefer) so your transparent areas look natural.'
      },
      {
        question: 'How much file size will I save?',
        answer: 'Converting heavy PNGs (especially photos or complex graphics) to JPG typically reduces file size by 60% to 90%.'
      },
      {
        question: 'Does this run safely on my device?',
        answer: 'Yes, 100% of the conversion runs directly in your local browser sandbox without sending any data over the internet.'
      }
    ]
  }
];

export const TOOL_CATEGORIES = [
  { id: 'all', label: 'All Tools', count: 8 },
  { id: 'image', label: 'Image Tools', count: 2 },
  { id: 'text', label: 'Text & Dev', count: 2 },
  { id: 'calculators', label: 'Calculators & QR', count: 2 },
  { id: 'converters', label: 'Converters', count: 2 },
];
