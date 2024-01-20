import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaterialModule } from '../../../material/material.module';
import { TimerControlsComponent } from './timer-controls.component';

describe('TimerControlsComponent', () => {
    let component: TimerControlsComponent;
    let fixture: ComponentFixture<TimerControlsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TimerControlsComponent],
            imports: [MaterialModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
