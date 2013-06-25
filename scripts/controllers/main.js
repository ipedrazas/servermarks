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
            var apps = [];
            _.each(data.items, function(entry){
                apps.push(entry.application);
            });
            apps = _.uniq(apps);
            $scope.environments = getEnvironments(apps, data.items);

        });
    };

    function getEnvironments(apps, items){
        var myMap = {};
        var envs = ['dev', 'test', 'prod'];
        _.each(envs, function(filter){
                var env_apps = getApplicationsByEnv(filter, items);
                if(env_apps.length > 0)
                    myMap[filter] = getApplications(apps, env_apps);
            });
        return myMap;
    }

    function getApplicationsByEnv(env, items){
        return _.filter(items, function(item){
                if(item.environment.toLowerCase() === env)
                    return item;
            });
    }

    function getApplications(keys, items){
        var myMap = {};
        _.each(keys, function(filter){
                var apps = _.filter(items, function(item){
                    if(item.application === filter)
                        return item;
                });
                if(apps.length>0)
                    myMap[filter] = apps;
            });
        return myMap;
    }


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


