import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserLogin } from '../post';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth$: AuthService) { }

  isLogged!: boolean | UserLogin

  sub!: Subscription

  ngOnInit(): void {
    this.sub = this.auth$.authSub.subscribe((state) => {
      this.isLogged = state;
  })

}
}
