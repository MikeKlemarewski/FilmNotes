angular.module('starter.controllers', [])

.controller('Main', function($scope) {
    $scope.goToCapturePage = function() {
        window.location.href += 'capture';
    };
})

.controller('Exposures', function($scope) {
    $scope.camera = {
        "name": "Nikon FE",
        "shutter-speeds": [
            "B", "m90", "8", "4", "2", "1",
            "1/2", "1/4", "1/8", "1/15", "1/30",
            "1/60", "1/125", "1/250", "1/250",
            "1/500", "1/1000", "Auto"
        ]
    };
    $scope.exposure = {};
    $scope.exposures = [];
    $scope.aperture = { index: 0 };
    $scope.shutter = { index: 0 };

    $scope.lenses = {
        "nikon-28mm-2.8": {
            "name": "nikon-28mm-2.8",
            apertures: [2.8, 5.6, 8, 16, 22]
        },
        "nikon-50mm-1.4": {
            "name": "nikon-50mm-1.4",
            apertures: [1.4, 2, 2.8, 4, 5.6, 8, 11, 16]
        },
        "nikon-105mm-2.5": {
            "name": "nikon-105mm-2.5",
            apertures: [2.5, 4, 5.6, 8, 11, 16, 22]
        },
        "nikon-300mm-f4": {
            "name": "nikon-300mm-f4",
            apertures: [4, 5.6, 8, 11, 16, 22, 32]
        }
    };

    $scope.lens = { current : 0 };

    $scope.getApertures = function() {
        var lens = $scope.lenses[$scope.exposure.lens];
        return lens.apertures;
    };

    $scope.getApertureAtIndex = function(index) {
        var lens = $scope.lenses[$scope.exposure.lens];
        return lens.apertures[index];
    };

    $scope.setAperture = function(index) {
        $scope.exposure.aperture = $scope.getApertureAtIndex(index);
    };

    $scope.getShutterSpeeds = function(index) {
        return $scope.camera["shutter-speeds"];
    };

    $scope.getShutterSpeedAtIndex = function(index) {
        return $scope.camera["shutter-speeds"][index];
    };

    $scope.setShutterSpeed = function(index) {
        $scope.exposure["shutter-speed"] = $scope.getShutterSpeedAtIndex(index);
    };

    $scope.capture = function(exposure) {
        $scope.exposures.push(angular.copy(exposure));
    };

    $scope.exposure.lens = Object.keys($scope.lenses)[0];
});