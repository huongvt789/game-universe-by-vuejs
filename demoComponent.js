Vue.component ('item',{
	template: '#map',
	data: function () {
		return {
			universeMapNumber: [],
			universeToString: ''
		}
	},

	methods: {
		createUniverseMapRandom: function (x, y) {
			 x = 100;;
			 y = 100;
			 for (var i = 0; i <= this.x; i++) {
	            this.universeMapNumber[i] = [];
	            for (var j = 0; j <= this.y; j++) {
	                this.universeMapNumber[i][j] = Math.round(Math.random());
	            }
	        }
		},

//add function...
		buildToHtmlString: function () {
		 	this.universeToString = '';
	        for (var i = 0; i < this.x; i++) {
	            this.universeToString += `<div class="grid">`;
	            for (var j = 0; j < this.y; j++) {
	                var cellType = this.universeMapNumber[i][j] === 1 ? 'planet' : 'space';
	                this.universeToString += `<div class="` + cellType + `"></div>`;
	            }
	            this.universeToString += `</div>`;
	        }

	        return this.universeToString;
	    },

    	evolve: function (time = 1) {
			for (var i = 1; i <= time; i++){
				this.lifeToNextTime ();
			}
		},

		lifeToNextTime: function () {
			var nextUniverse = this;
	        for (var i = 0; i < nextUniverse.x; i++) {
	            for (var j = 0; j < nextUniverse.y; j++) {
	                nextUniverse.calculateCellState(i, j, this.countNeighborPlanet(i, j));
	            }
	        }

	        this.universeMapNumber = nextUniverse.universeMapNumber;
	        return this.buildToHtmlString();
	    },

	    calculateCellState: function (x, y, numberOfNeighbor) {
	        if (numberOfNeighbor < 2 || numberOfNeighbor > 3) {
	            this.universeMapNumber[x][y] = 0;
	        } else if (3 === numberOfNeighbor) {
	            this.universeMapNumber[x][y] = 1;
	        }
	    },

  		countNeighborPlanet: function (i,j){
  		return this.getValueOfCell()
 		},


		countNeighborPlanet: function (i, j) {
	        return this.getValueOfCell(i - 1, j - 1) + this.getValueOfCell(i - 1, j) + this.getValueOfCell(i - 1, j + 1)
	            + this.getValueOfCell(i, j - 1) + this.getValueOfCell(i, j + 1)
	            + this.getValueOfCell(i + 1, j - 1) + this.getValueOfCell(i + 1, j) + this.getValueOfCell(i + 1, j + 1);
	    },

    	getValueOfCell: function (x, y) {
	        if (x < 0 || x >= this.x || y < 0 || y >= this.y) {
	            return 0;
	        }

	        return this.universeMapNumber[x][y];
	    }
	    // showingNextTime: $(function(){
     //        $('body').html(this.lifeToNextTime(), null);
     //    },500)
    }
});