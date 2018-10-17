const girdSize = 3;
const gridLength = girdSize * girdSize;

var ticTacToe = {
  Xcontainer:[],
  Ocontainer:[],
  combinations: ['012','345','678','036','147','258','048','246']
}

function generateGrid(){
  var gridRow = '';
  var gridColumn = '';
  var gridContainer = document.getElementById('gird-container');

  for (var i = 0; i < girdSize; i++){
    gridRow += '<div class="row">';
    gridColumn = ''; 
    for(var j=0; j< girdSize; j++){
      gridColumn += '<div class="box" data-id="'+ i + ',' + j + '"></div>';
    }
    gridRow += gridColumn + '</div>';
  }

  gridContainer.innerHTML = gridRow;
  registerEvents();
}

generateGrid();



function registerEvents() {
  var boxes = document.querySelectorAll('.box');
  var selected = 'selected';

  boxes.forEach(function(val, index){
      val.addEventListener('click',function(e){
        var classNames = val.getAttribute('class');
        var id = val.getAttribute('data-id');
        if (classNames.search(selected) == -1){
          val.innerHTML = 'X';
          val.style.backgroundColor  = "red";
          val.classList.add(selected);
          ticTacToe.Xcontainer.push(id);

          if(ticTacToe.Xcontainer.length > girdSize - 1){
            if(checkResult(id)){
              return true;
            }
          }

          if(ticTacToe.Ocontainer.length + ticTacToe.Xcontainer.length < gridLength){
            computerTurn();
          }
        }
      });
  })
}

function checkResult(rowNCol){
  var result = validate(rowNCol);
  var isGameOver = false;
  var text = [
    "Game is Draw",
    "X own the Game",
    "O own the Game"
  ];
  var msgIndex = 0;

  if (result == 0){
    msgIndex = 1;
    isGameOver =  true;
  }else if(result == 1){
    msgIndex = 2;
    isGameOver =  true;
  } else if (result == 2 && (ticTacToe.Ocontainer.length + ticTacToe.Xcontainer.length == gridLength)){
    msgIndex = 0;
    isGameOver = true;
  }

  if(isGameOver){
    document.getElementById('result').innerHTML = text[msgIndex];
    document.querySelector('.reset_button').style.display = "block";
  }

  return isGameOver;
}



function computerTurn(){
  var randomIndex = getRandom();
  var computerBox = document.querySelector('[data-id="'+randomIndex+'"]');

  computerBox.innerHTML = 'O';
  computerBox.style.backgroundColor = "green";
  computerBox.classList.add('selected');
  ticTacToe.Ocontainer.push(randomIndex+'');

  if(ticTacToe.Ocontainer.length > girdSize - 1){
    checkResult(randomIndex);
  }
}

function getRandom(){
  var existing = ticTacToe.Xcontainer.concat(ticTacToe.Ocontainer);

  for (var i = 0; i < girdSize; i++) {
    var mRandom = Math.floor(Math.random() * girdSize);
    var nRandom = Math.floor(Math.random() * girdSize);
    var indeces = mRandom + ',' + nRandom;
    if (existing.indexOf(indeces) == -1) {
      
      return indeces;
    } else {
      i--;
    }
  }

}

function validate(rowNCol){
  var Xcomb = ticTacToe.Xcontainer;
  var Ocomb = ticTacToe.Ocontainer;
  var rc = rowNCol.split(',');
  var row = rc[0];
  var col = rc[1];

  // 0 -- X win
  // 1 -- O win
  // 2 -- Draw
  var result = 2;

  if(rowsMatching(Xcomb, row, girdSize) || columnsMatching(Xcomb, col, girdSize) || 
      crossMatching(Xcomb, row, col, girdSize)){
        result = 0;
  
  } else if (rowsMatching(Xcomb, row, girdSize) || columnsMatching(Xcomb, col, girdSize) ||
    crossMatching(Xcomb, row, col, girdSize)){
    result = 1;
  }


  return result;
}

function rowsMatching(grid, row, girdSize){
  var count = 0;
  for(var i=0; i < girdSize; i++ ){
    var index = row + ',' + i;

    if(grid.indexOf(index) > -1 ){
      count++;
    }else {
      break;
    }
  }

  return count === girdSize;
}

function columnsMatching(grid, col, girdSize){
  var count =0;
  for(var i=0; i < girdSize; i++){
    var index = i + ',' + col;

    if (grid.indexOf(index) > -1) {
      count++;
    } else {
      break;
    }
  }

  return count === girdSize;

}

function crossMatching(grid, row, col, girdSize){
  var count =0;
  if( row - col == 0){
    for(var i=0; i< girdSize; i++){
      var index = i+ ',' + i;
      
      if (grid.indexOf(index) > -1) {
        count++;
      } else {
        break;
      }
    }
  }

  if( row + col == girdSize - 1){
    count = 0;
    var s = girdSize - 1;
    for(var i = s; i >= 0; i-- ){
      var index = i + ',' + (s - i);

      if (grid.indexOf(index) > -1) {
        count++;
      } else {
        break;
      }

    }
  }

return count == girdSize;

}

function resetGame(){
  const selectedBoxes = document.getElementsByClassName("selected");
  while(selectedBoxes.length){
    selectedBoxes[0].innerHTML = "";
    selectedBoxes[0].style.backgroundColor = "#ffffff";
    // selectedBoxes[0].className = selectedBoxes[i].className.replace(/\bselected\b/g, "");
    selectedBoxes[0].classList.remove("selected");
    //document.querySelector('.reset_button').style.display = "none";
    generateGrid();
    }
}