# Suprematism Donut Chart

An Angular 4 donut chart component.

#### Install
```bash
npm i -S CINBCUniversal/suprematism-donut-chart
```

#### Use
```html
<supre-donut-chart
  [values]="[80]"
  [width]="100px"
  [height]="90px"
  [innerWidth]="80%"
></supre-donut-chart>
```

#### View / Contribute
- Fork, clone locally, cd into, pull latest master, create own branch
- `npm install`
- `npm start` to run the example locally
- Add feature or fix. Make sure to update examples / tests / readme
- `npm run commit` to commit. The native git commit can be used, but this runs prettier on staged changes
- `git push [remote-name] [branch-name]` - a pre-push git hook ensures tests (unit/integration/linting/formatting) pass
- Make PR
- Eat :doughnut: :plate_with_cutlery:


## Components
- [`supre-donut-chart`](#supre-donut-chart)

### <a id="supre-donut-chart"></a> `supre-donut-chart`
A component for a donut chart.

#### Inputs
- `values: Array<number> | number` - The values the donut chart will display. If displaying a percentage, simply pass in the single percent number. This input is mandatory.
- `width: string` - The height of the donut chart. Will default to 100% if no value is specified.
- `height: string` - The width of the donut chart. Will default to 100% if no value is specified.
- `innerWidth: string` - The width of the donut hole as a percentage.  Will default to 80% if no value is specified
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
