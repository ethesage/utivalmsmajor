import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import months from 'data/months';

am4core.useTheme(am4themes_animated);

const colors = ['#120C64', '#09AC23', '#FFB800', '#0077B5'];

export const position_pie = (data, id) => {
  var chart = am4core.create(id, am4charts.PieChart);
  chart.data = data;

  // Set inner radius
  chart.innerRadius = am4core.percent(65);

  //Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = 'value';
  pieSeries.dataFields.category = 'name';

  //removes ticks
  pieSeries.labels.template.disabled = true;

  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

  // Add legend
  chart.legend = new am4charts.Legend();
  chart.legend.scrollable = true;

  chart.legend.position = 'bottom';
  chart.legend.maxWidth = 600;

  chart.legend.labels.template.fontSize = '12px';
  chart.legend.valueLabels.template.fontSize = '12px';

  chart.legend.labels.template.fill = am4core.color('#888');
  chart.legend.valueLabels.template.fill = am4core.color('#888');

  let marker = chart.legend.markers.template.children.getIndex(0);
  marker.width = 17;
  marker.height = 17;
  marker.cornerRadius(12, 12, 12, 12);

  // pieSeries.legendSettings.valueText = '{value}({value}/100%)'; //{category} |

  var colorSet = new am4core.ColorSet();
  colorSet.list = colors.map(function (color) {
    return new am4core.color(color);
  });
  pieSeries.colors = colorSet;

  return chart;
};

export function position_bar(data, id) {
  // Create chart instance
  am4core.addLicense('CH123616381');
  var chart = am4core.create(id, am4charts.XYChart);

  const datas = months.reduce((acc, cur) => {
    if (data[cur.name]) {
      return [...acc, { name: cur.name, value: data[cur.name] }];
    }
    return [...acc, cur];
  }, []);

  chart.data = datas;

  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = 'name';
  categoryAxis.renderer.grid.template.disabled = true;
  categoryAxis.renderer.minGridDistance = 20;
  categoryAxis.renderer.cellStartLocation = 0.1;
  categoryAxis.renderer.cellEndLocation = 0.5;
  categoryAxis.renderer.labels.template.horizontalCenter = 'right';
  categoryAxis.renderer.labels.template.fontSize = 12;
  categoryAxis.renderer.labels.template.fill = '#888';

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.labels.template.fontSize = 12;
  valueAxis.renderer.labels.template.fill = '#888';
  valueAxis.renderer.grid.template.strokeDasharray = '10,10';

  let series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = 'value';
  series.dataFields.categoryX = 'name';
  series.columns.template.column.strokeWidth = 0;
  series.columns.template.width = am4core.percent(20);
  series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
  series.columns.template.column.adapter.add('fill', (fill, target) => {
    return colors[target.dataItem.index];
  });

  return chart;
}
