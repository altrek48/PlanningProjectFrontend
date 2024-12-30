import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { BaseService } from 'src/services/base-service';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css']
})
export class RegisterScreenComponent implements OnInit {

  newUser: User;

  constructor(private baseService: BaseService, private router: Router) {
    this.newUser = new User;  
  }

  ngOnInit(): void {
  }

  registration() {
    if(this.newUser.username.length >= 5 && this.newUser.password.length >= 5) {
      this.baseService.registration(this.newUser).subscribe(
        (response: User) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log("registration failed");
        }
      );
    }
    else console.log("Логин и пароль должны быть минимум 5 символов длинной");
  }

}
