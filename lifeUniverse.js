/**
 * Created by viva on 4/13/18.
 */


var createMap = [];
new Vue({
    el: '#map-universe',
    data: {
        newUniverse: createMap,
        isShowMap:true
    },
    methods: {
        addNewMap: function () {
            for (var i = 0; i < 50; i++) {
                this.newUniverse[i] = [];
                for (var j = 0; j < 50; j++) {
                    this.newUniverse[i][j] = Math.round(Math.random());
                }
            }
            return this.newUniverse;
        },

        getValueOfCell: function (x, y) {
            if (x < 0 || x >= 50 || y < 0 || y >= 50) {
                return 0;
            }
            else {
                return this.newUniverse[x][y];
            }
        },

        countNeighborPlanet: function (i, j) {
            return parseInt(this.getValueOfCell((i - 1), (j - 1))) + parseInt(this.getValueOfCell((i - 1), j))
                + parseInt(this.getValueOfCell((i - 1), (j + 1))) + parseInt(this.getValueOfCell(i, (j - 1)))
                + parseInt(this.getValueOfCell(i, (j + 1))) + parseInt(this.getValueOfCell((i + 1), (j - 1)))
                + parseInt(this.getValueOfCell((i + 1), j)) + parseInt(this.getValueOfCell((i + 1), (j + 1)));
        },

        calculateCellState: function (i, j) {
            if (this.countNeighborPlanet(i, j) < 2 || this.countNeighborPlanet(i, j) > 3) {
                this.newUniverse[i][j] = 0;
            } else if (this.countNeighborPlanet(i, j) == 3) {
                this.newUniverse[i][j] = 1;
            }
        },

        changeUniverseMapNumber1: function () {
            this.isShowNextMap1 = true;
            for (var i = 0; i < 50; i++) {
                for (var j = 0; j < 50; j++) {
                    this.calculateCellState(i, j);
                }
            }
            return this.newUniverse;
        },
        changeUniverseSize: function () {
            this.isShowsumcell = true;
            for (var i = 0; i < this.sumcell; i++) {
                for (var j = 0; j < this.sumcell; j++) {
                    this.calculateCellState(i, j);
                }
            }
            return this.newUniverse;
        },
    },
    computed: {
        newMapUniverse: function () {
            return this.addNewMap();
        },
    }
});