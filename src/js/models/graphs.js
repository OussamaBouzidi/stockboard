(function() {
  angular.module('stockboard.models.graphs', [])
  .factory('GraphService', function() {
    return {
      barChartSort: function(barChartData, type, ascending) {
        if (type === 'value') {
          if (ascending) {
            return barChartData.sort(function(a, b) {
              return a[1] - b[1];
            });
          } else {
            return barChartData.sort(function(a, b) {
              return b[1] - a[1];
            });
          }
        } else {
          if (ascending) {
            return barChartData.sort(function(a, b) {
              return a[0] - b[0];
            });
          } else {
            return barChartData.sort(function(a, b) {
              return b[0] - a[0];
            });
          }
        }        
      },
      barChartRender: function(elementId, title, xAxisCategories, yAxisScale, seriesName, data) {
        $(elementId).highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: title
          },
          xAxis: {
            categories: xAxisCategories
          },
          yAxis: {
            title: {
              text: yAxisScale
            }
          },
          series: [{
            name: seriesName,
            data: data
          }]
        });        
      },
      pieChartRender: function(elementId, title, seriesName, seriesData) {
        $(elementId).highcharts({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: title
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [{
            name: seriesName,
            colorByPoint: true,
            data: seriesData
          }]      
        })
      }
    }
  });
})();
