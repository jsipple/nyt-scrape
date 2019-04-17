import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Articles } from '../models/articles.modal'

export const add_article = '[Articles] Add'
export const favorite_article = '[Articles] favorited'
export const delete_article = '[Articles] deleted'
// @Injectable(providedIn: 'root'(provide service in root of App))
@Injectable()
export class AddArticle implements Action {
 readonly type = add_article
 // private only seen within that component public any component can see
 constructor(public payload: Articles) {}
}

export class DeleteArticles implements Action {
 readonly type = delete_article
 constructor() {}
}

export class FavoriteArticle implements Action {
 readonly type = favorite_article
 // number will be index
 constructor(public payload: Articles) {}
}

export type Actions = AddArticle | FavoriteArticle | DeleteArticles