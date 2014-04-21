// this is for Rhino print command, comment out before using in browser.
load('./console.js')

load('./grid.js')


var getNeighbours = function (x, y) {
	var neibs = []
	for (var i = x - 1; i <= x + 1; i++) {
		for (var j = y - 1; j <= y + 1; j++) {
			if (i < 0 || i >= size 
				|| j < 0 || j >= size 
				|| (i == x && j == y)) {continue};
			neibs.push([i, j])
		};
	};
	return neibs
}



function findPath(grid) {
	var closed_list = []
	var open_list   = []

	Array.prototype.hasCell = function(cell) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] instanceof Array && cell instanceof Array) {
				if (this[i].length !==  cell.length) {break};

				for (var j = 0; j < this[i].length; j++) {
					if (this[i][j] !==  cell[j]) {break};
					if (j == this[i].length - 1) {return i};
				};
			}
		}
		return -1
	};

	Array.prototype.clone = function() {
		return this.slice(0);
	};

	var sortFScore = function(cell1, cell2) {
		return grid.getFScore(cell1[0],cell1[1]) - grid.getFScore(cell2[0],cell2[1])
	};

	var doNeighbours = function (parent_cell) {
		closed_list.push(parent_cell)
		open_list.splice(open_list.hasCell(parent_cell), 1)

		neigbs = getNeighbours(parent_cell[0], parent_cell[1])
		for (var i = 0; i < neigbs.length; i++) {
			neigb_cell = neigbs[i]
			if (grid.isWall(neigb_cell[0],neigb_cell[1])) {continue};
			if (grid.isEnd(neigb_cell[0],neigb_cell[1])) {return true};

			if (open_list.hasCell(neigb_cell) == -1 && closed_list.hasCell(neigb_cell) == -1) {
				grid.setParent([parent_cell[0],parent_cell[1]], [neigb_cell[0],neigb_cell[1]]);
				open_list.push(neigb_cell)
			}

		}
		return false
	}

	var parseNodes = function (cell) {

		if (doNeighbours(cell)) {return cell};

		temp_open_list = open_list.sort(sortFScore).clone();
		for (var i = 0; i < temp_open_list.length; i++) {
			got_to_end = parseNodes(temp_open_list[i])
			if (got_to_end) return got_to_end
		}

	}

	var getParentChain = function (child) {
		if (!child) {return child};

		parent = grid.getParent(child)
		if (!parent) {return parent};

		return child.concat(getParentChain(parent))
	}

	var setPath = function (path) {
		for (var i = 0; i < path.length; i+=2) {
			if (!path[i]) {break};
			grid.setPath(path[i], path[i+1])
		};
	}

	open_list.push(start_cell)
	
	path = getParentChain(parseNodes(start_cell))

	setPath(path);

	// console.log(open_list)
	// console.log(closed_list)

}


var init = function (size, start_cell, end_cell, wall_cells) {

	var grid = new Grid(size)
	grid.setStart(start_cell[0], start_cell[1])
	grid.setEnd(end_cell[0], end_cell[1])

	wall_cells.forEach(function (cell) {
		grid.setWall(cell[0],cell[1])
	})

	findPath(grid)

	grid.print();
}


var size = 6;
var start_cell = [2, 1]
var end_cell   = [5, 4]
var wall_cells = [[4, 1],[2, 3],[4, 3],[5, 3]]

console.log("Representation :")
console.log("Walkable node    : .")
console.log("Un-walkable node : X")
console.log("Start node       : S")
console.log("End node         : E")
console.log("Path node        : *")

init(size, start_cell, end_cell, wall_cells)