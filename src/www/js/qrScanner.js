function scan() {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        if(!result.cancelled) {
          alert("Barcode type is: " + result.format);
          alert("Decoded text is: " + result.text);
          var graph = textToGraph(result.text);
          displayGraph(graph.toJson());
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
  var graph = new Graph(json.nbVertex);
  var edge;
  for (var i = 0; i < json.edges.length; i++) {
    edge = json.edges[i];
    graph.addEdge(edge.s1, edge.s2, edge.weight);
  }
  alert("Nouveau graphe avec "+graph.size+" sommets")
  return graph;
}
