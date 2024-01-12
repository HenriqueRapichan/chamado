import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadSistemaComponent } from './cad-sistema.component';

describe('CadSistemaComponent', () => {
  let component: CadSistemaComponent;
  let fixture: ComponentFixture<CadSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadSistemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
