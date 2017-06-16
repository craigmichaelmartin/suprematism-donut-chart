import { CommonModule } from '@angular/common';
import { DonutChartComponent } from './donut-chart.component';
import { NgModule } from '@angular/core';

export * from './donut-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DonutChartComponent],
  exports: [DonutChartComponent],
  entryComponents: [DonutChartComponent]
})
export class DonutChartModule {}
