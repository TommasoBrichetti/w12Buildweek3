import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserLogin } from '../post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth$: AuthService) { }

  isLogged!: boolean | UserLogin

  sub!: Subscription

  ngOnInit(): void {
    this.sub = this.auth$.authSub.subscribe((state) => {
      this.isLogged = state;
  })
  }

}
