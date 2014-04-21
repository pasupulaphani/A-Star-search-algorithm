/*
*/
load('./cell.js')

function Grid (size) {
	this.size = size;
	this.grid = [];
	this.cost = {linear : 1, diagnal : 1.5}
	for (var i = 0; i < this.size; i++) {
		temp = [];
		for (var j = 0; j < this.size; j++) {
			temp.push(new Cell(i, j))
		};
		this.grid.push(temp)
	};
}

Grid.prototype = {
	print : function () {
		for (var i = 0; i < this.size; i++) {
			// had to do this work around just because console.log prints newline
			var line = '';
			for (var j = 0; j < this.size; j++) {
				line = line + '  ' + this.grid[i][j].state();// + '(' + this.grid[i][j].getFScore() + ')'
			};
			console.log(line)
		};
	},

	setStart : function (x, y) {
		this.grid[x][y].is_start = true;
	},

	setEnd : function (x, y) {
		this.grid[x][y].is_end = true;

		// we can populate h-value for each cell
		for (var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				if (this.grid[i][j].is_wall) {continue};
				this.grid[i][j].h_score = Math.abs(x - i) + Math.abs(y - j);
			};
		};
	},

	setWall : function (x, y) {
		this.grid[x][y].is_wall = true;
	},

	setPath : function (x, y) {
		this.grid[x][y].is_path = true;
	},

	isWall : function (x, y) {
		return this.grid[x][y].is_wall;
	},

	isEnd : function (x, y) {
		return this.getEnd().isEqueals(this.grid[x][y])
	},

	getEnd : function () {
		for (var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				if (this.grid[i][j].is_end) {return this.grid[i][j]};
			};
		};
	},

	setParent : function (parent, child) {
		if (this.grid[child[0]][child[1]].is_wall) {return}

		// set parent
		this.grid[child[0]][child[1]].parent = this.grid[parent[0]][parent[1]]

		// set G score
		// don worry about diagnal checks ATM
		this.grid[child[0]][child[1]].g_score = this.grid[parent[0]][parent[1]].g_score + this.cost.linear;
	},

	getParent : function (child) {
		if (!child) {return child};
		parent = this.grid[child[0]][child[1]].parent
		if (!parent) {return parent};
		return [parent.x, parent.y];
	},

	getFScore : function (x, y) {
		return this.grid[x][y].getFScore();
	}
}


