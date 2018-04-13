//map:
//size
//rows, colums.
//sells
//sell
//non-life
//calculateCellState
//calculateNeghtBorNumber.
//calculateNextTime
//has-life

//=>Xu ly dong thay doi kich thuoc ten template .html 
//(cho phep nhap kich thuoc vao ma tran thay doit theo)

Vue.component('create-map', {
    props: ['prop'],
    template: `
            <div>
                <div v-for = "(item, index) in prop">
                    <div v-for = "i in 50" v-bind:class = "'show-' + item[i-1]">
                    </div>
                </div>
            </div>`,
});

Vue.component('nextchange1-map', {
    props: ['propnext1'],
    template: `
                <div>
                    <div v-for="(item, index) in propnext1">
                        <div v-for="i in 50" v-bind:class="'show-' + item[i-1]"></div>
                    </div>
                </div>
            `,
    methods: {
        nextmap1: function () {
            this.$emit('change1');
        }
    }
});
Vue.component('change-sum-cell', {
    props: ['propsum', 'sum'],
    template: `
            <div>
                <div v-for = "(item, index) in propsum">
                    <div v-for = "i in sum" v-bind:class = "'show-' + item[i-1]"></div>
                </div>
            </div>
    `,
    methods: {
        nextmap2: function () {
            this.$emit('change2');
        }
    }
});

//component in component.

Vue.component('row-map', {
    props: ['proprow', 'positionrow'],
    methods: {
        showRowMap: function () {
            var newMapUniverse = [];
            for (var j = 0; j < 50; j++) {
                newMapUniverse[j] = this.proprow[this.positionrow][j];
            }
            return this.newMapUniverse;
        }
    },
    computed: {
        rowMapUniverse: function () {
            return this.showRowMap();
        }
    },
    template: `
        <div>
            <div v-for = "(item, index) in proprow"
                <div v-for = "i in 50" v-bind:class = "'show-' +rowMapUniverse[i-1]">
                </div>
            </div>
        </div>
    `,
});

Vue.component('cell-map', {
    props: ['propcell', 'positioncell'],
    methods: {
        showCellMap: function () {
            var newMapUniverse = [];
            for (var j = 0; j < 50; j++) {
                newMapUniverse[j] = propcell[this.positioncell][j];
            }
            return this.newMapUniverse;
        }
    },
    computed: {
        cellMapUniverse: function () {
            return this.showCellMap();
        }
    },
    template: `
        <div>
            <div v-for = "(item, index) in propcell"
                <div v-for = "i in 50" v-bind:class = "'show-' +item[i-1]">
                </div>
            </div>
        </div>
    `
});
var createMap = [];
new Vue({
    el: '#map-universe',
    data: {
        newUniverse: createMap,
        isCreate: true,
        isShowMap: true,
        //next
        isCreateNextMap: true,
        isShowNextMap1: false,

        issumcell: true,
        isShowsumcell: false,
        sumcell: '',
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
        autoChangeMap: function () {
            this.isShowAuto = setInterval(function () {
                if (document.getElementById('play2') !== null) {
                    document.getElementById('play2').click();
                }
            }, 90);
        }
    },


    computed: {
        newMapUniverse: function () {
            return this.addNewMap();
        },

        changeNewMapNumber: function () {
            return this.changeUniverseMapNumber1();
        },

        changesumcellMapNumber: function () {
            return this.changeUniverseSize();
        },
    }
});