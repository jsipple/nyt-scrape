import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/article.reducer'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environemnt
import { FormsModule } from '@angular/forms';
import { FavArticlesComponent } from './articles/fav-articles/fav-articles.component'
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './articles/fav-articles/modal/modal.component';

const appRoutes: Routes = [
  {path: 'saved', component: FavArticlesComponent},
  // starting page so this works
  {path: '', component: ArticlesComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    HeaderComponent,
    NavbarComponent,
    FavArticlesComponent,
    ModalComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      articles: reducer
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
