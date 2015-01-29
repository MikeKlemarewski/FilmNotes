angular.module('starter.controllers', [])

.controller('Main', function($scope) {
    $scope.goToCapturePage = function() {
        window.location.href += 'capture';
    };

    $scope.goToCurrentRollPage = function() {
        window.location.href += 'current-roll';
    };
})

.controller('CurrentRoll', function($scope, Gear, Roll) {
    $scope.camera = Gear.getCamera();
    $scope.exposures = Roll.getExposures();
    $scope.film = Roll.getFilm();
})

.controller('Exposures', function($scope, Gear, Roll) {
    $scope.camera = Gear.getCamera();
    $scope.lenses = Gear.getLenses();
    $scope.capture = Roll.captureExposure;
    $scope.exposure = Roll.getCurrentExposure();
    $scope.exposures = Roll.getExposures();

    $scope.aperture = { index: 0 };
    $scope.shutter = { index: 0 };

    $scope.getApertures = function() {
        return Roll.getCurrentLens().apertures;
    };

    $scope.getApertureAtIndex = function(index) {
        return Roll.getCurrentLens().apertures[index];
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

    $scope.updateSettings = function() {
        $scope.setAperture(0);
        $scope.setShutterSpeed(0);
    }
});