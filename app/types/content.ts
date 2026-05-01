export type ImageSource = {
  src: string
  width?: number
  height?: number
  altKey: string
  titleKey?: string
}

export type PlushieView = 'front' | 'back' | 'left' | 'right'

export type Plushie = {
  id: string
  i18nKey: string
  dimensions?: string
  views: Partial<Record<PlushieView, string>>
}

export type SocialPlatform =
  | 'twitch'
  | 'instagram'
  | 'instagram_plushies'
  | 'tiktok'
  | 'youtube'
  | 'youtube_clips'
  | 'x'
  | 'discord'

export type SupportPlatform = 'kofi' | 'throne' | 'streamelements'

export type SocialLink = {
  id: SocialPlatform | SupportPlatform
  url: string
  icon: string
  accent: string
}
