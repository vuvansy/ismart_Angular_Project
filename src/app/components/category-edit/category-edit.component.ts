import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;
  category!: Category;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.id = route.snapshot.params['id'];
    console.log(`id is ${this.id}`);
    this.categoryForm = new FormGroup({
      _id: new FormControl(null, Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      image: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnInit() {
    //Lấy data category theo id
    this.categoryService.get(this.id).subscribe((data) => {
      this.category = data as Category;
      console.log(this.category);
    });
  }

  // onSubmit() {
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
    this.categoryService.update(this.id, this.category).subscribe((data) => {
      // console.log(data);
      this.router.navigate(['/category-list']);
    });
  }
}
