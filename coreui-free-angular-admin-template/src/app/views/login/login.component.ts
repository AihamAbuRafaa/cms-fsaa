import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(public user:UserService)
  {
  }
  login(f:NgForm)
  {
    let i=f.value
    this.user.login(i.username,i.password);
  }
 }
