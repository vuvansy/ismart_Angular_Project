import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
})
export class CategoryAddComponent implements OnInit {
  categoryForm: FormGroup;
  category: Category;
  constructor(
    private httpClient: HttpClient,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.category = new Category();
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      image: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnInit() {}

  // onSubmit() {
  //   const nameControl = this.categoryForm.get('name');
  //   const imageControl = this.categoryForm.get('image');

  //   if (this.categoryForm.invalid) {
  //     alert('Vui lòng nhập hợp lệ');
  //     return;
  //     console.log('Không hợp lệ');
  //   } else {
  //     this.categoryService.save(this.category).subscribe((data) => {
  //       console.log(data);
  //       this.router.navigate(['/category-list']);
  //     });
  //   }
  // }
  onSubmit(): void {
    const nameControl = this.categoryForm.get('name')!;
    const imageControl = this.categoryForm.get('image')!;
    //Dấu chấm than (!) sau this.categoryForm.get('name')
    //khẳng định rằng nameControl sẽ không bao giờ là null.

    if (nameControl.invalid || imageControl.invalid) {
      if (
        nameControl.errors?.['required'] &&
        imageControl.errors?.['required']
      ) {
        alert('Vui lòng nhập tên danh mục và đường dẫn hình ảnh');
      } else if (nameControl.errors?.['required']) {
        alert('Vui lòng nhập tên danh mục');
      } else if (imageControl.errors?.['required']) {
        alert('Vui lòng nhập đường dẫn hình ảnh');
      }

      if (nameControl.errors?.['minlength']) {
        alert('Tên danh mục phải có ít nhất 6 ký tự');
      }

      if (imageControl.errors?.['minlength']) {
        alert('Đường dẫn hình ảnh phải có ít nhất 6 ký tự');
      }

      return;
    }

    // Tiếp tục xử lý khi biểu mẫu hợp lệ
    this.categoryService.save(this.category).subscribe((data) => {
      // console.log(data);
      this.router.navigate(['/category-list']);
    });
  }
}
