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

var createMap = [];
window.onload = function () {
var map = new Vue ({
        el: '#map',
        data: {
            newUniverse: createMap,
            isCreate: true,
            isShowingMap: false,
            isShowingNewMap: false,
        },
        methods: {
            addNewMap: function() {
                for (var i = 0 ; i < 70; i++) {
                    this.newUniverse[i] = [];
                    for (var j = 0; j < 70; j++) {
                        this.newUniverse[i][j] = Math.round(Math.random());
                    }
                }
                return this.newUniverse;
            },
            getValueOfCell: function (x, y) {
                if (x < 0 || x >= 70 || y < 0 || y >= 70) {
                    return 0;
                }
                else {
                    return this.newUniverse[x][y];
                }
            },
            countNeighborPlanet: function (i, j) {
                return parseInt(this.getValueOfCell((i - 1), (j - 1))) + parseInt(this.getValueOfCell((i - 1), j)) + parseInt(this.getValueOfCell((i - 1), (j + 1))) + parseInt(this.getValueOfCell(i, (j - 1))) + parseInt(this.getValueOfCell(i, (j + 1))) + parseInt(this.getValueOfCell((i + 1), (j - 1))) + parseInt(this.getValueOfCell((i + 1), j)) + parseInt(this.getValueOfCell((i + 1), (j + 1))) ;
            },
            calculateCellState: function (i, j) {
                this.isShowingMap = false;
                if (this.countNeighborPlanet(i, j) < 2 || this.countNeighborPlanet(i, j) > 3) {
                    this.newUniverse[i][j] = 0;
                } else if (this.countNeighborPlanet(i, j) == 3) {
                    this.newUniverse[i][j] = 1;
                }
            },
        },
        computed: {
            newMapUniverse: function () {
                return this.addNewMap();
            },
            universeMapNumber: function () {
                this.isShowingMap = false;
                for (var i = 0 ; i < 70; i++) {
                    for (var j = 0; j < 70; j++) {
                        this.calculateCellState(i, j);
                    }
                }
                return this.newUniverse;
            },
        }
    });
}