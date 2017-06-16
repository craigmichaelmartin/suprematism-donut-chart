import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DonutChartComponent } from './donut-chart.component';
import { DonutChartModule } from './index';

describe('Donut Chart', () => {
  let fixture: ComponentFixture<DonutChartComponent>;
  let componentInstance: DonutChartComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DonutChartModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DonutChartComponent);
    componentInstance = fixture.debugElement.componentInstance;
  });

  it('component should exist', () => {
    expect(componentInstance).toBeTruthy();
  });

  describe('donut text', () => {
    it(
      'should be the input if provided',
      async(() => {
        componentInstance.values = [80];
        componentInstance.outerRadius = 100;
        componentInstance.innerRadius = 96;
        componentInstance.text = 'foo';

        fixture.whenStable().then(() => {
          componentInstance.ngOnChanges();
          fixture.detectChanges();
          expect(componentInstance.text).toEqual('foo');
          const innerHTML = fixture.debugElement
            .query(By.css('.DonutChart-text'))
            .nativeElement.innerHTML.trim();
          expect(innerHTML).toEqual('foo');
        });
      })
    );
    it(
      'should be the single value if only one value and no text input',
      async(() => {
        componentInstance.values = [80];
        componentInstance.outerRadius = 100;
        componentInstance.innerRadius = 96;

        fixture.whenStable().then(() => {
          componentInstance.ngOnChanges();
          fixture.detectChanges();
          expect(componentInstance.text).toEqual('80%');
          const innerHTML = fixture.debugElement
            .query(By.css('.DonutChart-text'))
            .nativeElement.innerHTML.trim();
          expect(innerHTML).toEqual('80%');
        });
      })
    );
    it(
      'should be the nothing if more than one value and no text input',
      async(() => {
        componentInstance.values = [80, 20];
        componentInstance.outerRadius = 100;
        componentInstance.innerRadius = 96;

        fixture.whenStable().then(() => {
          componentInstance.ngOnChanges();
          fixture.detectChanges();
          expect(componentInstance.text).toBeFalsy();
          const innerHTML = fixture.debugElement
            .query(By.css('.DonutChart-text'))
            .nativeElement.innerHTML.trim();
          expect(innerHTML).toEqual('');
        });
      })
    );
  });
  describe('values segments', () => {
    it(
      'should be the input if array and more than two values',
      async(() => {
        componentInstance.values = [80, 90];
        componentInstance.outerRadius = 100;
        componentInstance.innerRadius = 96;

        fixture.whenStable().then(() => {
          componentInstance.ngOnChanges();
          expect(componentInstance.values).toEqual([80, 90]);
        });
      })
    );
    it(
      'should be array of value and offset in single value array ',
      async(() => {
        componentInstance.values = [80];
        componentInstance.outerRadius = 100;
        componentInstance.innerRadius = 96;

        fixture.whenStable().then(() => {
          componentInstance.ngOnChanges();
          expect(componentInstance.values).toEqual([80, 20]);
        });
      })
    );
    it(
      'should be array of value and offset in single number ',
      async(() => {
        componentInstance.values = 80;
        componentInstance.outerRadius = 100;
        componentInstance.innerRadius = 96;

        fixture.whenStable().then(() => {
          componentInstance.ngOnChanges();
          expect(componentInstance.values).toEqual([80, 20]);
        });
      })
    );
  });
});
