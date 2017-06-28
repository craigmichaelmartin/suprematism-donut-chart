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

        fixture.whenStable().then(() => {
          expect(componentInstance.values).toEqual([80]);
        });
      })
    );
    it(
      'should be array of value and offset in single number ',
      async(() => {
        componentInstance.values = 80;

        fixture.whenStable().then(() => {
          expect(componentInstance.values).toEqual(80);
        });
      })
    );
  });
  describe('donut thickness', () => {
    it(
      'should correspond to inner width',
      async(() => {
        componentInstance.values = 80;
        componentInstance.innerWidth = '80%';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const svg = fixture.nativeElement.querySelector(
            '.DonutChart-section.DonutChart-section--0'
          ) as HTMLElement;
          expect(svg.getAttribute('d')).toBe(
            'M5.51091059616309e-16,-9A9,9,0,1,1,-8.559508646656383,' +
              '-2.7811529493745257L-6.847606917325106,-2.2249223594' +
              '996206A7.2,7.2,0,1,0,4.4087284769304716e-16,-7.2Z'
          );
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
                       [width]="width"
                       [height]="height"
                       [innerWidth]="innerWidth">
      33
    </supre-donut-chart>
  `
})
class TestComponent {
  values: number | Array<number>;
  width: string;
  height: string;
  innerWidth: string;
}
