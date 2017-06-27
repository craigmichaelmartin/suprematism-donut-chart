import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DonutChartModule } from './index';
import { Component } from '@angular/core';

describe('Donut Chart', () => {
  let fixture: ComponentFixture<TestComponent>;
  let componentInstance: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DonutChartModule],
      declarations: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    componentInstance = fixture.debugElement.componentInstance;
  });

  it('component should exist', () => {
    expect(componentInstance).toBeTruthy();
  });

  describe('donut content', () => {
    it(
      'should be text if provided',
      async(() => {
        const innerHTML = fixture.debugElement
          .query(By.css('.DonutChart-text'))
          .nativeElement.innerHTML.trim();
        expect(innerHTML).toEqual('33');
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
        fixture.detectChanges();
        fixture.whenStable().then(() => {
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
          expect(componentInstance.values).toEqual([80]);
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
          expect(componentInstance.values).toEqual(80);
        });
      })
    );
  });
});

/**
 * Test component that contains a donut chart.
 */
@Component({
  selector: 'supre-test-comp',
  template: `
    <supre-donut-chart [values]="values"
                       [outerRadius]="outerRadius"
                       [innerRadius]="innerRadius">
      33
    </supre-donut-chart>
  `
})
class TestComponent {
  values: number | Array<number>;
  outerRadius: number;
  innerRadius: number;
}
