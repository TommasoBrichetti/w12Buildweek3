import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse, SignUp, user, UserLogin } from './post';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url =  "http://localhost:3000/api/";

  logged = false;

  account = []

  mine: boolean = false;

  helper = new JwtHelperService();


  authSub = new BehaviorSubject<boolean | UserLogin>(false);
  authObs = this.authSub.asObservable();

  constructor(private http: HttpClient) {
    this.authObs.subscribe((res)=> {
      this.logged = res ? true : false
    })
    if(localStorage.getItem("token")){
      this.authSub.next(true)//per rimanere loggati se un token è presente
    }
  }

  login(user: UserLogin) {
    this.http.post<AuthResponse>(this.url + "login", user).subscribe((res) => {
      console.log("login OK");
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("id", res.user.id.toString());
      console.log(res.user)
      this.authSub.next(res.user);
    })
  }

  signUp(user: SignUp) {
    this.http.post<AuthResponse>(this.url + 'signup', user).subscribe((res) => {
      console.log('signup OK');
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem("id", res.user.id.toString());
      this.authSub.next(res.user);
    });
  }

  logout() { // revisionare
    localStorage.removeItem('token');
    localStorage.removeItem('id')
    this.authSub.next(false);
    // this.mine = false;
  }

  // whoIsLogged(){
  //   if(localStorage.getItem("token")){
  //     let token = localStorage.getItem("token")
  //     return this.http.get<AuthResponse>(this.url + "user/" + this.helper.decodeToken(token!).email)
  //   }else{ return console.log("nessun token trovato")}
  // }

myAccount(){
  if(localStorage.getItem("token") && localStorage.getItem("id")){
    let id = localStorage.getItem("id")
    this.http.get<[]>("http://localhost:3000/api/getusers/" + id).subscribe((user) => {
     this.account = user;
    })
  }
  else { return console.log("nessun token ed id trovato")}
  }

  isAuth(): boolean {
    let t = localStorage.getItem('token');
    if (t) {
      return true;
    }
    return false;
  }
  isMine(autor:any, myId:any){
    if(autor == myId){
      return true;
    }else{
      return false;
    }
  }
}
