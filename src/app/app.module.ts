import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Các gói của Angular

import { RouterModule, Routes } from '@angular/router'; // khai báo dùng cho routes
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import Components vào
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';

// Định nghĩa các roures trong dự án
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent }, //Đường dẫn
  { path: 'register', component: RegisterComponent },
  { path: 'category-add', component: CategoryAddComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'category-edit/:id', component: CategoryEditComponent },
  { path: 'category-delete/:id', component: CategoryDeleteComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryDeleteComponent,
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
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
