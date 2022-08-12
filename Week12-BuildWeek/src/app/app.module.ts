import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { CardComponent } from './card/card.component';
import { UserComponent } from './user/user.component';
import { UserpostComponent } from './userpost/userpost.component';
import { UsercardComponent } from './usercard/usercard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { E404Component } from './e404/e404.component';
import { TokenInterceptor } from './token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentiComponent } from './commenti/commenti.component';
import { AddPostComponent } from './add-post/add-post.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { ModUserComponent } from './mod-user/mod-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    PostComponent,
    CardComponent,
    UserComponent,
    UserpostComponent,
    UsercardComponent,
    LoginComponent,
    SignupComponent,
    E404Component,
    CommentiComponent,
    AddPostComponent,
    CommentCardComponent,
    ModUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
