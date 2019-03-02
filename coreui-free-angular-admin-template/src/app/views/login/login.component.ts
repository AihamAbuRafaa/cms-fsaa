import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { Form, NgForm } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(public user:UserService,private router:Router)
  {
  }
  login(f:NgForm)
  {
    let i=f.value
    this.user.login(i.username,i.password).then((result) => {
      this.router.navigate(['/dashboard']);
    });
  }
 }
