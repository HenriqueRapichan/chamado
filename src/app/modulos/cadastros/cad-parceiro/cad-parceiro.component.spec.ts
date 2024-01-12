import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadParceiroComponent } from './cad-parceiro.component';

describe('CadParceiroComponent', () => {
  let component: CadParceiroComponent;
  let fixture: ComponentFixture<CadParceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadParceiroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
