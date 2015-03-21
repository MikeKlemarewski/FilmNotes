var getDateAsString = function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    if(month < 10) {
        month = '0' + (month + 1);
    }
    if(day < 10) {
        day = '0' + day;
    }
    return year + '-' + month + '-' + day;
};

angular.module('services', [])

.factory('Backend', function() {
    return {
        getBackend: function() {
            var ref = new Firebase("https://amber-fire-6768.firebaseio.com/");

            var authData = ref.getAuth();
            if (authData) {
                ref = ref.child('/users/' + authData.uid);
            }

            return ref;
        }
    }
})

.factory('Gear', function() {
    var camera = {
        "name": "Nikon FE",
        "shutter-speeds": [
            "B", "m90", "8", "4", "2", "1",
            "1/2", "1/4", "1/8", "1/15", "1/30",
            "1/60", "1/125", "1/250", "1/250",
            "1/500", "1/1000", "Auto"
        ]
    };

    var lenses = [
        {
            "name": "nikon-28mm-2.8",
            apertures: [2.8, 5.6, 8, 16, 22]
        },
        {
            "name": "nikon-50mm-1.4",
            apertures: [1.4, 2, 2.8, 4, 5.6, 8, 11, 16]
        },
        {
            "name": "nikon-105mm-2.5",
            apertures: [2.5, 4, 5.6, 8, 11, 16, 22]
        },
        {
            "name": "nikon-300mm-f4",
            apertures: [4, 5.6, 8, 11, 16, 22, 32]
        }
    ];

    return {
        getCamera: function() {
            return camera;
        },
        getLenses: function() {
            return lenses;
        },
        getLens: function(index) {
            return lenses[index];
        },
        getLensWithName: function(name) {
            for(var i = 0; i < lenses.length; i++) {
                if (lenses[i]['name'] == name){
                    return lenses[i];
                }
            }
            return undefined;
        }
    };
})

.factory('Rolls', function(Gear, Backend) {
    var backend = Backend.getBackend();

    var rolls;

    var getRolls = function(callback) {
        backend.child('rolls').on('value', function(data) {
            rolls = data.val() || [];
            callback(rolls);
        });
    }

    var addNewRoll = function(roll) {
        roll.startDate = getDateAsString;
        rolls.push(roll);
    }

    return {
        getRolls: getRolls,
        addNewRoll: addNewRoll
    }
})

.factory('Roll', function(Gear, Backend) {
    var exposures;
    var backend = Backend.getBackend();

    var film = {
        name: "TRI-X 400",
        exposures: 36
    };

    var currentExposure = {
        "lens": Gear.getLens(0),
        "aperture": Gear.getLens(0).apertures[0],
        "shutter-speed": Gear.getCamera()["shutter-speeds"][0]
    };

    var resetCurrentExposure = function() {
        delete currentExposure.title;
    };

    var getExposures = function(callback) {
        if (!exposures) {
            backend.child('exposures').on('value', function(data) {
                exposures = data.val() || [];
                callback(exposures);
            });
        } else {
            callback(exposures);
        }
    };

    return {
        getFilm: function() {
            return film;
        },
        getExposures: getExposures,
        getExposure: function(index, callback) {
            debugger;
            if (!exposures) {
                getExposures(function(exposures) {
                    callback(exposures[index]);
                });
            } else {
                callback(exposures[index]);
            }
        },
        captureExposure: function(exposure) {
            var tmpExposure = angular.copy(exposure);

            tmpExposure.lens = exposure.lens.name;
            if (!tmpExposure.title) {
                tmpExposure.title = getDateAsString();
            }
            tmpExposure.number = exposures.length;

            exposures.push(tmpExposure);
            backend.child('exposures').set(angular.copy(exposures));
            resetCurrentExposure();
        },
        saveExposure: function(exposure) {
            exposure.lens = exposure.lens.name;
            if (!exposure.title) {
                exposure.title = getDateAsString();
            }
            exposures[exposure.number] = exposure;
            backend.child('exposures').set(angular.copy(exposures));
        },
        getCurrentLens: function() {
            return currentExposure.lens;
        },
        getCurrentExposure: function() {
            return currentExposure;
        },
        setAperture: function(index) {
            currentExposure.aperture = currentExposure.lens.apertures[index];
        }
    };
});
