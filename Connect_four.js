// creating the players, assigning the player the color is easier on to code
var player1 = prompt("Player One: Enter your name, you will be Blue!");
var player1Color = 'rgb(29, 23, 209)';

var player2 = prompt("Player Two: Enter your name, you will be Red!");
var player2Color = 'rgb(245, 5, 5)';

var game_on = true;
var table = $('table tr');

//simple winner statement in console for possible debug
function reportWin(rowNum, colNum) {
    console.log("You won starting at this row, col");
    console.log(rowNum);
    console.log(colNum);
}

// setting up to change the color of selected buttons
function changeColor (rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find("button").css('background-color', color);
}

function returnColor (rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find("button").css('background-color');
}

//checking if "connect four chips" have already been placed at the bottom
//rgb here is the would be "empty" color
function checkBottom(colIndex){
    var colorReport = returnColor(5, colIndex);
    for (var row = 5; row > -1; row--){
        colorReport = returnColor(row, colIndex);
        if (colorReport === 'rgb(224, 222, 222)'){
            return row
        }
    }
}

//checking possible matches for the win
//do not allow to check against defined, to prevent going off board
//rgb here again is the "empty" color
function colorMatchCheck(one, two, three, four){
    return (one ===two && one === three && one === four && one !== 'rgb(224, 222, 222)' && one !== undefined)
}


function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

//Start out with the first player
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+" It is your turn to pick a column")

$(".board button").on("click", function(){
    var col = $(this).closest("td").index();
    var bottomAvail = checkBottom(col);
    changeColor(bottomAvail, col, currentColor);
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        $("h1").text(currentName+" You have won!");
        $("h2").fadeout("fast");
        $("h3").fadeout("fast");
    }

    currentPlayer = currentPlayer * -1;

    if (currentPlayer === 1) {
        currentName = player1;
        $('h3').text(currentName = " it is your turn.")
        currentColor = player1Color
    }else{
        currentName = player2;
        $('h3').text(currentName = " it is your turn.")
        currentColor = player2Color
    }
})


