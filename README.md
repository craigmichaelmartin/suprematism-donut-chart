# Suprematism Donut Chart

An Angular 4 donut chart component.

#### Installation
```bash
npm i -S CINBCUniversal/suprematism-donut-chart
```

#### View
- Run the example locally with `npm run example`



## Components
- [`supre-donut-chart`](#supre-donut-chart)

### <a id="supre-donut-chart"></a> `supre-donut-chart`
A component for a donut chart.

#### Inputs
- `values: Array<number> | number` - The values the donut chart will display. If displaying a percentage, simply pass in the single percent number. This input is mandatory.
- `outerRadius: number` - The outer radius of the donut chart. This input is mandatory.
- `innerRadius: number` - The inner radius of the donut chart. This input is mandatory.
- `text: string` - A value to be displayed. If there is a single number for `values`, that number will be used.
- `colors: Array<string>` - An array of colors to use for the donut sections. This defaults to `d3.schemeCategory20`. Alternatively, these sections may be styled using the exposed element classes (see below).

#### Hooks

##### Javascript (Events)
There are no events for this component

##### Styling (Classes)
Following SUIT CSS methodologies:
- `.DonutChart` - the parent
- `.DonutChart-text` - the text displayed, a descendent of .DonutChart
- `.DonutChart-section` - a section path, a descendent of .DonutChart
- `.DonutChart-section--[index]` - a specific section path, using the positions of the `values` input


## Example
```html
<supre-donut-chart
  [values]="[80]"
  [outerRadius]="100"
  [innerRadius]="90"
></supre-donut-chart>
```
