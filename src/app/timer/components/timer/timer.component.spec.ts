import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { TimeDisplayComponent } from '../time-display/time-display.component';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';
import { TimerComponent } from './timer.component';

class mockChangeDetectorRef {
    markForCheck = () => {};
}

describe('TimerComponent', () => {
    let component: TimerComponent;
    let fixture: ComponentFixture<TimerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TimerComponent, TimeDisplayComponent, TimerControlsComponent],
            providers: [{ provide: ChangeDetectorRef, useClass: mockChangeDetectorRef }],
            imports: [FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerComponent);
        component = fixture.componentInstance;
        component.controls = new TimerControlsComponent();
        fixture.detectChanges();
    });

    it('should reset timer on timerReset$ emission', fakeAsync(() => {
        spyOn(component, 'resetTimer');
        spyOn(component.controls, 'stop');
        spyOn(component['cd'], 'markForCheck');
        component.controls.timerReset$.next(0);
        component.ngOnInit();
        tick(100);
        expect(component.resetTimer).toHaveBeenCalled();
        expect(component.controls.stop).toHaveBeenCalled();
        expect(component['cd'].markForCheck).toHaveBeenCalled();
    }));

    it('should stop controls on settingTime$ emission', () => {
        spyOn(component.controls, 'stop');
        component.timeDisplay.settingTime$.next(true);
        component.ngOnInit();
        expect(component.controls.stop).toHaveBeenCalled();
    });

    it('should end setting time on timerStart$ emission', () => {
        spyOn(component.timeDisplay, 'endSetTime');
        component.controls.timerStart$.next(true);
        component.ngOnInit();
        expect(component.timeDisplay.endSetTime).toHaveBeenCalled();
    });

    it('should complete destroyed$ and reset$ on destroy', () => {
        spyOn(component.destroyed$, 'next');
        spyOn(component.destroyed$, 'complete');
        spyOn(component.reset$, 'complete');
        component.ngOnDestroy();
        expect(component.destroyed$.next).toHaveBeenCalled();
        expect(component.destroyed$.complete).toHaveBeenCalled();
        expect(component.reset$.complete).toHaveBeenCalled();
    });

    it('should reset timer on resetTimer call', () => {
        spyOn(component.reset$, 'next');
        spyOn(component.controls, 'end');
        component.resetTimer(1000);
        expect(component.reset$.next).toHaveBeenCalled();
        expect(component.controls.end).toHaveBeenCalled();
    });

    it('should set time on setTime call', () => {
        spyOn(component, 'resetTimer');
        component.setTime(1000);
        expect(component.resetTimer).toHaveBeenCalledWith(1000);
    });
});
