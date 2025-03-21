import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtsSidenavComponent } from './cts-sidenav.component';

describe('CtsSidenavComponent', () => {
  let component: CtsSidenavComponent;
  let fixture: ComponentFixture<CtsSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtsSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
