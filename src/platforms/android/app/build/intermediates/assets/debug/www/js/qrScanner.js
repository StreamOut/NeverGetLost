function scan() {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        if(!result.cancelled) {
          alert("Barcode type is: " + result.format);
          alert("Decoded text is: " + result.text);
          textToGraph(result.text);
          createAnnuaire();
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

function textToGraph(text){
  var json = JSON.parse(text);
  GLOBAL_graph = new Graph(json.nbVertex, json.directory);
  var edge;
  for (var i = 0; i < json.edges.length; i++) {
    edge = json.edges[i];
    GLOBAL_graph.addEdge(edge.s1, edge.s2, edge.weight);
  }
  alert("Nouveau graphe avec "+GLOBAL_graph.size+" sommets");
  GLOBAL_directory = json.directory;
}
