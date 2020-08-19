function drawBarChart(data, options, element) {
  const DATALEN = data.length;
  const MAXVALUE = findMax(data);
  const CHARTHEIGHT = (options['height'] ? options['height'] : 400);
  const CHARTWIDTH = (options['width'] ? options['width'] : 600);
  const YAXISTICKS = (options['yAxisTicks'] ? options['yAxisTicks']: 5 );
  const YAXISMAX = (Math.floor(MAXVALUE / YAXISTICKS) + 1) * YAXISTICKS;
  const TITLEHEIGHT = 40;
  const YAXISWIDTH = 40;
  const XAXISHEIGHT = 40;
  const XAXISWIDTH = CHARTWIDTH - YAXISWIDTH;
  const TITLECOLOUR = (options['titleColour'] ? options['titleColour']: "gray" );
  const TITLEFONTSIZE = (options['titleFontSize'] ? options['titleFontSize']: "20" );
  const TITLETEXT = (options['titleText'] ? options['titleText']: 'YOUR CHART TITLE!' );

  let chart = $('<div></div>').addClass('chart-container').width(CHARTWIDTH).height(CHARTHEIGHT);

  let titleContainer = $('<div></div>').addClass('title-container').width(CHARTWIDTH).height(TITLEHEIGHT);
  let titleText = $('<div>' + TITLETEXT + '</div>').addClass('title-text').css({
    fontSize: TITLEFONTSIZE + 'px',
    color: TITLECOLOUR
  });
  let title = titleContainer.append(titleText);
  chart.append(title);

  let yAxisContainer = $('<div></div>').addClass('yAxis-container').width(YAXISWIDTH).height(CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT);
  for(i = 0; i < YAXISTICKS; i++) {
    let yAxisTick = $('<div>' + (YAXISMAX - (i * YAXISMAX / YAXISTICKS)) + '</div>').addClass('yAxisTick').width(YAXISWIDTH).height((CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT) / YAXISTICKS);
    yAxisContainer.append(yAxisTick);
  }
  chart.append(yAxisContainer);

  let dataBox = $('<div></div>').addClass('data-container').width(CHARTWIDTH - YAXISWIDTH).height(CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT);
  for(i = 0; i < DATALEN; i++) {
    let dataBar = $('<div>' + data[i] + '</div>').addClass('dataBar').width(XAXISWIDTH / DATALEN).height((data[i] / YAXISMAX) * (CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT));
    dataBox.append(dataBar);
  }
  chart.append(dataBox);

  let xAxisContainer = $('<div></div>').addClass('xAxis-container').width(CHARTWIDTH).height(XAXISHEIGHT);
  xAxisLeftMargin = $('<div>0</div>').addClass('xAxisLeftMargin').width(YAXISWIDTH).height(XAXISHEIGHT);
  xAxisContainer.append(xAxisLeftMargin);
  for(i = 0; i < DATALEN; i++) {
    let xAxisTick = $('<div>' + options['xAxisData'][i] + '</div>').addClass('xAxisTick').width(XAXISWIDTH / DATALEN).height(XAXISHEIGHT);
    xAxisContainer.append(xAxisTick);
  }
  chart.append(xAxisContainer);


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

