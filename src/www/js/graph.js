class Graph {
  constructor(size) {
    this.size = size;
    this.edges = new Array(size);
    for(var i = 0; i < size; i++){
      this.edges[i] = new Array(size);
      for(var j = 0; j < size; j++){
        this.edges[i][j] = 0;
      }
    }
  }

  // Ajouter une arête au graphe.
  // C'est un graphe non orienté
  // donc la matrice d'arête est symetrique.
  // s1 : sommet de départ de l'arête
  // s2 : sommet de destination
  // weight : le poid de l'arête
  // ways : attribut qui sera utilisé
  // pour définir l'orientation sur la
  // bousolle de l'arête(couloir)
  addEdge(s1, s2, weight){
    this.edges[s1][s2] = weight;
    this.edges[s2][s1] = weight;
  }


  initDomaine(start){
    var domaine = Array(this.size);
    for(var i = 0; i < this.size; i++){
      domaine[i] = Number.MAX_SAFE_INTEGER;
    }
    domaine[start] = 0;
    return domaine;
  }

  findMin(sommet, domaine){
    var min = Number.MAX_SAFE_INTEGER;
    var s = -1;
    for(var i = 0; i < this.size; i++){
      if(sommet[i] && domaine[i] < min){
        min = domaine[i];
        s = i;
      }
    }
    return s;
  }

  updateDistance(s1, s2, domaine, pred){
    if(domaine[s2] > domaine[s1] + this.edges[s1][s2]){
      domaine[s2] = domaine[s1] + this.edges[s1][s2];
      pred[s2] = s1;
    }
  }


  notEmpty(q){
    for (var i = 0; i < this.size; i++) {
      if(q[i]){
        return true;
      }
    }
    return false;
  }

  dijkstra(start){
    var pred = new Array(this.size);
    var domaine = this.initDomaine(start);
    var q = new Array(this.size);
    var s1;
    for(var i = 0; i < this.size; i++){
      q[i] = true;
    }
    while (this.notEmpty(q)){
      s1 = this.findMin(q, domaine);
      q[s1] = false;
      for (var i = 0; i < this.size; i++) {
        if(parseInt(this.edges[s1][i]) != 0){
          this.updateDistance(s1, i, domaine, pred);
        }
      }
    }
    return pred;
  }

  findShortestPath(start, end){
    var pred = this.dijkstra(start);
    var path = "";
    var s = end;
    while(s != start){
      path += s + " <- ";
      s = pred[s];
    }
    path += start;
    console.log(path);
  }

  toJson() {
      var obj = new Object();
      obj.nodes = new Array(this.size);
      obj.links = new Array(this.size);
      for (var i = 0; i < this.size; i++) {
       obj.nodes[i] = new Object();
       obj.nodes[i].id = i ;
       obj.nodes[i].group = 1;
       obj.links[i] = new Object();
        for (var j = 0; j < this.size; j++) {
          if(parseInt(this.edges[i][j]) != 0){
          obj.links[i].source = i;
          obj.links[i].target = j;
          obj.links[i].value =this.edges[i][j];
          }
        }
    }

        var jsonString= JSON.stringify(obj);
        alert(jsonString);
        return obj;
}


  // toJson(){
  //   var json;
  //   for (var i = 0; i < this.size -1; i++) {
  //     json += '{"id":'+ i +', "group": 1},';
  //   }
  //   json += '{"id":'+ this.size -1 +', "group": 1} ], "links": [';
  //   for (var i = 0; i < this.size; i++) {
  //     for (var j = i+1; j < this.size; j++) {
  //       if(parseInt(this.edges[i][j]) != 0){
  //         json += ',{"source":'+ i + ' , "target": '+ j +', "value": '+ this.edges[i][j] +'}';
  //       }
  //     }
  //   }
  //
  //   json += '}';
  //   alert(json);
  // }
}
