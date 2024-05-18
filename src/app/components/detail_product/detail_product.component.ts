import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-detail_product',
  templateUrl: './detail_product.component.html',
  styleUrls: ['./detail_product.component.css'],
})
export class Detail_productComponent implements OnInit {
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
}
