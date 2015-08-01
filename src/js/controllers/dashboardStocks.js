(function() {
  angular.module('stockboard.controllers.dashboardStocks', [])
  .controller('DashboardStocksCtrl', function() {
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
      // Create the chart
      $('#container1').highcharts('StockChart', {
        rangeSelector : {
          selected : 1
        },
        title : {
          text : 'AAPL'
        },
        series : [{
          name : 'AAPL',
          data : data,
          tooltip: {
              valueDecimals: 2
          }
        }]
      });
    });
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
      // Create the chart
      $('#container2').highcharts('StockChart', {
        rangeSelector : {
          selected : 1
        },
        title : {
          text : 'AAPL'
        },
        series : [{
          name : 'AAPL',
          data : data,
          tooltip: {
              valueDecimals: 2
          }
        }]
      });
    });
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
      // Create the chart
      $('#container3').highcharts('StockChart', {
        rangeSelector : {
          selected : 1
        },
        title : {
          text : 'AAPL'
        },
        series : [{
          name : 'AAPL',
          data : data,
          tooltip: {
              valueDecimals: 2
          }
        }]
      });
    });
  });
})();
