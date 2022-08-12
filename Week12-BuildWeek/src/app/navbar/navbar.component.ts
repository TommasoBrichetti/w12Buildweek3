import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { user, UserLogin } from '../post';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged!: boolean | UserLogin

  sub!: Subscription

  constructor(private auth$: AuthService) { }

  ngOnInit(): void {
    this.sub = this.auth$.authSub.subscribe((state) => {
      this.isLogged = state;
  })
  }
  logout(){
    this.auth$.logout();
    console.log("logout completed");
  }
}
