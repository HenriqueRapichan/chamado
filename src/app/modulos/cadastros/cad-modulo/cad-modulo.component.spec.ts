import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadModuloComponent } from './cad-modulo.component';

describe('CadModuloComponent', () => {
  let component: CadModuloComponent;
  let fixture: ComponentFixture<CadModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadModuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
