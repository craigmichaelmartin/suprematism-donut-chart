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
      'should correspond to thicknessPct',
      async(() => {
        componentInstance.values = 80;
        componentInstance.thicknessPct = 20;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const svg = fixture.nativeElement.querySelector(
            '.DonutChart-section.DonutChart-section--0'
          ) as HTMLElement;
          expect(svg.getAttribute('d')).toBe(
            'M3.061616997868383e-15,-50A50,50,0,1,1,-47.55282581475768,' +
              '-15.450849718747364L-38.042260651806146,-12.3606797' +
              '74997891A40,40,0,1,0,2.4492935982947065e-15,-40Z'
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
                       [style.width]="width"
                       [style.height]="height"
                       [thicknessPct]="thicknessPct">
      33
    </supre-donut-chart>
  `
})
class TestComponent {
  values: number | Array<number>;
  width: string;
  height: string;
  thicknessPct: number;
}
