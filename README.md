A-Star-search-algorithm
=======================

This is a simple nodeJs implementation of A* algorithm

API and DEMO : http://path-finder.eu-gb.mybluemix.net/

Find the [rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/JavaScript_Compiler) compatible version under rhino branch

-----------------------
###### Consider the following data set 
> - Grid size         = 6
> - start node        = [2, 1]
> - end node          = [5, 4]
> - Un-walkable nodes = [[4, 1],[2, 3],[4, 3],[5, 3]]

    $ node a_star.js
    Representation :
	Walkable node    : .
	Un-walkable node : X
	Start node       : S
	End node         : E
	Path node        : *

	  .  .  .  .  .  .
	  .  .  .  .  .  .
	  .  S  .  X  .  .
	  .  .  *  *  .  .
	  .  X  .  X  *  .
	  .  .  .  X  E  .
