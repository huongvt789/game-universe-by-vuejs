/**
 * Created by viva on 4/13/18.
 */
Vue.component('create-map', {
    props: ['mapuniverse'],
    template: `
        <div>
            <div v-for = "(item, index) in mapuniverse">
                <div v-for="i in 50" v-bind:class="'show-' + item[i-1]"></div>
            </div>
        </div>
    `,
});

Vue.component('universe-life', {
    props: ['changefirst'],
    template: `
        <div>
             <button id="next1" v-on:click="changeMap1">Nexting ...</button><br>
             <div v-for="a in 50" style="float: left;">
                  <row-map :x="a-1" :row="changefirst"></row-map>
             </div>
        </div>
    `,
    methods: {
        changeMap1: function () {
            this.$emit('changemap1');
        }
    }
});

Vue.component('universe-life2', {
    props: ['changetwo'],
    template: `
        <div>
             <button id="next2" v-on:click="changeMap2">Nexting ...</button><br>
             <div v-for="a in 50"  style="float: left;">
                  <row-map :x="a-1" :row="changetwo"></row-map>
             </div>
        </div>
    `,
    methods: {
        changeMap2: function () {
            this.$emit('changemap2');
        }
    }
});
Vue.component('row-map', {
    props: ['row', 'positionrow'],
    methods: {
        showRowMap: function () {
            var rowmap = [];
            for (var j = 0; j < 50; j++) {
                rowmap[j] = this.row[this.positionrow][j];
            }
            return rowmap;
        }
    },

    computed: {
        showRowMapUniver: function () {
            return this.showRowMap();
        }
    },

    template: `
                <div>
                    <div v-for="i in 50">
                        <cell-map :x="i-1" :cell="showRowMapUniver"></cell-map>
                    </div>
                </div>
           `
});

Vue.component('cell-map', {
    props: ['cell', 'positioncell'],
    methods: {
        showCellMap: function () {
            var cellmap = "";
            for (var j = 0; j < 50; j++) {
                cellmap = this.cell[this.positioncell];
            }
            return cellmap;
        }
    },

    computed: {
        showCellMapUniverse: function () {
            return this.showCellMap();
        }
    },
    template: `
             <div>
                 <div v-bind:class="'show-' + showCellMapUniverse"></div>
             </div>
            `
});

var createMap = [];
new Vue({
    el: '#map-universe',
    data: {
        newUniverse: createMap,
        isShowMap: true,
        isShowChangeMap1: false,
        isShowChangeMap2: false
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
            this.isShowChangeMap2 = true;
            this.isShowMap = false;
            this.isShowChangeMap1 = false;
            for (var i = 0; i < 50; i++) {
                for (var j = 0; j < 50; j++) {
                    this.calculateCellState(i, j);
                }
            }
            return this.newUniverse;
        },
        changeUniverseMapNumber2: function () {
            this.isShowChangeMap1 = true;
            this.isShowChangeMap2 = false;
            this.isShowMap = false;
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
        changeNewMapUniverse: function () {
            return this.changeUniverseMapNumber1();
        }
    }
});
setInterval(function () {
    if (document.getElementById('next1') !== null) {
        document.getElementById('next1').click();
    }

}, 100);
setInterval(function () {
    if (document.getElementById('next2') !== null) {
        document.getElementById('next2').click();
    }
}, 100);