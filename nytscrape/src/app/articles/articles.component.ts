import { Component, OnInit } from '@angular/core';
// not sure what the issue is here
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { Articles } from '../models/articles.modal'
import { AppState } from '../app.state'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Observable<Articles[]>
// not sure why this states that it's not read
  constructor(private http: HttpClient, private store: Store<AppState>) { 
    this.articles = store.select('articles')
  }

  ngOnInit() {
  }
  saveArticle(event) {
    let favor = event.target.attributes.id
    console.log(favor)
    this.http.post('http://localhost:8080/api/fav', favor).subscribe(res => {
      
    // should be undefined nothing being returned yet
      console.log(res)
    })
  }
}
