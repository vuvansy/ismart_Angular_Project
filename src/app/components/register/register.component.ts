import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_pass: new FormControl('', [Validators.required]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.userForm.invalid) {
      alert('Vui lòng nhập hợp lệ');
      return;
    }

    // Kiểm tra confirm_pass và password khớp hay không
    if (
      this.userForm.get('password')?.value !==
      this.userForm.get('confirm_pass')?.value
    ) {
      alert('Mật khẩu xác nhận không khớp');
      return;
    }

    this.userService.save(this.user).subscribe((data) => {
      console.log(data);
      if (data) {
        if (data.status === 400) {
          alert(data.message);
        } else if (data.status === 200) {
          alert(data.message);
          this.router.navigate(['/login']);
        }
      } else {
        alert(data.message);
      }
    });
  }
}
