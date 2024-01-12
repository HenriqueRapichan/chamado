import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadTipoDetalhamentoComponent } from './cad-tipo-detalhamento.component';

describe('CadTipoDetalhamentoComponent', () => {
  let component: CadTipoDetalhamentoComponent;
  let fixture: ComponentFixture<CadTipoDetalhamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadTipoDetalhamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadTipoDetalhamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
