import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  http: HttpClient;

  // TODO get username from api
  constructor(private router: Router) {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit() {
  }

}
