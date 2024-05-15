import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  product!: Product;
  // products!: Product[];
  categories!: Category[];
  id: string;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.id = route.snapshot.params['id'];
    console.log(`id is ${this.id}`);
    this.productForm = new FormGroup({
      _id: new FormControl(null, Validators.required),
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
  ngOnInit() {
    forkJoin([
      this.productService.get(this.id),
      this.categoryService.getAll(),
    ]).subscribe(([products, categories]) => {
      this.product = products as Product;
      this.categories = categories as Category[];
      console.log(this.product);
      console.log(this.categories);
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      alert('Vui lòng nhập hợp lệ');
      return;
      console.log('Không hợp lệ');
    } else {
      this.productService.update(this.id, this.product).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/product-list']);
      });
    }
  }
}
