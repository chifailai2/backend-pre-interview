/*
HOW to use the node module https://www.npmjs.com/package/sudoku

//console.log(puzzle);
//console.log(solution.length);
//console.log(difficulty);


var puzzle1=[null,null,3,null,2,null,6,null,null,9,null,null,3,null,5,null,null,1,null,null,1,8,null,6,4,null,null,null,null,8,1,null,2,9,null,null,7,null,null,null,null,null,null,null,8,null,null,6,7,null,8,2,null,null,null,null,2,6,null,9,5,null,null,8,null,null,2,null,3,null,null,9,null,null,5,null,1,null,3,null,null]

for (var i = 0; i < puzzle1.length; i++) {
	if(puzzle1[i] != null)
		puzzle1[i]= puzzle1[i]-1;
}
console.log(puzzle1);

var solution1   = sudoku.solvepuzzle(puzzle1);
//console.log(sudoku.ratepuzzle(puzzle1, 4));
console.log(solution1);
*/


console.log("Program started!\n");

var sudoku = require('sudoku');
var puzzle     = sudoku.makepuzzle();
var solution   = sudoku.solvepuzzle(puzzle);
var difficulty = sudoku.ratepuzzle(puzzle, 4);

// Read the txt
const fs = require('fs')
fs.readFile('./sudoku.txt', 'utf8' , (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	
	// A. Store the txt to grid[50], each grid has array of "003020600900305001001806400008102900700000008006708200002609500800203009005010300"
	var grid = [];  //grid[0], grid[1]...
	var grid_object = []; // E.g. grid_object= [null,null,2,null,1...]
	
    const lines = data.split(/\r?\n/);
	for (var i=0; i < lines.length; i++){
		
		tempstring=""
		if (lines[i].charAt(0) == "G"){
			
			// 1. Combine the 9 row of the number to the string
			for(var j=1; j <= 9; j++)
				tempstring += lines[i+j].replace(/\n/g, '');  
			
			// 2. Put the 1 string into int array
			grid_object = tempstring.split('').map(Number); 
			
			// 3. Transform format (0->null & all number minus 1) for node module https://www.npmjs.com/package/sudoku
			for(var k=0; k < grid_object.length; k++){
				if (grid_object[k] != 0)
					grid_object[k]= grid_object[k]-1;
				else if (grid_object[k] == 0)
					grid_object[k]=null;								
			}
			grid.push(grid_object);			
		}
	}
	
	// B. Solve the sudoku
	var solution = [];
	for(var i=0; i < grid.length; i++)
		solution[i] = sudoku.solvepuzzle(grid[i]);
	
	// C. Add back 1 to all elements
	for(var i=0; i < solution.length; i++)
		for(var j=0; j < solution[i].length; j++)
			solution[i][j] += 1;
		
	
	// D. Store the result into 1 string with newline
	var result="";
	for (var i=0; i<solution.length; i++){
		result += "\nGrid "+ (i+1)
		for (var j=0; j<solution[i].length; j++){
			if (j%9==0)
				result+="\n";
			result+=solution[i][j];
			
		}
	}
	//console.log(result);
	
	// E. Delete file and Create file
	fs.unlink('result.txt', function (err) {
	if (err) throw err;
		//console.log('File deleted!');
	});

	fs.appendFile('result.txt', result, function (err) {
		if (err) throw err;
		console.log("Step1: \nAll 50 sudoku are solved!");
		console.log('The answer is saved to result.txt!');
	});
	
	// F. Calculate the first 3 number of the grid
	var sumof3number = [];
	var total=0;
	for(var i=0; i < solution.length; i++){
		var temp=solution[i][0]+solution[i][1]+solution[i][2];
		sumof3number.push(temp);
		total+=temp;
	}
	
	console.log("Step2:");
	for(var i=0; i < sumof3number.length; i++)
		console.log("sumof3number["+i+"]: "+sumof3number[i]);
		
	console.log("\nStep3: \nTotal sum of each for all puzzles: "+total+"\n");
	
	
})



