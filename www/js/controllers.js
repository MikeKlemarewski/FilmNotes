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
})

.controller('ExposureEdit', function($scope, $stateParams, Gear, Roll) {
    $scope.camera = Gear.getCamera();
    $scope.lenses = Gear.getLenses();
    $scope.save = function(exposure) {
        Roll.saveExposure(exposure);
        window.location.href = '#/current-roll';
    }
    $scope.exposure = angular.copy(Roll.getExposure($stateParams.id));

    $scope.exposure.lens = Gear.getLensWithName($scope.exposure.lens);

    var currentApertureIndex = $scope.exposure.lens.apertures.indexOf($scope.exposure.aperture);
    var currentShutterIndex = $scope.camera['shutter-speeds'].indexOf($scope.exposure['shutter-speed']);
    $scope.aperture = { index: currentApertureIndex };
    $scope.shutter = { index: currentShutterIndex };

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
