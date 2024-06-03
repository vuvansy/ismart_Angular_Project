import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  // isLogin = false;
  isLogin: any;
  isADM: any;

  constructor(private router: Router, private auth: AuthService) {
    this.isLogin = this.auth.checkLogin();
    this.isADM = this.auth.checkAdmin();
  }

  ngOnInit() {
    // if (sessionStorage.getItem('user')) {
    //   this.isLogin = true;
    // }
  }

  onSearch() {
    this.router.navigate(['/home'], {
      queryParams: { name: this.searchTerm },
    });
  }

  onLogout() {
    sessionStorage.clear();
    location.assign('/');
  }
}
