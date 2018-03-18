function scan() {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        if(!result.cancelled) {
          // alert("Barcode type is: " + result.format);
          // alert("Decoded text is: " + result.text);
          qrAnalyse(result.text);

          // alert(graph.directory);
          // createAnnuaire(graph.directory);
          // alert("graph "+graph.toJson())
          // displayGraph(graph.toJson());
          // displayGraph(JSON.parse(result.text));
        }
        else {
          alert("You have cancelled scan");
        }
      },
      function (error) {
          alert("Scanning failed: " + error);
      }
    );
}

function qrAnalyse(text){
  var json = JSON.parse(text);
  if(json.type == "plan"){
    alert("New Graph");
    textToGraph(json);
    createAnnuaire();
  }
  else if (json.type == "node"){
    alert("Node");
    reachDest(json);
  }
  else{
    alert("Mauvais QR Code !");
  }
}

function reachDest(json){
  var destination = GLOBAL_destination;
  var target =  GLOBAL_path[GLOBAL_nextNode];
  alert("target : "+ target + " id : "+json.id);
  if(parseInt(target) == parseInt(json.id)){
    if(parseInt(GLOBAL_path[GLOBAL_nextNode+1]) == parseInt(GLOBAL_destination)){
      alert("Votre destination se trouve a "+ GLOBAL_graph.edges[target][GLOBAL_destination] + "m dans la direction indiquee");
    }
    else{
      GLOBAL_nextNode = GLOBAL_nextNode + 1;
      alert("Dirigez vous vers la prochaine intersection.");
    }
    navigateView();
  }
  else {
    alert("Vous etes perdu!");
    GLOBAL_startNode = json.id;
    GLOBAL_path = GLOBAL_graph.findShortestPath(GLOBAL_startNode, GLOBAL_destination);
    GLOBAL_nextNode = 1;
    navigateView();
  }
}

function textToGraph(json){
  GLOBAL_graph = new Graph(json.nbVertex);
  var edge;
  for (var i = 0; i < json.edges.length; i++) {
    edge = json.edges[i];
    GLOBAL_graph.addEdge(edge.s1, edge.s2, edge.weight, edge.way);
  }
  // alert("Nouveau graphe avec "+GLOBAL_graph.size+" sommets");
  GLOBAL_directory = json.directory;
}
