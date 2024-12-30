import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LocalStorageService } from 'src/services/localStorage-service';

@Component({
  selector: 'app-default-content',
  templateUrl: './default-content.component.html',
  styleUrls: ['./default-content.component.css']
})
export class DefaultContentComponent implements OnInit {

  constructor(private localStorage: LocalStorageService,private router: Router) { }

  logout() {
    this.localStorage.removeItem("token");
    this.router.navigate(["/login"])

  }

  ngOnInit(): void {
  }

}
