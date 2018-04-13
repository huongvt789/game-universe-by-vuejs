let lifeUniverseModelGame = (function() {
	let model = {};

    model.universeMapNumber = [];
    model.universeToString = '';
    model.x = 0;
    model.y = 0;

// B1: Tao mot bieu do so

	model.createUniverseMapRandom = function (x, y) {
		model.x = x;
		model.y = y;
		 for (let i = 0; i <= model.x; i++) {
            model.universeMapNumber[i] = [];
            for (let j = 0; j <= model.y; j++) {
                model.universeMapNumber[i][j] = Math.round(Math.random());
            }
        }
	};

// B2: Xay dung giao dien cho tung ma tran

	model.buildToHtmlString = function () {
	 model.universeToString = '';
        for (let i = 0; i < model.x; i++) {
            model.universeToString += `<div class="grid">`;
            for (let j = 0; j < model.y; j++) {
                let cellType = model.universeMapNumber[i][j] === 1 ? 'planet' : 'space';
                model.universeToString += `<div class="` + cellType + `"></div>`;
            }
            model.universeToString += `</div>`;
        }

        return model.universeToString;
    };

// B3: Xay dung qua trinh xu ly thoi gian lam moi

	model.evolve= function (time = 1) {
		for (let i = 1; i <= time; i++){
			model.lifeToNextTime ();
		}
	};

// B3: Xay dung ham tinh gia tri thoi gian lam moi

	model.lifeToNextTime = function () {
		let nextUniverse = this;
        for (let i = 0; i < nextUniverse.x; i++) {
            for (let j = 0; j < nextUniverse.y; j++) {
                nextUniverse.calculateCellState(i, j, model.countNeighborPlanet(i, j));
            }
        }

        model.universeMapNumber = nextUniverse.universeMapNumber;
        return model.buildToHtmlString();
    };

// B4: Tinh toan trang thai hien tai. 

	model.calculateCellState = function (x, y, numberOfNeighbor) {
        if (numberOfNeighbor < 2 || numberOfNeighbor > 3) {
            model.universeMapNumber[x][y] = 0;
        } else if (3 === numberOfNeighbor) {
            model.universeMapNumber[x][y] = 1;
        }
    };

  model.countNeighborPlanet =function (i,j){
  	return model.getValueOfCell()
  };

// B5: Tinh toan so luong hang xom lan can.

	  model.countNeighborPlanet = function (i, j) {
        return model.getValueOfCell(i - 1, j - 1) + model.getValueOfCell(i - 1, j) + model.getValueOfCell(i - 1, j + 1)
            + model.getValueOfCell(i, j - 1) + model.getValueOfCell(i, j + 1)
            + model.getValueOfCell(i + 1, j - 1) + model.getValueOfCell(i + 1, j) + model.getValueOfCell(i + 1, j + 1);
    };

// B6: Kiem tra loai tru truong hop dac biet doi voi gia tri o bien gioi

	
    model.getValueOfCell = function (x, y) {
        if (x < 0 || x >= model.x || y < 0 || y >= model.y) {
            return 0;
        }

        return model.universeMapNumber[x][y];
    };
	return model;

})();