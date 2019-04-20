import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articles } from '../../models/articles.modal'
import { Store } from '@ngrx/store'
import { AppState } from '../../app.state'
import * as ArticleActions from '../../actions/actricles.actions'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private httpClient: HttpClient, private store: Store<AppState>) { }
  addArticle(link, title, desc) {
    this.store.dispatch(new ArticleActions.AddArticle({title, desc, link}))
  }
  favArticles(link, title, desc, notes) {
    console.log(link)
    // doesn't like because model folder ask tas or someone about
    this.store.dispatch(new ArticleActions.FavoriteArticle({title, desc, link, notes}))
  }
  ngOnInit() {
  }
  get_articles() {
    // clear the state so doesn't get moved over each time and always initializes with just what is in the database
    this.clear_articles()
    this.httpClient.get('http://localhost:8080/api/articles').subscribe(res => {
      // hopefully this red shouldn't matter
      let data: any = res
      for (let i = 0; i < data.length; i++) {
      this.addArticle(data[i].link, data[i].title, data[i].desc)
      }
    })
  }
  // if not navigating off the page will also need to delete or not show the standard articles
  fav_articles() {
    this.clear_articles()
    this.httpClient.get('http://localhost:8080/api/favorite').subscribe(res => {
      for (let i = 0; i < (<string>res).length; i++) {
        this.favArticles(res[i].link, res[i].title, res[i].desc, res[i].notes)
      }
    })
  }
  clear_articles() {
    this.store.dispatch(new ArticleActions.DeleteArticles())
    this.httpClient.delete('http://localhost:8080/api/delete').subscribe(res => {
      console.log('deleted')
    })
  }
}
