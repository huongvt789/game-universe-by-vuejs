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

new Vue ({
	el: '#map',
	data: {
		createUniverse: createMap,
		isCreat: true,
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
		}

//add function...
	},
	computed: {
		createNewUnverse: function () {
			return this.creatNewMap();
		},
	}
});