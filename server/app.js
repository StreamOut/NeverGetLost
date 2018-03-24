// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017'); // connect to our database

var Graph     = require('./app/models/graph');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /graphs
// ----------------------------------------------------
router.route('/graphs')

    // create a graph (accessed at POST http://localhost:8080/api/graphs)
    .post(function(req, res) {

        var graph = new Graph();      // create a new instance of the Graph model
        graph.name = req.body.name;  // set the graphs name (comes from the request)
        graph.type = req.body.type;
        graph.nbVertex = req.body.nbVertex;
        graph.edges = req.body.edges;
        graph.directory = req.body.directory;

        // save the graph and check for errors
        graph.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Graph created!' });
        });

    })

    // get all the graphs (accessed at GET http://localhost:8080/api/graphs)
    .get(function(req, res) {
        Graph.find(function(err, graphs) {
            if (err)
                res.send(err);

            res.json(graphs);
        });
    });

  // on routes that end in /graphs/:graph_id
  // ----------------------------------------------------
  router.route('/graphs/:graph_id')

      // get the graph with that id (accessed at GET http://localhost:8080/api/graphs/:graph_id)
      .get(function(req, res) {
          Graph.findById(req.params.graph_id, function(err, graph) {
              if (err)
                  res.send(err);
              res.json(graph);
          });
      })

      // update the graph with this id (accessed at PUT http://localhost:8080/api/graphs/:graph_id)
    .put(function(req, res) {

        // use our graph model to find the graph we want
        Graph.findById(req.params.graph_id, function(err, graph) {

            if (err)
                res.send(err);

            graph.name = req.body.name;  // update the graphs info
            graph.type = req.body.type;
            graph.nbVertex = req.body.nbVertex;
            graph.edges = req.body.edges;
            graph.directory = req.body.directory;

            // save the graph
            graph.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Graph updated!' });
            });

        });
    })

    // delete the graph with this id (accessed at DELETE http://localhost:8080/api/graphs/:graph_id)
    .delete(function(req, res) {
        Graph.remove({
            _id: req.params.graph_id
        }, function(err, graph) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
