function getAllGraph(){
		jQuery.ajax({
			type: 'GET',
		    url: GLOBAL_url+'/api/graphs',
		    success: function (result) {
		        console.log("L'appel Ajax est une réussite.");
		        console.log(result);
						createMapAnnuaire(result);
		    },
		    error: function () {
		        console.log("L'appel Ajax est un échec.");
		        alert("error loadMessage");
		    }
		});
	}

	function getGraph(id){
			jQuery.ajax({
				type: 'GET',
			    url: GLOBAL_url+'/api/graphs/'+id,
			    success: function (result) {
			        console.log("L'appel Ajax est une réussite.");
			        console.log(result);
							textToGraph(result);
							createAnnuaire();
			    },
			    error: function () {
			        console.log("L'appel Ajax est un échec.");
			        alert("error loadMessage");
			    }
			});
		}
