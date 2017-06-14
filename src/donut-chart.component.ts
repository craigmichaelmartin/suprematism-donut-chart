import {
  Component,
  Input,
  ElementRef,
  OnDestroy,
  OnChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'supre-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent {
  @ViewChild('donutChart') el: ElementRef;
  @Input() values: Array<number> | number;
  @Input() outerRadius: number;
  @Input() innerRadius: number;
  @Input() text: string;
  @Input() colors: Array<string> = d3.schemeCategory20;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges() {
    if (!Array.isArray(this.values)) {
      this.values = [this.values];
    }
    if (this.values.length === 1) {
      const value = this.values[0];
      if (!this.text) {
        this.text = `${value}%`;
      }
      this.values = this.values.concat(100 - value);
    }
    this.elementRef.nativeElement.style.width = `${this.outerRadius * 2}px`;
    this.elementRef.nativeElement.style.height = `${this.outerRadius * 2}px`;
    this.elementRef.nativeElement.style.fontSize = `${this.outerRadius /
      1.5}px`;
    this.elementRef.nativeElement.classList.add('DonutChart');
    this.createDonutChart();
  }

  createDonutChart() {
    const pie = d3.pie().sort(null);

    const arc = d3
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
      .data(pie(this.values))
      .enter()
      .append('path')
      .attr('class', (d, i) => `DonutChart-section DonutChart-section--${i}`)
      .attr('fill', (d, i) => this.colors[i % this.colors.length])
      .attr('d', arc);
  }
}
