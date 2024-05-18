/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Category_productComponent } from './category_product.component';

describe('Category_productComponent', () => {
  let component: Category_productComponent;
  let fixture: ComponentFixture<Category_productComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Category_productComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Category_productComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
