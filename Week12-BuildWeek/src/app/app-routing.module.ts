import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { AuthGuard } from './auth.guard';
import { CommentiComponent } from './commenti/commenti.component';
import { E404Component } from './e404/e404.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModUserComponent } from './mod-user/mod-user.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { UserpostComponent } from './userpost/userpost.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'commenti',
    component: CommentiComponent,
  },
  {
    path: 'addpost',
    component: AddPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userpost',
    component: UserpostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'moduser',
    component: ModUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: E404Component
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
