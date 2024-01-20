import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../../material/material.module';
import { TimeDisplayComponent } from './time-display.component';

describe('TimeDisplayComponent', () => {
    let component: TimeDisplayComponent;
    let fixture: ComponentFixture<TimeDisplayComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TimeDisplayComponent],
            imports: [MaterialModule, FormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeDisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
