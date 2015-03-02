angular.module('starter.controllers', [])

.controller('Main', function($scope) {
    $scope.goToCapturePage = function() {
        window.location.href += 'capture';
    };

    $scope.goToCurrentRollPage = function() {
        window.location.href += 'current-roll';
    };
})

.controller('Login', function($scope, Backend) {
    $scope.user = {};

    if (Backend.getAuth()) {
        window.location.href = "#/";
    }

    $scope.doLogin = function() {
        Backend.authWithPassword({
                email : $scope.user.email,
                password : $scope.user.password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    window.location.href = "#/";
                }
            }
        );
    }
})

.controller('Signup', function($scope, Backend) {
    $scope.user = {};

    $scope.doSignUp = function() {
        if ($scope.user.password === $scope.user.password2) {

            Backend.createUser({
                    email : $scope.user.email,
                    password : $scope.user.password
                }, function(error, userData) {
                    if (error) {
                        console.log("Error creating user:", error);
                    } else {
                        window.location.href = "#/";
                    }
                }
            );
        } else {
            alert("Passwords must match.");
        }
    }
})

.controller('CurrentRoll', function($scope, Gear, Roll, Backend) {
    $scope.camera = Gear.getCamera();
    $scope.film = Roll.getFilm();

    Backend.child('exposures').on('value', function(data) {
        $scope.exposures = data.val() || [];
    });
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
