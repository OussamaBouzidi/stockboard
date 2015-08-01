(function() {
  angular.module('stockboard.controllers.dashboardPortfolio', [])
  .controller('DashboardPortfolioCtrl', function() {
    console.log('This is the dashboard-portfolio');
    $('#expenditure-bar').highcharts({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Stock Returns'
      },
      xAxis: {
        categories: ['APPL', 'GOOG', 'QQQ', 'IVSN', 'POOP', 'CHIK']
      },
      yAxis: {
        title: {
          text: 'Percentage'
        }
      },
      series: [{
        name: 'Stanley',
        data: [1.9, 0.5, -4.0, 3.2, -2.4, 4.1]
      }]
    });
    $('#expenditure-pie').highcharts({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Expenditure Breakdown'
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
        name: "Brands",
        colorByPoint: true,
        data: [{
          name: "MSFT",
          y: 56.33
        }, {
          name: "GOOG",
          y: 24.03
        }, {
          name: "QQQ",
          y: 10.38
        }, {
          name: "IVSN",
          y: 4.77
        }, {
          name: "POOP",
          y: 0.91
        }, {
          name: "CHIK",
          y: 0.2
        }]
      }]
    });
  });
})();
