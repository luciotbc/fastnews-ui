export interface IPost {
  id: string
  body: string
  contentSource: IContentSource
  link: string
  publishedAt: Date
  summary: string
  title: string
  imageUrl: string | null
}

export interface IContentSource {
  id: string
  name: string
}
