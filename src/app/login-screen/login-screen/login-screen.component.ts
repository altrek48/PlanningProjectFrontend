
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { BaseService } from 'src/services/base-service';
import { LocalStorageService } from 'src/services/localStorage-service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  loginUser: User;

  constructor(private baseService: BaseService, private router: Router, private localStorage: LocalStorageService) {
    this.loginUser = new User;
  }
  
  login() {
    console.log('Login method called');
    this.baseService.login(this.loginUser).subscribe(
      (response: {token: string}) => {
        if (response.token) {
          console.log("Login success");
          this.localStorage.setItem("token", response.token);
          this.router.navigate(['/home']);
        } else {
          console.error("Incorrect login data", response.token);
        }
      },
      (error) => {
          console.error("Login failed", error);
      }
  );
  }

  ngOnInit(): void {
  }

}
