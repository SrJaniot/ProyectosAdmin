import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsquemasCrearComponent } from './esquemas-crear.component';

describe('EsquemasCrearComponent', () => {
  let component: EsquemasCrearComponent;
  let fixture: ComponentFixture<EsquemasCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsquemasCrearComponent]
    });
    fixture = TestBed.createComponent(EsquemasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
