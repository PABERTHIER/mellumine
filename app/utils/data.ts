import type { Plushie, SocialLink } from '~/types/content'

export const plushies: Plushie[] = [
  {
    id: 'artikodin',
    i18nKey: 'artikodin',
    dimensions: '35 x 25 cm',
    views: {
      front: '/images/plushies/artikodin-front.webp',
      right: '/images/plushies/artikodin-right.webp',
      back: '/images/plushies/artikodin-back.webp',
      left: '/images/plushies/artikodin-left.webp',
    },
  },
  {
    id: 'voltali',
    i18nKey: 'voltali',
    dimensions: '15 x 25 cm',
    views: {
      front: '/images/plushies/voltali-front.webp',
      right: '/images/plushies/voltali-right.webp',
      back: '/images/plushies/voltali-back.webp',
      left: '/images/plushies/voltali-left.webp',
    },
  },
  {
    id: 'goupix_alola_pink',
    i18nKey: 'goupix_alola_pink',
    dimensions: '7.5 x 13.5 cm',
    views: {
      front: '/images/plushies/goupix-alola-pink-front.webp',
      back: '/images/plushies/goupix-alola-pink-back.webp',
    },
  },
  {
    id: 'pink_cat',
    i18nKey: 'pink_cat',
    dimensions: '8 x 10 cm',
    views: {
      front: '/images/plushies/pink-cat-front.webp',
      back: '/images/plushies/pink-cat-back.webp',
    },
  },
  {
    id: 'blue_pink_butterfly',
    i18nKey: 'blue_pink_butterfly',
    dimensions: '6 x 6 cm',
    views: {
      front: '/images/plushies/blue-pink-butterfly-front.webp',
      back: '/images/plushies/blue-pink-butterfly-back.webp',
    },
  },
  {
    id: 'blue_white_snowflakes',
    i18nKey: 'blue_white_snowflakes',
    dimensions: '6 x 6 cm',
    views: {
      front: '/images/plushies/blue-white-snowflakes-front.webp',
      back: '/images/plushies/blue-white-snowflakes-back.webp',
    },
  },
  {
    id: 'white_blue_snowflakes',
    i18nKey: 'white_blue_snowflakes',
    dimensions: '6 x 6 cm',
    views: {
      front: '/images/plushies/white-blue-snowflakes-front.webp',
      back: '/images/plushies/white-blue-snowflakes-back.webp',
    },
  },
]

export const socials: SocialLink[] = [
  {
    id: 'twitch',
    url: 'https://www.twitch.tv/mellumine',
    icon: 'i-simple-icons-twitch',
    accent: '#9146ff',
  },
  {
    id: 'discord',
    url: 'https://discord.gg/423mAV2epn',
    icon: 'i-simple-icons-discord',
    accent: '#5865f2',
  },
  {
    id: 'instagram',
    url: 'https://www.instagram.com/mellumine_/',
    icon: 'i-simple-icons-instagram',
    accent: '#e1306c',
  },
  {
    id: 'instagram_plushies',
    url: 'https://www.instagram.com/mellu_peluche/',
    icon: 'i-simple-icons-instagram',
    accent: '#ff8fd1',
  },
  {
    id: 'tiktok',
    url: 'https://www.tiktok.com/@mellumine',
    icon: 'i-simple-icons-tiktok',
    accent: '#69c9d0',
  },
  {
    id: 'youtube',
    url: 'https://www.youtube.com/channel/UCvhk-7WcKz9m5DQ9INhTJPg',
    icon: 'i-simple-icons-youtube',
    accent: '#ff0033',
  },
  {
    id: 'youtube_clips',
    url: 'https://www.youtube.com/@MellumineClips',
    icon: 'i-simple-icons-youtube',
    accent: '#ff5c8a',
  },
  {
    id: 'x',
    url: 'https://x.com/Mellumine',
    icon: 'i-simple-icons-x',
    accent: '#ffffff',
  },
]

export const supports: SocialLink[] = [
  {
    id: 'kofi',
    url: 'https://ko-fi.com/mellumine/shop',
    icon: 'i-simple-icons-kofi',
    accent: '#ff5e5b',
  },
  {
    id: 'throne',
    url: 'https://throne.com/mellumine',
    icon: 'i-lucide-gift',
    accent: '#ffb84d',
  },
  {
    id: 'streamelements',
    url: 'https://streamelements.com/mellumine/tip',
    icon: 'i-lucide-heart',
    accent: '#f47fff',
  },
]

export const credits = [
  { roleKey: 'credits_design', name: '@Chuggoth' },
  { roleKey: 'credits_art', name: '@Gwenevyr_' },
  { roleKey: 'credits_rig', name: 'Gwenevyr' },
]
