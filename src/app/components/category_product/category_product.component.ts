import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category_product',
  templateUrl: './category_product.component.html',
  styleUrls: ['./category_product.component.css'],
})
export class Category_productComponent implements OnInit {
  products!: Product[];
  categories!: Category[];

  id: string;
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
    console.log(`id is ${this.id}`);
  }

  ngOnInit() {
    forkJoin([
      this.productService.getProductByCategoryId(this.id),
      this.categoryService.getAll(),
    ]).subscribe(([products, categories]) => {
      this.products = products as Product[];
      this.categories = categories as Category[];
      console.log(this.products);
      console.log(this.categories);
    });
  }

  //Hàm xử lý tên của DANH MỤC theo categoryId
  getCategoryName(categoryId: string): string {
    const category = this.categories.find((c) => c._id === categoryId);
    return category ? category.name : '';
  }
}
