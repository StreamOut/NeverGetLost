function destChoisie(destination){
  GLOBAL_startNode = 0;
  var target = GLOBAL_directory[destination];
  GLOBAL_destination = GLOBAL_graph.size;
  // alert("1");
  GLOBAL_graph.size = GLOBAL_graph.size + 1;
  // alert("2");
  GLOBAL_graph.addEdge(target.s1, GLOBAL_graph.size-1,target.distance, GLOBAL_graph.way[target.s1][target.s2]);
  // alert("3");
  GLOBAL_graph.addEdge(target.s2, GLOBAL_graph.size-1,GLOBAL_graph.edges[target.s1][target.s2] - target.distance, GLOBAL_graph.way[target.s2][target.s1]);
  // alert("4");
  GLOBAL_path = GLOBAL_graph.findShortestPath(GLOBAL_startNode, GLOBAL_destination);
  // alert("5");
  GLOBAL_nextNode = 1;
  // alert("6");
  navigateView();
}

function createAnnuaire(){
  var directory = GLOBAL_directory;
  $("#contenu").empty();
  $("#contenu").append('<div class="list-group">');
  for (var i = 0; i < directory.length; i++) {
    elem = directory[i];
    $("#contenu").append('<button type="button" class="list-group-item list-group-item-action" onclick="destChoisie('+i+')" >' + elem.name + ' ' + elem.occupant + '</button>');
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
  var source = GLOBAL_path[GLOBAL_nextNode-1];
  var target = GLOBAL_path[GLOBAL_nextNode];
  var direction = GLOBAL_graph.way[source][target];
  GLOBAL_compassDeg = direction;
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
