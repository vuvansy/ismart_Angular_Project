import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit() {
    return this.categoryService.getAll().subscribe((data) => {
      this.categories = data as Category[];
      // console.log(this.categories);
    });
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
