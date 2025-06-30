export const ItemType = {
  LINK: 'LINK',
  TEXT: 'TEXT',
  YOUTUBE: 'YOUTUBE',
  INSTAGRAM: 'INSTAGRAM',
  TWITTER: 'TWITTER',
  LINKEDIN: 'LINKEDIN',
  PINTEREST: 'PINTEREST',
  FACEBOOK: 'FACEBOOK',
} as const;

export type ItemType = typeof ItemType[keyof typeof ItemType];