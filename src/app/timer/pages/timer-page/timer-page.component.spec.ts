import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StopwatchComponent } from '../../components/stopwatch/stopwatch.component';
import { TimeDisplayComponent } from '../../components/time-display/time-display.component';
import { TimerControlsComponent } from '../../components/timer-controls/timer-controls.component';
import { TimerComponent } from '../../components/timer/timer.component';
import { TimerPageComponent } from './timer-page.component';

describe('TimerPageComponent', () => {
    let component: TimerPageComponent;
    let fixture: ComponentFixture<TimerPageComponent>;
    let mockRoute: ActivatedRoute;

    beforeEach(waitForAsync(() => {
        mockRoute = {
            data: of({ view: 'timer' })
        } as unknown as ActivatedRoute;

        TestBed.configureTestingModule({
            declarations: [
                TimerPageComponent,
                TimerComponent,
                StopwatchComponent,
                TimerControlsComponent,
                TimeDisplayComponent
            ],
            providers: [{ provide: ActivatedRoute, useValue: mockRoute }],
            imports: [FormsModule, RouterTestingModule, NoopAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should set selectedTabIndex$ to 0 for timer view', () => {
        component.ngOnInit();
        expect(component.selectedTabIndex$.value).toEqual(0);
    });

    it('should set selectedTabIndex$ to 1 for stopwatch view', () => {
        mockRoute.data = of({ view: 'stopwatch' });
        component.ngOnInit();
        expect(component.selectedTabIndex$.value).toEqual(1);
    });

    it('should complete destroyed$ on destroy', () => {
        spyOn(component.destroyed$, 'next');
        spyOn(component.destroyed$, 'complete');
        component.ngOnDestroy();
        expect(component.destroyed$.next).toHaveBeenCalled();
        expect(component.destroyed$.complete).toHaveBeenCalled();
    });

    it('should change tab on tabChange call', () => {
        component.tabChange(1);
        expect(component.selectedTabIndex$.value).toEqual(1);
    });
});
