import { Action } from '@ngrx/store'
import { Articles } from '../models/articles.modal'
import * as ArticleActions from '../actions/actricles.actions'
// if you want initial to be loaded after Articles[] = [initialState]
// need to initlalize as an empty array or it throws an error about state not being an array
export function reducer(state: Articles[] = [], action: ArticleActions.Actions) {
 switch(action.type) {
  case ArticleActions.add_article:
   return [...state, action.payload];
   // look into changing below
  case ArticleActions.favorite_article:
  // need to figure out how to delete it before returned
  // probobly just want to have this in a different route because want slightly different buttons(i.e. add notes)
   return [...state, action.payload]
  case ArticleActions.delete_article:
   return state = undefined
  default:
   return state;
  //  above will change want to see if i can get the adding working first
 }
}