import { Replys } from "./replys"

export interface Posts {
  id: number
  user: string
  header: string,
  post: string
  date: string
  likes: number
  deslikes: number
  replys: Array<Replys>
  hashtags: Array<string>
}
