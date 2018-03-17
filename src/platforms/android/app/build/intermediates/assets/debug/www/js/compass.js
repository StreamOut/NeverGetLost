function startBoussole() {
    var options = {
      frequency: 200
    };
    navigator.compass.watchHeading (onSuccess, onError, options);
}

// onSuccess: Get the current heading
//
function onSuccess(heading) {
    var direction = GLOBAL_compassDeg;
    var boussole = parseInt(heading.magneticHeading) ;
    if(parseInt(boussole) > 360){
      boussole = parseInt(boussole) - 360;
    }

    var result;
    $("#result").empty();
    $("#result").append(boussole);
    result = parseInt(boussole) - parseInt(direction);
    rotate(parseInt(result));
}

// onError: Failed to get the heading
//
function onError(compassError) {
    alert('Compass Error: ' + compassError.code);
}
