/*
	this is just a wrapper for rhino's "print" function
*/
function Console() {}

Console.prototype = {
	log : function (str) {
		print(str)
	}
}

var console = new Console();
