## About ##

This JQuery-driven API can be used to build a customizable bar chart with data and labels provided by the user. The chart can then be hooked it into the provided DOM element of a ```.html``` file. 

This project was built as part of the Lighthouse Labs Web Development bootcamp preparation.

## Usage ##

First, you need to enable JQuery and link the ```/script.js``` file included in this repository in the header of your ```.html``` file:
```
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="/script.js" type="text/javascript"></script>
```

Next, call the provided ```drawBarChart()``` function along with the data, options, and the DOM element where the chart will be added:
```
<script>
   $(document).ready(function(){
    drawBarChart(<data>, <options>, <DOM element>);
   })
</script>
```

The ```data``` parameter takes a 1D or 2D (for stacked bar charts) array of numbers.

The ```options``` parameter is where you can customize the chart and add labels for the x-axis. Here is a full list of parameters you can manipulate:
- width: the chart width in px,
- height: the chart height in px,
- barLabelPosition: where the text appears within a particular bar. Options include 'top', 'bottom' and 'center',
- barColour: can be a single string value to colour all data bars in the chart, a 1D array of strings to colour each data bar, or a 2D array where a stacked bar chart is required,
- barSpacing: the space between data bars in px,
- titleText: a string representing the title of the chart,
- titleColour: a string representing the colour of the title text, and
- xAxisData: a 1D array representing the x-axis labels and should be the same length as the data array

## Example Charts ##

Here are a few example of charts you can make:

![Sample bar chart 1]
(https://github.com/amarkham1/stretchProject/blob/master/images/SampleChart1.png)

![Sample bar chart 2]
(https://github.com/amarkham1/stretchProject/blob/master/images/SampleChart2.png)

![Sample bar chart 3]
(https://github.com/amarkham1/stretchProject/blob/master/images/SampleChart3.png)

## Bugs ##

- Chart data may not appear properly when the ```width``` or ```height``` option values provided are too small or if the ```barSpacing``` value is too large for the area dedicated to the bars
- Providing x-axis labels (using the ```xAxisData``` option) which are too long can also result in text-wrapping styling issues.
- Bar data labels can appear cropped when the value of the bar provided is too small for the font size of the data.

## Roadmap ##

In addition to fixing the above-mentioned bugs, the roadmap to improve this project includes building out additional chart options, such as rounding corners, tweaking the background colour, and being able to change the font size of the labels and bar values.
