import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Articles } from '../../models/articles.modal'
import { Store } from '@ngrx/store'
import { AppState } from '../../app.state'
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-fav-articles',
  templateUrl: './fav-articles.component.html',
  styleUrls: ['./fav-articles.component.css']
})
export class FavArticlesComponent implements OnInit {
  // favArticles: Observable<FavArticles[]>
  articles: Observable<Articles[]>
// not sure why this states that it's not read
  constructor(private store: Store<AppState>, private http: HttpClient) { 
    this.articles = store.select('articles')
  }



  ngOnInit() {
  }
  deleteFavorite(event) {
    console.log(event)
    this.http.delete('http://localhost:8080/api/deleteOne', event).subscribe(res => {
      console.log(res)
    })
  }
} 
