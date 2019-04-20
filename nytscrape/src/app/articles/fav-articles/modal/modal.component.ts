import { Component, Input, onInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Articles } from '../../../models/articles.modal'
import { Store } from '@ngrx/store'
import { AppState } from '../../../app.state'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent {
  @Input() title: String
  @Input() notes: String
  display='none'  
    // favArticles: Observable<FavArticles[]>
    articles: Observable<Articles[]>
  // not sure why this states that it's not read
    constructor(private store: Store<AppState>, private http: HttpClient) { 
      this.articles = store.select('articles')
    }
  onCloseHandled() {
    this.display='none'
  }
  openModal () {
    this.display='block'
    console.log(this.articles)
  }

  deleteNote(title, note) {
    console.log(note)
    this.http.put('http://localhost:8080/api/delNote/' + title + '/' + note).subscribe(res => {
      console.log(res)
    })
  }
  submitNote(note, id) {
    console.log(id)
    // need to grab a value for this
    // need to add the id of where i'm saving this notes to after /addNote/:id(here)
    this.http.post('http://localhost:8080/api/addNote/' + id, {note}).subscribe(res => {
      console.log(res)
    })
  }
}
