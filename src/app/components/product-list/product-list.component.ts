import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  categories!: Category[];

  constructor(
    private httpClient: HttpClient,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  // ngOnInit() {
  //   return this.productService
  //     .getAll()
  //     .subscribe((data) => (this.products = data as Product[]));
  //   console.log(this.products);
  // }

  ngOnInit() {
    forkJoin([
      this.productService.getAll(),
      this.categoryService.getAll(),
    ]).subscribe(([products, categories]) => {
      this.products = products as Product[];
      this.categories = categories as Category[];
      // console.log(this.products);
      // console.log(this.categories);
    });
  }

  //Hàm xử lý tên của DANH MỤC theo categoryId
  getCategoryName(categoryId: string): string {
    const category = this.categories.find((c) => c._id === categoryId);
    return category ? category.name : '';
  }

  deleteProduct(id: string) {
    var result = confirm('Want to Delete?');
    if (result) {
      this.productService.delete(id).subscribe((data) => {
        // console.log(data);
        this.router.navigate(['/product-list']).then(() => {
          window.location.reload();
        });
      });
    }
  }
}
