import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtsHeaderComponent } from './cts-header.component';

describe('CtsHeaderComponent', () => {
  let component: CtsHeaderComponent;
  let fixture: ComponentFixture<CtsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
