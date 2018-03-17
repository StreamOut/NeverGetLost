function destChoisie(){
  GLOBAL_startNode = 0;
  alert(GLOBAL_graph.findShortestPath(GLOBAL_startNode, 2));
  GLOBAL_compassDeg = 270;
  navigateView();
}


function createAnnuaire(){
  var directory = GLOBAL_directory;
  $("#contenu").empty();
  $("#contenu").append('<div class="list-group">');
  for (var i = 0; i < directory.length; i++) {
    elem = directory[i];
    $("#contenu").append('<button type="button" class="list-group-item list-group-item-action" onclick="destChoisie()" >' + elem.name + ' ' + elem.occupant + '</button>');
    // document.getElementById("i").addEventListener("click", destChoisie);
  }
  $("#contenu").append('</div>');
}

function homepageView(){
  $("#contenu").empty();
  $("#contenu").append('<div>'
      +'<button id="btnScan" type="button" class="btn btn-primary" onclick="scan()">Scan</button>'
  +'</div>'
  +'<div id="result"></div>'

  +'<button id="btnGetPlan" type="button" class="btn btn-warning" >Trouver un plan</button>'
  +'<svg width="300" height="200"></svg>');
}

function navigateView(){
  $("#contenu").empty();
  $("#contenu").append('<div id="testRotate"></div>');
  $("#contenu").append('<button id="btnScanNode" type="button" class="btn btn-warning" >Scanner un QR Code</button>');
  document.getElementById("btnScanNode").addEventListener("click", scan);
  startBoussole();
}

function rotate(deg){
      var div = document.getElementById('testRotate');
      div.style.webkitTransform = 'rotate('+deg+'deg)';
      div.style.mozTransform    = 'rotate('+deg+'deg)';
      div.style.msTransform     = 'rotate('+deg+'deg)';
      div.style.oTransform      = 'rotate('+deg+'deg)';
      div.style.transform       = 'rotate('+deg+'deg)';
}
