import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { BaseService } from 'src/services/base-service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  authUser: User;

  constructor(private baseService: BaseService, private router: Router) {
    this.authUser = new User;
  }
  
  login() {
    console.log('Login method called');
    this.baseService.login(this.authUser).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response)
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  ngOnInit(): void {
  }

}
