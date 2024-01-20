import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TimeDisplayComponent } from './time-display.component';

describe('TimeDisplayComponent', () => {
    let component: TimeDisplayComponent;
    let fixture: ComponentFixture<TimeDisplayComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TimeDisplayComponent],
            imports: [FormsModule, ReactiveFormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeDisplayComponent);
        component = fixture.componentInstance;
        component.inputHours = new FormControl();
        component.inputMinutes = new FormControl();
        component.inputSeconds = new FormControl();
        fixture.detectChanges();
    });

    it('should start setting time', () => {
        component.canSetTime = true;
        spyOn(component.settingTime$, 'next');
        component.startSetTime();
        expect(component.settingTime$.next).toHaveBeenCalledWith(true);
    });

    it('should not start setting time if canSetTime is false', () => {
        component.canSetTime = false;
        spyOn(component.settingTime$, 'next');
        component.startSetTime();
        expect(component.settingTime$.next).not.toHaveBeenCalled();
    });

    it('should end setting time', () => {
        spyOn(component.settingTime$, 'next');
        component.endSetTime();
        expect(component.settingTime$.next).toHaveBeenCalledWith(false);
    });

    it('should emit set time on done', () => {
        spyOn(component.setTime, 'emit');
        component.inputHours.setValue(1);
        component.inputMinutes.setValue(1);
        component.inputSeconds.setValue(1);
        component.onDone();
        const expectedTime =
            component.inputHours.value * component['hourInMs'] +
            component.inputMinutes.value * component['minuteInMs'] +
            component.inputSeconds.value * component['secondInMs'];
        expect(component.setTime.emit).toHaveBeenCalledWith(expectedTime);
    });

    it('should calculate hours correctly', () => {
        component.time = 3600000; // 1 hour in milliseconds
        expect(component.hours).toEqual(1);
    });

    it('should calculate minutes correctly', () => {
        component.time = 60000; // 1 minute in milliseconds
        expect(component.minutes).toEqual(1);
    });

    it('should calculate seconds correctly', () => {
        component.time = 1000; // 1 second in milliseconds
        expect(component.seconds).toEqual(1);
    });

    it('should calculate cSeconds correctly', () => {
        component.time = 10; // 1 cSecond in milliseconds
        expect(component.cSeconds).toEqual(1);
    });

    it('should display time input form when settingTime$ is true', () => {
        component.settingTime$.next(true);
        fixture.detectChanges();
        const timeInputForm = fixture.debugElement.query(By.css('.time-input-form'));
        expect(timeInputForm).toBeTruthy();
    });

    it('should hide time input form when settingTime$ is false', () => {
        component.settingTime$.next(false);
        fixture.detectChanges();
        const timeInputForm = fixture.debugElement.query(By.css('.time-input-form'));
        expect(timeInputForm).toBeFalsy();
    });

    it('should call startSetTime method when time display is clicked', () => {
        spyOn(component, 'startSetTime');
        const timeDisplay = fixture.debugElement.query(By.css('div:not(.time-input-form)'));
        timeDisplay.triggerEventHandler('click', null);
        expect(component.startSetTime).toHaveBeenCalled();
    });

    it('should call onDone method when Done button is clicked', () => {
        component.settingTime$.next(true);
        fixture.detectChanges();
        spyOn(component, 'onDone');
        const doneButton = fixture.debugElement.query(By.css('button'));
        doneButton.triggerEventHandler('click', null);
        expect(component.onDone).toHaveBeenCalled();
    });
});
