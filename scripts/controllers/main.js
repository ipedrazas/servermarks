'use strict';



function log(entry){
    if( console && console.log ) {
            console.log(entry);
    }
}


angular.module('EmaServerMarksApp')
  .controller('EntryController', function ($scope, $http) {


    var serviceUrl = "http://api.oioi.me/ipedrazas/ema-servermarks";


    $scope.refreshEntries = function(){
      $http.get(serviceUrl).success(function (data) {
            var filters = [];
            _.each(data.items, function(entry){
                filters.push(entry.application);
            });
            $scope.filters = _.uniq(filters);
            $scope.applications = {};
            _.each($scope.filters, function(filter){
                $scope.applications[filter] = _.filter(data.items, function(item){
                    if(item.application === filter)
                        return item;
                });
            });

            log($scope.applications);

            $scope.entries = data.items;
        });
    };

    $scope.showEdit = function () {
        $scope.isEditVisible = true;
        $scope.editableEntry = angular.copy(blankEntry);
    };

    $scope.saveEntry = function() {
        $scope.isEditVisible = false;
        $scope.entry.app_token = "ema-servermarks";

        $.ajax({
            type: "POST",
            url: serviceUrl,
            data: $scope.entry
        }).done(function ( data ) {
              $scope.entries.push($scope.entry);
        });

        refreshEntries();
    };

    $scope.refreshEntries();
});


