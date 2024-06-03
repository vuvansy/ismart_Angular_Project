import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Các gói của Angular

import { RouterModule, Routes, CanActivate } from '@angular/router'; // khai báo dùng cho routes
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import Components vào
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//Category Admin
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
//Product Admin
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
//Category-Product User
import { Category_productComponent } from './components/category_product/category_product.component';
import { Detail_productComponent } from './components/detail_product/detail_product.component';
import { AuthService } from './services/auth.service';
import { UpdateUserComponent } from './components/updateUser/updateUser.component';

import { AuthGuard } from 'src/auth/auth-guard';
import { AdminGuard } from 'src/auth/admin-guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Định nghĩa các roures trong dự án
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent }, //Đường dẫn
  { path: 'register', component: RegisterComponent },
  {
    path: 'update-user',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'category-list',
    component: CategoryListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'category-edit/:id',
    component: CategoryEditComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'category-add',
    component: CategoryAddComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'product-add',
    component: ProductAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    canActivate: [AdminGuard],
  },

  { path: 'category-product/:id', component: Category_productComponent },
  { path: 'detail-product/:id', component: Detail_productComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  declarations: [
    // Nơi Khai báo Components được tạo ra
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,

    LoginComponent,
    RegisterComponent,
    UpdateUserComponent,

    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryDeleteComponent,

    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,

    Category_productComponent,
    Detail_productComponent,
    PageNotFoundComponent,
  ],
  imports: [
    //Nơi khai báo các tính năng (gói của Angular)
    BrowserModule,
    /*
    FormsModule được sử dụng cho các biểu mẫu
    ví dụ: khi sử dụng binding 2 chiều ([(ngModel)] = "product.productName") trong form > input (component.html) thì xuất hiện lỗi "Can't bind to 'ngModel'..."
    */
    FormsModule,
    ReactiveFormsModule,
    /*
    Angular thường được sử dụng để phát triển ứng dụng đơn trang (SPA),
    và RouterModule được sử dụng để thiết lập định tuyến trong ứng dụng của bạn.
    Phương thức forRoot để nạp các thông tin của Routes.
    */
    /*
   Module này cần thiết để thực hiện các yêu cầu HTTP trong ứng dụng Angular cảu bạn bằng cách
   sử dụng HttpCline của Angular. Nó cung cấp một cách thuận tiện để giao tiếp với máy chủ hoặc API bên ngoài
   */
    HttpClientModule,
    /*
    RouterModule.forRoot() trong ứng dụng Angular, chúng ta đang cấu hình router module ở cấp ứng dụng.
    Các tuyến đường (routes) được định nghĩa trong RouterModule.forRoot() sẽ có hiệu lực trong toàn bộ ứng dụng.
    */
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
