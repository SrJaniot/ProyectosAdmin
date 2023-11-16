import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsquemasEditarComponent } from './esquemas-editar.component';

describe('EsquemasEditarComponent', () => {
  let component: EsquemasEditarComponent;
  let fixture: ComponentFixture<EsquemasEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsquemasEditarComponent]
    });
    fixture = TestBed.createComponent(EsquemasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
