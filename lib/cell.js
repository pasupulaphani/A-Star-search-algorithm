/*
*/
function Cell(x, y) {
	this.x = x;
	this.y = y;
}

Cell.prototype = {
	is_start  : false,
	is_end    : false,
	is_wall   : false,
	is_path   : false,
	h_score   : 0,
	g_score   : 0,
	parent    : null,
	state : function () {
		if (this.is_start) {
			return 'S'
		} else if (this.is_end) {
			return 'E'
		} else if (this.is_wall) {
			return 'X'
		} else if (this.is_path) {
			return '*'
		} else { return '.' };
	},
	getFScore : function () {
		return this.h_score + this.g_score;
	},
	isEqueals : function (cell) {
		return (this.x === cell.x & this.y === cell.y)
	}
}

module.exports = Cell;
