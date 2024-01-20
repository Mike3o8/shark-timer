import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimeDisplayComponent } from '../time-display/time-display.component';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';
import { StopwatchComponent } from './stopwatch.component';

describe('StopwatchComponent', () => {
    let component: StopwatchComponent;
    let fixture: ComponentFixture<StopwatchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [StopwatchComponent, TimeDisplayComponent, TimerControlsComponent],
            imports: [FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StopwatchComponent);
        component = fixture.componentInstance;
        component.controls = new TimerControlsComponent();
        fixture.detectChanges();
    });

    it('should reset timer on init', () => {
        spyOn(component, 'resetTimer');
        component.ngOnInit();
        expect(component.resetTimer).toHaveBeenCalled();
    });

    it('should complete reset$ and destroyed$ on destroy', () => {
        spyOn(component.reset$, 'complete');
        spyOn(component.destroyed$, 'next');
        spyOn(component.destroyed$, 'complete');
        component.ngOnDestroy();
        expect(component.reset$.complete).toHaveBeenCalled();
        expect(component.destroyed$.next).toHaveBeenCalled();
        expect(component.destroyed$.complete).toHaveBeenCalled();
    });

    it('should reset timer and stop controls on stopwatchReset$ emission', () => {
        spyOn(component, 'resetTimer');
        spyOn(component.controls, 'stop');
        component.controls.stopwatchReset$.next();
        component.ngOnInit();
        expect(component.resetTimer).toHaveBeenCalled();
        expect(component.controls.stop).toHaveBeenCalled();
    });

    it('should reset timer on resetTimer call', () => {
        spyOn(component.reset$, 'next');
        component.resetTimer();
        expect(component.reset$.next).toHaveBeenCalled();
    });
});
