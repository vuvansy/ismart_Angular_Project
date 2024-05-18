/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Detail_productComponent } from './detail_product.component';

describe('Detail_productComponent', () => {
  let component: Detail_productComponent;
  let fixture: ComponentFixture<Detail_productComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detail_productComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail_productComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
