import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsquemasListaComponent } from './esquemas-lista.component';

describe('EsquemasListaComponent', () => {
  let component: EsquemasListaComponent;
  let fixture: ComponentFixture<EsquemasListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsquemasListaComponent]
    });
    fixture = TestBed.createComponent(EsquemasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
