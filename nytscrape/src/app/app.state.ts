import { Articles } from './models/articles.modal'
// better practice to import entire state?(this is just because state component)
export interface AppState {
 readonly articles: Articles[];
}