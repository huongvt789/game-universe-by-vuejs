//map:
	//size
		//rows, colums.
	//sells
//sell
	//non-life
		//calculateStateCell
		//calculateNeghtBorNumber.
		//calculateNextTime
	//has-life

//=>Xu ly dong thay doi kich thuoc ten template .html 
//(cho phep nhap kich thuoc vao ma tran thay doit theo)
var numberUniverseMap = [];
	window.onload = function () {
	var map = new Vue ({
		el: '#map',
		data: {
			createUniverse: numberUniverseMap,
			isCreatMap: true,
			isShowMap: false
		},

		methods: {
			createNewMap: function () {
				for (var i = 0; i<100; i++){
					this.createUniverse[i] = [];
					for (var j = 0; j <100; j++) {
						this.createUniverse[i][j] = Math.round (Math.random());
					}
				}
				return this.createUniverse;
			},

	//add function...
			getValueOfCell: function (x,y) {
				if (x < 0 || x >= 100 || y <0 || y >=100) {
					return 0;
				}
				else {
					return this.createUniverse[x][y];
				}
			},
			countNeighPlanet: function (i, j) {
	            return parseInt(this.getValueOfCell((i - 1), (j - 1))) + parseInt(this.getValueOfCell((i - 1), j)) + parseInt(this.getValueOfCell((i - 1), (j + 1))) + parseInt(this.getValueOfCell(i, (j - 1))) + parseInt(this.getValueOfCell(i, (j + 1))) + parseInt(this.getValueOfCell((i + 1), (j - 1))) + parseInt(this.getValueOfCell((i + 1), j)) + parseInt(this.getValueOfCell((i + 1), (j + 1))) ;
			},
			calculateStateCell: function (i, j) {
				this.isShowMap = false;
				if (this.countNeighPlanet (i, j) <2 || this.countNeighPlanet (i, j) >3) {
					this.createUniverse[i][j];
				}
			}
		},
		computed: {
			createNewUnverse: function () {
				return this.creatNewMap();
			},
			universeNumberMap: function () {
				this.isShowMap =false;
				for ( var i = 0; i < 100; i++) {
					for ( var j = 0; j <100; j++) {
						this.calculateStateCell (i, j);
					}
				}
				return this.createUniverse;
			}
		}
	});
}