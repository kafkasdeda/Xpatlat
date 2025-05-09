/**
 * Predefined search templates for common Twitter search patterns
 */
export const searchTemplates = [
  {
    id: 'viral-content',
    name: 'Viral İçerik',
    description: 'Yüksek etkileşimli popüler tweetler',
    icon: '🚀',
    filters: {
      likesMin: '1000',
      retweetsMin: '500',
      language: 'tr'
    }
  },
  {
    id: 'questions',
    name: 'Sorular',
    description: 'Soru içeren tweetler',
    icon: '❓',
    filters: {
      textSearch: '?',
      language: 'tr',
      exclude: {
        retweets: true
      }
    }
  },
  {
    id: 'media-content',
    name: 'Medya İçerikler',
    description: 'Görsel veya video içeren tweetler',
    icon: '📸',
    filters: {
      mediaTypes: {
        any: true
      },
      likesMin: '100'
    }
  },
  {
    id: 'user-engagement',
    name: 'Kullanıcı Etkileşimi',
    description: 'Belirli bir kullanıcıya yapılan mentionlar',
    icon: '💬',
    filters: {
      to: '', // Kullanıcı tarafından doldurulacak
      exclude: {
        retweets: true
      }
    }
  },
  {
    id: 'recent-popular',
    name: 'Son 24 Saat Popüler',
    description: 'Son 24 saatte popüler olan içerikler',
    icon: '📈',
    filters: {
      since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      likesMin: '500',
      language: 'tr'
    }
  },
  {
    id: 'tech-news',
    name: 'Teknoloji Haberleri',
    description: 'Teknoloji ile ilgili haberler',
    icon: '💻',
    filters: {
      textSearch: 'teknoloji OR yapay zeka OR AI OR blockchain',
      mediaTypes: {
        links: true
      },
      exclude: {
        retweets: true
      },
      language: 'tr'
    }
  },
  {
    id: 'breaking-news',
    name: 'Son Dakika',
    description: 'Son dakika haberleri',
    icon: '🔴',
    filters: {
      textSearch: '"son dakika" OR "breaking" OR "acil"',
      since: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString().split('T')[0],
      exclude: {
        retweets: true
      }
    }
  },
  {
    id: 'with-images',
    name: 'Görsel İçerikler',
    description: 'Sadece resim içeren tweetler',
    icon: '🖼️',
    filters: {
      mediaTypes: {
        images: true
      },
      exclude: {
        retweets: true
      }
    }
  },
  {
    id: 'with-videos',
    name: 'Video İçerikler',
    description: 'Sadece video içeren tweetler',
    icon: '🎥',
    filters: {
      mediaTypes: {
        videos: true
      },
      exclude: {
        retweets: true
      }
    }
  },
  {
    id: 'from-verified',
    name: 'Doğrulanmış Hesaplar',
    description: 'Sadece mavi tikli hesaplardan',
    icon: '✓',
    filters: {
      textSearch: 'filter:verified',
      exclude: {
        retweets: true
      }
    }
  }
];

// Helper function to get template by ID
export const getTemplateById = (id) => {
  return searchTemplates.find(template => template.id === id);
};

// Helper function to get filter presets
export const getTemplateFilters = (templateId) => {
  const template = getTemplateById(templateId);
  return template ? template.filters : null;
};
