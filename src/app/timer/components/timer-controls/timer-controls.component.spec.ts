import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { TimerControlsComponent } from './timer-controls.component';

describe('TimerControlsComponent', () => {
    let component: TimerControlsComponent;
    let fixture: ComponentFixture<TimerControlsComponent>;
    let mockAlarmElementRef: jasmine.SpyObj<ElementRef>;

    beforeEach(waitForAsync(() => {
        mockAlarmElementRef = jasmine.createSpyObj('ElementRef', ['nativeElement']);

        TestBed.configureTestingModule({
            declarations: [TimerControlsComponent],
            providers: [{ provide: ElementRef, useValue: mockAlarmElementRef }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should start timer or stopwatch', () => {
        component.timerActive = true;
        component.timerEnd$.next(false);
        component.timerStart$.next(false);
        component.startStop();
        expect(component.timerStart$.value).toBeTrue();

        component.timerActive = false;
        component.stopwatchStart$.next(false);
        component.startStop();
        expect(component.stopwatchStart$.value).toBeTrue();
    });

    it('should stop timer or stopwatch', () => {
        component.timerActive = true;
        component.timerStart$.next(true);
        component.stop();
        expect(component.timerStart$.value).toBeFalse();

        component.timerActive = false;
        component.stopwatchStart$.next(true);
        component.stop();
        expect(component.stopwatchStart$.value).toBeFalse();
    });

    it('should reset timer or stopwatch', () => {
        component.timerActive = true;
        spyOn(component, 'stopAlarm');
        component.reset();
        expect(component.timerReset$.value).toEqual(0);
        expect(component.stopAlarm).toHaveBeenCalled();

        spyOn(component.stopwatchReset$, 'next');
        component.timerActive = false;
        component.stopwatchReset$.next();
        component.reset();
        expect(component.stopwatchReset$.next).toHaveBeenCalled();
    });

    it('should end timer', () => {
        spyOn(component, 'startAlarm');
        component.end(true);
        expect(component.timerEnd$.value).toBeTrue();
        expect(component.startAlarm).toHaveBeenCalled();
    });

    it('should toggle alarm', () => {
        component.alarmEnabled$.next(false);
        component.alarmSounding$.next(true);
        spyOn(component.alarm, 'play');
        spyOn(component.alarm, 'pause');
        component.toggleAlarm();
        expect(component.alarmEnabled$.value).toBeTrue();
        expect(component.alarm.play).toHaveBeenCalled();

        component.alarmEnabled$.next(true);
        component.alarmSounding$.next(true);
        component.toggleAlarm();
        expect(component.alarmEnabled$.value).toBeFalse();
        expect(component.alarm.pause).toHaveBeenCalled();
    });

    it('should start alarm', () => {
        component.alarmEnabled$.next(true);
        component.alarmSounding$.next(false);
        spyOn(component.alarm, 'play');
        component.startAlarm();
        expect(component.alarmSounding$.value).toBeTrue();
        expect(component.alarm.play).toHaveBeenCalled();
    });

    it('should stop alarm', () => {
        component.alarmEnabled$.next(true);
        component.alarmSounding$.next(true);
        spyOn(component.alarm, 'pause');
        component.stopAlarm();
        expect(component.alarmSounding$.value).toBeFalse();
        expect(component.alarm.pause).toHaveBeenCalled();
    });

    it('should toggle fullscreen', () => {
        component.fullScreen$.next(false);
        component.toggleFullscreen();
        expect(component.fullScreen$.value).toBeTrue();
    });

    it('should return correct started value', () => {
        component.timerActive = true;
        component.timerStart$.next(true);
        expect(component.started).toBeTrue();

        component.timerActive = false;
        component.stopwatchStart$.next(true);
        expect(component.started).toBeTrue();
    });
});
