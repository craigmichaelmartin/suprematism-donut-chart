import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
  OnInit,
  HostBinding,
  AfterViewChecked
} from '@angular/core';
import * as d3 from 'd3';
import { Pie } from 'd3-shape';

@Component({
  selector: 'supre-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartComponent
  implements OnInit, OnChanges, AfterViewChecked {
  private vals: Array<number>;
  private chart;
  private calculatedHeight: number;
  private calculatedWidth: number;
  private ht: string;
  private wd: string;

  @Input()
  get values(): Array<number> | number {
    return this.vals;
  }
  set values(vals: Array<number> | number) {
    if (Array.isArray(vals)) {
      this.vals = vals;
    } else {
      this.vals = [vals];
    }

    if (this.vals.length === 1) {
      const value = this.vals[0];
      this.vals = this.vals.concat(100 - value);
    }
  }
  @Input() outerRadius: number;
  @Input() innerRadius: number;
  @Input() colors: Array<string> = d3.schemeCategory20;

  /**
   * Height of the component in px or %.  Defaults to 100% if no height is specified.
   * @returns {string}
   */
  @Input()
  @HostBinding('style.height')
  get height(): string {
    return this.ht ? this.ht : '100%';
  }
  set height(ht: string) {
    this.ht = ht;
  }

  /**
   * Width of the component in px or %.  Defaults to 100% if no width is specified.
   * @returns {string}
   */
  @Input()
  @HostBinding('style.width')
  get width(): string {
    return this.wd ? this.wd : '100%';
  }
  set width(wd: string) {
    this.wd = wd;
  }

  @HostBinding('class.DonutChart') true;

  constructor(private elementRef: ElementRef) {}

  public ngOnInit() {
    this.createDonutChart();
  }

  ngOnChanges() {
    this.calculateDimensions();
    this.innerRadius = this.outerRadius / 5 * 4;
  }

  ngAfterViewChecked() {
    this.calculateDimensions();
    this.elementRef.nativeElement.style.fontSize = `${this.outerRadius /
      1.5}px`;
  }

  private calculateDimensions() {
    this.calculatedHeight = this.elementRef.nativeElement.getBoundingClientRect().height;
    this.calculatedWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
    this.outerRadius =
      Math.min(this.calculatedWidth, this.calculatedHeight) / 2;
  }

  createDonutChart() {
    const pie: Pie<any, number | { valueOf(): number }> = d3.pie().sort(null);

    const arc: any = d3
      .arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius);

    const side = Math.min(this.calculatedWidth, this.calculatedHeight);
    const svg = d3
      .select(this.elementRef.nativeElement)
      .selectAll('svg')
      .attr('viewBox', `0 0 ${side} ${side}`)
      .append('g')
      .attr('class', 'donut')
      .attr('transform', `translate(${side / 2}, ${side / 2})`);

    const path = svg
      .selectAll('path')
      .data(pie(this.vals))
      .enter()
      .append('path')
      .attr('class', (d, i) => `DonutChart-section DonutChart-section--${i}`)
      .attr('fill', (d, i) => this.colors[i % this.colors.length])
      .attr('d', arc);
  }
}
