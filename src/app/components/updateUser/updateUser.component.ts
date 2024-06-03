import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-updateUser',
  templateUrl: './updateUser.component.html',
  styleUrls: ['./updateUser.component.css'],
})
export class UpdateUserComponent implements OnInit {
  isValid = false;
  userForm: FormGroup;
  user: User;
  id: string;
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
    this.id = JSON.parse(sessionStorage.getItem('user') ?? '[]').data._id;
    console.log(this.id);
    this.user = new User();
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', [Validators.required]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.userService.get(this.id).subscribe((data) => {
      this.user = data as User;
      console.log(this.user);
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      alert('Vui lòng nhập hợp lệ');
      return;
    }

    // Kiểm tra confirm_pass và password khớp hay không
    // if (
    //   this.userForm.get('password')?.value !==
    //   this.userForm.get('confirm_pass')?.value
    // ) {
    //   alert('Mật khẩu xác nhận không khớp');
    //   return;
    // }

    this.userService.update(this.id, this.user).subscribe((data) => {
      console.log(data);
      if (data) {
        if (data.status === 200) {
          alert(data.message);
          // sessionStorage.setItem('user', JSON.stringify(data));
          location.assign('/');
        } else if (data.status === 400) {
          alert(data.error);
        }
      } else {
        alert(data.message);
      }
    });
  }
}
