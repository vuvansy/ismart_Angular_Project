import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  categories!: Category[];

  constructor(
    private httpClient: HttpClient,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.product = new Product();
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      product_image: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      categoryId: new FormControl('', Validators.required),
      price_new: new FormControl('', Validators.required),
      price_old: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  // ngOnInit() {
  // }

  onSubmit() {
    const nameControl = this.productForm.get('name');
    const imageControl = this.productForm.get('image');

    if (this.productForm.invalid) {
      alert('Vui lòng nhập hợp lệ');
      return;
      console.log('Không hợp lệ');
    } else {
      this.productService.save(this.product).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/product-list']);
      });
    }
  }

  ngOnInit() {
    forkJoin([this.categoryService.getAll()]).subscribe(([categories]) => {
      this.categories = categories as Category[];
      console.log(this.categories);
    });
  }
}
