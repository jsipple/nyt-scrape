import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Articles } from '../../models/articles.modal'
import { Store } from '@ngrx/store'
import { AppState } from '../../app.state'


@Component({
  selector: 'app-fav-articles',
  templateUrl: './fav-articles.component.html',
  styleUrls: ['./fav-articles.component.css']
})
export class FavArticlesComponent implements OnInit {
  // favArticles: Observable<FavArticles[]>
  articles: Observable<Articles[]>
// not sure why this states that it's not read
  constructor(private store: Store<AppState>) { 
    this.articles = store.select('articles')
  }



  ngOnInit() {
  }

}
