function drawBarChart(data, options, element) {
  const DATALEN = data.length;
  const MAXVALUE = findMax(data);
  const CHARTHEIGHT = (options['height'] ? options['height'] : 400);
  const CHARTWIDTH = (options['width'] ? options['width'] : (30 + DATALEN * 70));
  const YAXISTICKS = (options['yAxisTicks'] ? options['yAxisTicks'] : ((Math.floor(MAXVALUE / 4) + 1) * 4) - MAXVALUE <= (Math.floor(MAXVALUE / 5) + 1) * 5 - MAXVALUE ? 4 : 5);
  const TITLECOLOUR = (options['titleColour'] ? options['titleColour'] : "black" );
  const TITLEFONTSIZE = (options['titleFontSize'] ? options['titleFontSize'] : "20" );
  const TITLETEXT = (options['titleText'] ? options['titleText'] : 'YOUR CHART TITLE!' );
  const BARCOLOUR = (options['barColour'] ? options['barColour'] : ['darkgreen']);
  const BARLABELPOSITION = (options['barLabelPosition'] ? options['barLabelPosition'] : 'center');
  const YAXISMAX = (Math.floor(MAXVALUE / YAXISTICKS) + 1) * YAXISTICKS;
  const TITLEHEIGHT = 30;
  const YAXISWIDTH = 30;
  const XAXISHEIGHT = 30;
  const XAXISWIDTH = CHARTWIDTH - YAXISWIDTH;
  const BARSPACING = (options['barSpacing'] ? options['barSpacing'] : 0.04 * (CHARTWIDTH - YAXISWIDTH) * 5 / DATALEN);
  const STACKEDDATATOTALS = stackedDataTotals(data);

  let chart = $('<div></div>').addClass('chart-container').width(CHARTWIDTH).height(CHARTHEIGHT);

  let yAxisContainer = $('<div></div>').addClass('yAxis-container').width(YAXISWIDTH).height(CHARTHEIGHT);
  yAxisTopMargin = $('<div></div>').addClass('AxisLeftMargin').width(YAXISWIDTH).height(TITLEHEIGHT);
  yAxisContainer.append(yAxisTopMargin);
  for(i = 0; i < YAXISTICKS; i++) {
    let yAxisTick = $('<div>' + (YAXISMAX - (i * YAXISMAX / YAXISTICKS)) + '</div>').addClass('yAxisTick').width(YAXISWIDTH).height((CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT) / YAXISTICKS).css({
      'top': - (((CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT) / YAXISTICKS) / 2) + 'px'
    });
    yAxisContainer.append(yAxisTick);
  }
  xAxisLeftMargin = $('<div>0</div>').addClass('AxisLeftMargin').width(YAXISWIDTH).height(XAXISHEIGHT).css({
      'top': - (XAXISHEIGHT / 2) + 'px'
  });
  yAxisContainer.append(xAxisLeftMargin);
  chart.append(yAxisContainer);

  let titleContainer = $('<div></div>').addClass('title-container').width(CHARTWIDTH - YAXISWIDTH).height(TITLEHEIGHT);
  let titleText = $('<div>' + TITLETEXT + '</div>').addClass('title-text').css({
    fontSize: TITLEFONTSIZE + 'px',
    color: TITLECOLOUR
  });
  let title = titleContainer.append(titleText);
  chart.append(title);


  let dataBox = $('<div></div>').addClass('data-container').width(CHARTWIDTH - YAXISWIDTH).height(CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT).css({
    'background-image': 'linear-gradient(#ccc 1px, transparent 1px)',
    'background-size':'100% ' + ((CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT) / YAXISTICKS) + 'px'
  });
  for(i = 0; i < DATALEN; i++) {
    let leftPadding = $('<div></div>').addClass('dataPadding').width(BARSPACING).height((CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT));
    let dataBarContainer = $('<div></div>').addClass('dataBarContainer').width((XAXISWIDTH - DATALEN * BARSPACING * 2) / DATALEN).height((STACKEDDATATOTALS[i] / YAXISMAX) * (CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT));
    if (!data[i].length) {
      let dataBar = $('<div>' + data[i] + '</div>').addClass('dataBar').width((XAXISWIDTH - DATALEN * BARSPACING * 2) / DATALEN).height((data[i] / YAXISMAX) * (CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT)).css({
        'align-items': BARLABELPOSITION
      });
      if (BARCOLOUR.length === 1) {
        dataBar.css({'background-color': BARCOLOUR})
      } else {
        dataBar.css({'background-color': BARCOLOUR[i]})
      }
      dataBarContainer.append(dataBar);
    } else {
      for (j = 0; j < data[i].length; j++) {
        let dataBar = $('<div></div>').addClass('dataBar').width((XAXISWIDTH - DATALEN * BARSPACING * 2) / DATALEN).height((data[i][j] / YAXISMAX) * (CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT)).css({
          'align-items': BARLABELPOSITION
        });
        if (data[i][j] !== 0) {
          dataBar.append(data[i][j]);
        }
        if (BARCOLOUR.length === 1) {
          dataBar.css({'background-color': BARCOLOUR ? BARCOLOUR : 'darkgreen'})
        } else {
          dataBar.css({'background-color': BARCOLOUR[i][j] ? BARCOLOUR[i][j] : 'darkgreen'})
        }
        dataBarContainer.append(dataBar);
      }
    }

    let rightPadding = $('<div></div>').addClass('dataPadding').width(BARSPACING).height((CHARTHEIGHT - TITLEHEIGHT - XAXISHEIGHT));
    dataBox.append(leftPadding);
    dataBox.append(dataBarContainer);
    dataBox.append(rightPadding);
  }
  chart.append(dataBox);

  let xAxisContainer = $('<div></div>').addClass('xAxis-container').width(CHARTWIDTH - YAXISWIDTH).height(XAXISHEIGHT);
  for(i = 0; i < DATALEN; i++) {
    let xAxisTick = $('<div>' + options['xAxisData'][i] + '</div>').addClass('xAxisTick').width(XAXISWIDTH / DATALEN).height(XAXISHEIGHT);
    xAxisContainer.append(xAxisTick);
  }
  chart.append(xAxisContainer);

  let chartPaddingRight = $('<div></div>').addClass('rightPadding').width()


  return $(element).append(chart);
}

function findMax(data) {
  if (data.length === 0) {
    return null;
  }

  let max = Number.MIN_SAFE_INTEGER;
  let currentTotal = 0;
  for (let i = 0; i < data.length; i++) {
    if (!data[i].length) {
      currentTotal += data[i];
    } else {
      for (let j = 0; j < data[i].length; j++) {
        currentTotal += data[i][j];
      }
    }
    if (currentTotal > max) {
      max = currentTotal;
    }
    currentTotal = 0;
  }
  return max;
}

function stackedDataTotals(data) {
  let stackedDataTotal = [];
  let currentTotal = 0;
  for (let i = 0; i < data.length; i++) {
    if (!data[i].length) {
      currentTotal += data[i];
    } else {
      for (let j = 0; j < data[i].length; j++) {
        currentTotal += data[i][j];
      }
    }
    stackedDataTotal.push(currentTotal);
    currentTotal = 0;
  }
  return stackedDataTotal;
}

