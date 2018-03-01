function startBoussole() {
    var options = {
      frequency: 500
    };
    navigator.compass.watchHeading (onSuccess, onError, options);
}

// onSuccess: Get the current heading
//
function onSuccess(heading) {
    $("#result").empty();
    $("#result").append(heading.magneticHeading)
}

// onError: Failed to get the heading
//
function onError(compassError) {
    alert('Compass Error: ' + compassError.code);
}
