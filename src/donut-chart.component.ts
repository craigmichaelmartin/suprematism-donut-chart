import { Component, Input, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';
import { Pie } from 'd3-shape';

@Component({
  selector: 'supre-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartComponent implements OnChanges {
  private vals: Array<number>;
  @Input()
  get values(): Array<number> | number {
    return this.vals;
  };
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

  constructor(private elementRef: ElementRef) {}

  ngOnChanges() {
    this.elementRef.nativeElement.style.width = `${this.outerRadius * 2}px`;
    this.elementRef.nativeElement.style.height = `${this.outerRadius * 2}px`;
    this.elementRef.nativeElement.style.fontSize = `${this.outerRadius /
      1.5}px`;
    this.elementRef.nativeElement.classList.add('DonutChart');
    this.createDonutChart();
  }

  createDonutChart() {
    const pie: Pie<any, number | { valueOf(): number }> = d3.pie().sort(null);

    const arc: any = d3
      .arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius);

    const svg = d3
      .select(this.elementRef.nativeElement)
      .append('svg')
      .attr('width', this.outerRadius * 2)
      .attr('height', this.outerRadius * 2)
      .append('g')
      .attr('transform', `translate(${this.outerRadius},${this.outerRadius})`);

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
