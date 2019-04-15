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
  ngOnInit() {
  }
  get_articles() {
    this.httpClient.get('http://localhost:8080/api/articles').subscribe(res => {
      // hopefully this red shouldn't matter
      for (let i = 0; i < res.length; i++) {
      this.addArticle(res[i].link, res[i].title, res[i].desc)
      }
    })
  }
}
