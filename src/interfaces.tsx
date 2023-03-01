export interface IPageInfo {
  startCursor: string
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface IPostEdge {
  node: IPost
}

export interface IPostConnection {
  totalCount: number
  edges: IPostEdge[]
  pageInfo: IPageInfo
}

export interface IPostsResponse {
  posts: IPostConnection
}

export interface IContentSource {
  id: string
  name: string
}
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
