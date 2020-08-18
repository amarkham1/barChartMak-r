function drawBarChart(data, options, element) {
  const DATALEN = data.length;
  const MAXVALUE = findMax(data);
  const CHARTHEIGHT = (options['height'] ? options['height'] : 400);
  const CHARTWIDTH = (options['width'] ? options['width'] : 600);
  const YAXISTICKS = (options['yAxisTicks'] ? options['yAxisTicks']: 5 );
  const TITLEHEIGHT = 40;
  const YAXISWIDTH = 40;
  const XAXISHEIGHT = 40;


  let chart = $('<div></div>').addClass('chart-container').width(CHARTWIDTH).height(CHARTHEIGHT);
  let title = $('<div></div>').addClass('title-container').width(CHARTWIDTH).height(TITLEHEIGHT);
  let yAxis = $('<div></div>').addClass('yAxis-container').width(YAXISWIDTH).height(CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT);
  let xAxis = $('<div></div>').addClass('xAxis-container').width(CHARTWIDTH).height(XAXISHEIGHT);
  chart.append(title);
  chart.append(yAxis);
  chart.append(xAxis);
  return $("body").append(chart);
}

function findMax(data) {
  if (data.length === 0) {
    return null;
  }

  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > max) {
      max = data[i];
    }
  }
  return max;
}
