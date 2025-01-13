import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
// import { AuthService } from 'src/services/auth-service';
import { BaseService } from 'src/services/base-service';
import { LocalStorageService } from 'src/services/localStorage-service';

@Component({
  selector: 'app-default-content',
  templateUrl: './default-content.component.html',
  styleUrls: ['./default-content.component.css']
})
export class DefaultContentComponent implements OnInit {

  username: String = '';

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    // private authService: AuthService,
  ) { }

  logout() {
    this.localStorage.removeItem("token");
    this.router.navigate(["/login"])

  }

  ngOnInit(): void {
    // this.authService.getUsername().subscribe((username: String) => {
    //   this.username = username;
    // })
  }

}
