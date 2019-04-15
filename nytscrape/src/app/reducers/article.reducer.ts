import { Action } from '@ngrx/store'
import { Articles } from '../models/articles.modal'
import * as ArticleActions from '../actions/actricles.actions'

const initialState: Articles = {
 title: 'hello',
 link: 'http://localhost:3000',
 desc: 'hey'
}
// if you want initial to be loaded after Articles[] = [initialState]
// need to initlalize as an empty array or it throws an error about state not being an array
export function reducer(state: Articles[] = [], action: ArticleActions.Actions) {
 switch(action.type) {
  case ArticleActions.add_article:
   return [...state, action.payload];
  case ArticleActions.favorite_article:
   return state;
  default:
   return state;
  //  above will change want to see if i can get the adding working first
 }
}