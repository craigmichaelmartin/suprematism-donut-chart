import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
  OnInit,
  HostBinding
} from '@angular/core';
import * as d3 from 'd3';
import { Pie } from 'd3-shape';

@Component({
  selector: 'supre-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartComponent implements OnInit, OnChanges {
  private static readonly outerRadius = 50;
  private vals: Array<number>;
  private thickness: number;

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

  @Input() colors: Array<string> = d3.schemeCategory20;

  /**
   * The thickness of the donut.  Defaults to 20% if no value is specified.
   */
  @Input()
  get thicknessPct(): number {
    return this.thickness ? this.thickness / 2 : 10;
  }
  set thicknessPct(thickness: number) {
    this.thickness = thickness;
  }

  @HostBinding('class.DonutChart') true;

  constructor(private elementRef: ElementRef) {}

  public ngOnInit() {
    this.createDonutChart();
  }

  ngOnChanges() {
    this.clearChart();
    this.createDonutChart();
  }

  createDonutChart() {
    const pie: Pie<any, number | { valueOf(): number }> = d3.pie().sort(null);

    const arc: any = d3
      .arc()
      .innerRadius(DonutChartComponent.outerRadius - this.thicknessPct)
      .outerRadius(DonutChartComponent.outerRadius);

    const svg = d3
      .select(this.elementRef.nativeElement)
      .selectAll('svg')
      .attr('viewBox', '0 0 100 100')
      .append('g')
      .attr('class', 'donut')
      .attr('transform', 'translate(50, 50)');

    const path = svg
      .selectAll('path')
      .data(pie(this.vals))
      .enter()
      .append('path')
      .attr('class', (d, i) => `DonutChart-section DonutChart-section--${i}`)
      .attr('fill', (d, i) => this.colors[i % this.colors.length])
      .attr('d', arc);
  }

  private clearChart() {
    d3.select(this.elementRef.nativeElement).selectAll('g').remove();
  }
}
