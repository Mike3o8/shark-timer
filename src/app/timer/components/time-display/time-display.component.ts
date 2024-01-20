import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-time-display',
    templateUrl: './time-display.component.html',
    styleUrls: ['./time-display.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeDisplayComponent {
    private hourInMs = 3600000;
    private minuteInMs = 60000;
    private secondInMs = 1000;

    @Input() time: number = 12 * this.hourInMs + 34 * this.minuteInMs + 56 * 1000 + 780;
    @Input() showHundredths: boolean = true;
    @Input() canSetTime: boolean = false;

    @Output() setTime = new EventEmitter<number>();

    settingTime$ = new BehaviorSubject<boolean>(false);
    inputHours = new FormControl(0);
    inputMinutes = new FormControl(0);
    inputSeconds = new FormControl(0);

    constructor() {}

    startSetTime() {
        if (this.canSetTime) {
            this.settingTime$.next(true);
            this.inputHours.setValue(this.hours);
            this.inputMinutes.setValue(this.minutes);
            this.inputSeconds.setValue(this.seconds);
        }
    }

    endSetTime() {
        this.settingTime$.next(false);
    }

    onDone() {
        this.setTime.emit(
            this.inputHours.value * this.hourInMs +
                this.inputMinutes.value * this.minuteInMs +
                this.inputSeconds.value * this.secondInMs
        );
        this.endSetTime();
    }

    get hours(): number {
        return Math.floor(this.time / this.hourInMs);
    }

    get hoursDigitTwo(): number {
        return this.digitTwo(this.hours);
    }
    get hoursDigitOne(): number {
        return this.digitOne(this.hours);
    }

    get minutes(): number {
        return Math.floor((this.time / this.minuteInMs) % 60);
    }

    get minutesDigitTwo(): number {
        return this.digitTwo(this.minutes);
    }
    get minutesDigitOne(): number {
        return this.digitOne(this.minutes);
    }

    get seconds(): number {
        return Math.floor((this.time / this.secondInMs) % 60);
    }

    get secondsDigitTwo(): number {
        return this.digitTwo(this.seconds);
    }
    get secondsDigitOne(): number {
        return this.digitOne(this.seconds);
    }

    get cSeconds(): number {
        return Math.floor((this.time / 10) % 100);
    }

    get cSecondsDigitTwo(): number {
        return this.digitTwo(this.cSeconds);
    }
    get cSecondsDigitOne(): number {
        return this.digitOne(this.cSeconds);
    }

    get isButtonDisabled(): boolean {
        return (
            !!this.inputHours.errors ||
            !!this.inputMinutes.errors ||
            !!this.inputSeconds.errors ||
            (!this.inputHours.value && !this.inputMinutes.value && !this.inputSeconds.value)
        );
    }

    private digitTwo(val: number) {
        return Math.floor((val / 10) % 10);
    }
    private digitOne(val: number) {
        return val % 10;
    }
}
