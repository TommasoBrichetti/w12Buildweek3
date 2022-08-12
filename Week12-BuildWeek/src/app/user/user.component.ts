import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { user } from '../post';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: user[] = [];

  constructor(private auth$: AuthService) { }

  ngOnInit(): void {
   this.auth$.myAccount();
   this.user = this.auth$.account
   console.log(this.user);
  }

}
