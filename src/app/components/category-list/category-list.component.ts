import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories!: Category[];

  constructor(
    private httpClient: HttpClient,
    private categoryService: CategoryService,
    private router: Router,
    private auth: AuthService
  ) {
    // if (!this.auth.checkAdmin()) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    return this.categoryService.getAll().subscribe(
      (data) => {
        this.categories = data as Category[]; //Trong trường hợp dữ liệu không khớp
      },
      (error: any) => {
        console.log(error);
        if (error && error.status === 401) {
          //Access Token hết hạn, lấy lại new access token từ refresh token
          try {
            const refreshToken = this.auth.getRefreshToken();
            console.log(refreshToken);
            if (!refreshToken) {
              //Nếu refresh Token không có thì redirect về trang login
              this.router.navigate(['/login']);
              return;
            }

            //Gọi API refresh token để lấy new access token
            this.auth
              .refreshToken({ refresh_token: refreshToken })
              .subscribe((res: any) => {
                console.log(res);

                //Cập nhật the access token và refresh token
                // let jsonData = JSON.stringify(res);
                // sessionStorage.setItem('user', jsonData);

                // Lấy dữ liệu user hiện tại từ sessionStorage
                let userJson = sessionStorage.getItem('user');
                let user = JSON.parse(userJson || '{}');

                // Cập nhật access_token và refresh_token mới
                user.access_token = res.access_token;
                user.refresh_token = res.refresh_token;

                // Lưu lại dữ liệu user đã cập nhật
                let jsonData = JSON.stringify(user);
                sessionStorage.setItem('user', jsonData);

                //Gọi lại API lấy danh sách danh mục
                this.categoryService.getAll().subscribe((data) => {
                  this.categories = data as Category[]; //Trường hợp dữ liệu khớp
                });
              });
          } catch (error) {
            console.error('Error refreshing token: ', error);
          }
        }
      }
    );
  }

  deleteCategory(id: string) {
    var result = confirm('Want to Delete?');
    if (result) {
      this.categoryService.delete(id).subscribe((data) => {
        // console.log(data);
        this.router.navigate(['/category-list']).then(() => {
          window.location.reload();
        });
      });
    }
  }
}
