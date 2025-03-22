import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, RouterOutlet } from '@angular/router';

import { CtsHeaderComponent } from './cts-header.component';

describe('CtsHeaderComponent', () => {
	let component: CtsHeaderComponent;
	let fixture: ComponentFixture<CtsHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CtsHeaderComponent, RouterModule, RouterOutlet]
		}).compileComponents();

		fixture = TestBed.createComponent(CtsHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
