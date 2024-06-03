import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, forkJoin } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products!: Product[];
  categories!: Category[];
  name!: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  // ngOnInit() {
  //   // forkJoin([this.categoryService.getAll()]).subscribe(([categories]) => {
  //   //   this.categories = categories as Category[];
  //   //   console.log(this.categories);
  //   // });
  //   this.route.queryParams.subscribe((params) => {
  //     const name = params['name'];
  //     console.log(name);
  //     this.loadProducts(name);
  //     // console.log(this.loadProducts(name));
  //   });
  // }

  // loadProducts(name?: string) {
  //   this.productService.getSearch(this.name).subscribe((products) => {
  //     this.products = products as Product[];
  //   });
  // }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const name = params['name'];
      // console.log(name);
      this.getProductsByName(name);
    });

    this.getAllCategories();
  }

  getProductsByName(name: string) {
    this.productService.searchProductsByName(name).subscribe(
      (data) => {
        this.products = data as Product[];
        // console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(
      (data) => {
        this.categories = data as Category[];
        // console.log(this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
