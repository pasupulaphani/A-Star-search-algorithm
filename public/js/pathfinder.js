
    var convertToCell = function(c) {
        var c1 = c.split(',');
        var res = [];
        c1.forEach(function(cord) {
            res.push(parseInt(cord))
        })
        return res;
    };

    var convertToWall = function(w) {
        var w1 = w.split('|');
        var res = [];
        w1.forEach(function(c) {
            res.push(convertToCell(c));
        })
        return res;
    }

    var lastClicked;

    var size = 10
    var start = '4,1'
    var end = '6,7'
    var startCell = convertToCell(start)
    var endCell = convertToCell(end)
    var wall_cells = [];
    var path = [];

    Element.prototype.hasClass = function(className) {
        return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
    };

    function reDrawGrid() {
        var grid = clickableGrid(function(el, row, col, i) {
            console.log("You clicked on element:", el);
            console.log("You clicked on row:", row);
            console.log("You clicked on col:", col);
            console.log("You clicked on item #:", i);


            if (el.hasClass('clicked')) {
                el.className = '';
                el.innerHTML = ' ';
            } else {
                el.className = 'clicked';
                el.innerHTML = 'X';
            }
            lastClicked = el;
        });

        document.getElementById('demo').appendChild(grid);
    }


    function clickableGrid(callback) {
        var rows = 10;
        var cols = 10;
        var i = 0;
        var grid = document.createElement('table');
        grid.className = 'grid';
        for (var r = 0; r < rows; ++r) {
            var tr = grid.appendChild(document.createElement('tr'));
            for (var c = 0; c < cols; ++c) {
                var cell = tr.appendChild(document.createElement('td'));
                //cell.innerHTML = ++i;
                cell.addEventListener('click', (function(el, r, c, i) {
                    return function() {
                        callback(el, r, c, i);
                    }
                })(cell, r, c, i), false);

                if (r === startCell[0] && c === startCell[1]) {
                    cell.innerHTML = 'S';
                    cell.className = 'start';
                } else if (r === endCell[0] && c === endCell[1]) {
                    cell.innerHTML = 'E';
                    cell.className = 'end';
                } else {
                    wall_cells.forEach(function(p) {
                        if (r === p[0] && c === p[1]) {
                            cell.className = 'clicked';
                            cell.innerHTML = 'X';
                        }
                    });

                    path.forEach(function(p) {
                        if (r === p[0] && c === p[1]) {
                            cell.className = 'path';
                        }
                    });
                }
            }
        }
        return grid;
    }

    function getWall() {
        var res = [];
        var x = 0;
        $(".grid tr").each(function() {
            var j = 0;
            $('td', this).each(function() {
                var value = $(this).hasClass("clicked");
                if (value) {
                    console.log(x + '' + j)
                    res.push([x, j])
                }
                j++;
            })
            x++;
        })
        return res
    }

    function convertWS(wall) {
        var res = [];
        wall.forEach(function(c) {
            res.push(c.join(','))
        })
        return res.join('|')
    }

    function drawPath() {

        wall_cells = getWall()
        var wallStr = convertWS(wall_cells);
        $.get("/path/a-star?size=10&start=" + start + "&end=" + end + "&wall=" + wallStr, function(data, status) {
            console.log(data);
            path = data;
            var list = document.getElementsByClassName("grid");
            console.log(list)
            for (var i = list.length - 1; 0 <= i; i--) {
                //if(list[i] && list[i].parentElement)
                list[i].parentElement.removeChild(list[i]);
            }
            reDrawGrid();
        });
    }
    reDrawGrid()