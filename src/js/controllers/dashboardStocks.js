(function() {
  angular.module('stockboard.controllers.dashboardStocks', [])
  .controller('DashboardStocksCtrl', function($scope, $state, UserService, StockHistoryService) {
    graphDivs = [];
    var userData = UserService.currentUserData;
    $scope.userName = userData.displayName;

    // $( ".visualtxtSymbolLookup" ).autocomplete({
    //   source: function( request, response ) {
    //     $.ajax({
    //       type: "GET",
    //       dataType: "jsonp",
    //       jsonp: "callback",
    //       jsonpCallback: "YAHOO.Finance.SymbolSuggest.ssCallback",
    //       data: {
    //         query: request.term
    //       },
    //       cache: true,
    //       url: "http://d.yimg.com/autoc.finance.yahoo.com/autoc"
    //     }); // .ajax
    //     var YAHOO = window.YAHOO = {Finance: {SymbolSuggest: {}}};
    //     YAHOO.Finance.SymbolSuggest.ssCallback = function (data) {
    //       var mapped = $.map(data.ResultSet.Result, function (e, i) {
    //         return {
    //           label: e.symbol + ' (' + e.name + ')',
    //           value: e.symbol
    //         };
    //       });
    //       response(mapped);
    //     }; // YAHOO.Finance     
    //   },
    //   minLength: 2 // source: function
    // }); // autocomplete
    
    function watchGraphsRender() {
      UserService.getAllUserStockWatches(userData._id)
      .success(function(data) {
        // grab all watches 
        stocksData = data.filter(function(stock) {
          if (stock.user === userData.displayName) {
            return stock;
          }
        });
        $scope.watchedStocks = stocksData;

        for (var i = 0; i < stocksData.length; i++) {
          graphDivs.push($('<div>').addClass('col-md-6').append($('<div>').addClass('stock-line-graph col-md-12 graph-card').attr('id', 'graph' + i)));
        }
        $("#graphs-container").empty();
        $('#graphs-container').append(graphDivs);
        stocksData.forEach(function(stock, graphIndex) {
          StockHistoryService.getStockHistory(stock.symbol)
          .success(function(data) {
            dataPrices = data.Elements[0].DataSeries.close.values;
            dataCoordinates = [];
            dataPrices.forEach(function(dataPoint, index) {
              var dateArray = data.Dates[index].split('-');
              var date = Date.UTC(Number(dateArray[0]), Number(dateArray[1])-1, Number(dateArray[2].slice(0,2)));
              dataCoordinates.push([date, dataPoint]);
            })
            $('#graph' + graphIndex).highcharts('StockChart', {
              rangeSelector : {
                selected : 1
              },
              title : {
                text : stock.name
              },
              series : [{
                name : stock.name,
                data : dataCoordinates,
                tooltip: {
                  valueDecimals: 2
                }
              }]
            });
          })
          .catch(function(error) {
            console.error(error);
          })
        })
      })
      .catch(function(error) {
        console.error(error);
      })
    }
    watchGraphsRender();

    $scope.deleteWatchedStock = function(stockId) {
      swal({   
        title: "Are you sure?",   
        text: "You will not be able to recover deleting this watch!",   
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "Yes, delete it!",   
        closeOnConfirm: false 
      }, function(){
        UserService.deleteStockWatch(stockId)
        .success(function(data) {
          swal('', 'Sucessfully deleted watched stock!', 'success');
        })
        .catch(function(error) {
          console.error(error);
          swal('', 'Failed to delete watched stock!', 'error');
        })
        $('#listModal').modal('hide');
      });
    }
    $scope.findOneStock = function(symbol) {
      StockHistoryService.getStockHistory(symbol)
      .success(function(data) {
        var dataPrices = data.Elements[0].DataSeries.close.values;
        var dataCoordinates = [];
        dataPrices.forEach(function(dataPoint, index) {
          var dateArray = data.Dates[index].split('-');
          var date = Date.UTC(Number(dateArray[0]), Number(dateArray[1])-1, Number(dateArray[2].slice(0,2)));
          dataCoordinates.push([date, dataPoint]);
        })
        $('#individualGraph').highcharts('StockChart', {
          rangeSelector : {
            selected : 1
          },
          title : {
            text : symbol
          },
          series : [{
            name : symbol,
            data : dataCoordinates,
            tooltip: {
              valueDecimals: 2
            }
          }]
        });
      })
      .catch(function(error) {
        console.error(error);
      })
      $scope.symbol = "";
    }
  });
})();
