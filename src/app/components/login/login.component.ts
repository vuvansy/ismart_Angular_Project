import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
    this.user = new User();
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}
  onSubmit() {
    if (this.userForm.invalid) {
      alert('Vui lòng nhập hợp lệ');
      return;
    }

    const { username, password } = this.userForm.value;
    console.log(username, password);
    this.userService.login(username, password).subscribe((data) => {
      console.log(data);
      if (data) {
        if (data.status === 300) {
          alert(data.message);
        } else if (data.status === 200) {
          alert(data.message);
          sessionStorage.setItem('user', JSON.stringify(data.data));
          this.router.navigate(['/home']);
        }
      } else {
        alert(data.message);
      }
    });
  }
}
