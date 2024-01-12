import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadStatusComponent } from './cad-status.component';

describe('CadStatusComponent', () => {
  let component: CadStatusComponent;
  let fixture: ComponentFixture<CadStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
