/******************************************************************************************** */
/************************* */
//INDEX:
//0. VARIABLES
    //0.1 Images variables
    //0.2 Dimensions of board variables
    //0.3 SNAKE VARIABLES
    //0.4 ID VARIABLES
    //0.5 - time variables
//1. AUTOMATIC START
    //1.1 Function - executeKey(event)
//2. LIFE OF PROGRAM
    //2.1 START AND END PROGRAM
        // 2.1.1 Function - powerOn()
        // 2.1.2 Function - powerOff()
    //2.2 LIFE OF GAME
//5. SNAKE FUNCTION
    //5.1 Function drawSnake(xxx)
    //5.2 Function eraseSnake(xxx)
    //5.3 Function moveSnakeArray(arrayId, newPosition, eat=false)
//60. BOARD FUNCTIONS
    //60.1 Function - makeBoard(rowsAndColumns, fatherId)
//99. POSITION FIND AND CREATE FUNCTIONS
/************************* */
/******************************************************************************************** */


/******************************************************************************************** */
//S> 0. VARIABLES
    /**************************************************************************************** */
    //S> 0.1 - Variables de imagenes!
    var imgGreen="src/img/green.png";
    var imgHead="src/img/head.png";
    var imgBody="src/img/body.png";
    var imgChange="src/img/change.png";
    var imgTail="src/img/tail.png";
    var imgApple="src/img/apple.png";
    var imgRock="src/img/rock.png";
    //E> 0.1 - Variables de imagenes!
    /**************************************************************************************** */

    /**************************************************************************************** */
    //S> 0.2 - Dimensions of board variables
    var sizeCell=64;
    var sizeBoard; //Es el número de px de cada lado
    var numberRowsColumns;
    //E> 0.2 - Dimensions of board variables
    /**************************************************************************************** */

    /**************************************************************************************** */
    //S> 0.3 - SNAKE VARIABLES
    var direction;
    var headPosition, headNewPosition, headOldPosition;
    var snakeMap = [[]];
    //E> 0.3 - SNAKE VARIABLES
    /**************************************************************************************** */

    /**************************************************************************************** */
    //S> 0.4 - ID VARIABLES
    var snakeHeadId = "snakeHead";
    var snakeArrayIdPosition =[]; //De cabeza a cola...
    var mapIDs=[];
    var appleId= "oneApple";
    //E> 0.4 - ID VARIABLES
    /**************************************************************************************** */

    /**************************************************************************************** */
    //S> 0.5 - time variables
    var moveLoop =null;
    var startGameTime, endGameTime;
    //E> 0.5 - time variables
    /**************************************************************************************** */
    
    /**************************************************************************************** */
    //S> 0.6 - User variables
    var userScore=0;
    var userName="anonymous";
    var users =[]; //This will be a array of user object.
    var user = {
        name: "",
        score: 0
    }
    //E> 0.6 - User variables
    /**************************************************************************************** */

//E> 0. VARIABLES
/******************************************************************************************** */

/******************************************************************************************** */
//S> 1.  AUTOMATIC START
//This space is reserved to code that execute when the js is called in the html...


//En principio el flujo del programa lo dirige las teclas...
// EventListener
//document.addEventListener("keydown", executeKey);

//S> 1.1 Function executeKey
function executeKey(event) {
    stopMove();
    switch (event.keyCode) {
        //Teclas de subida...
        case 87: //w W
        case 38: //ArrowUp
            if (direction=="S") break; //si la dirección es la contraria, no se puede girar...
            direction="W";
            startMove();
            break;
        //Teclas de bajada...
        case 83: //s S
        case 40: //ArrowDown
            if (direction=="W") break; //si la dirección es la contraria, no se puede girar...
            direction="S";
            startMove();
            break;
        //Teclas de izquierda...
        case 65: //a A
        case 37: //ArrowLeft
            if (direction=="D") break; //si la dirección es la contraria, no se puede girar...
            direction="A";
            startMove();
            break;
        //Teclas de derecha...
        case 68: //d D
        case 39: //ArrowRight
            if (direction=="A") break; //si la dirección es la contraria, no se puede girar...
            direction="D";
            startMove();
            break;
        //Tecla de escape...
        case 27: //Escape
            //Debería parar todos los timer de movimiento...
            clearInterval(moveLoop);
            break;
        //Tecla de fuego!!! Je je... Por si acaso... tengo tiempo...
        case 70: //f F
            //La serpiente arroja fuego MUAHAHAHA
            console.log("El fuego no está disponible...");
            break;
    }
}
//E> 1.1 Function executeKey

//E> 1. AUTOMATIC START
/******************************************************************************************** */


/******************************************************************************************** */
//S> 2.LIFE OF PROGRAM

/************************************** */
    /************************************** */
    //S> 2.1 START AND END PROGRAM

//S> 2.1 Power On - powerOn()
function powerOn() {
    //Esta función se carga al iniciar la página...
    let gameUserInterface=document.getElementById("gameUI");
    gameUserInterface.style.display="flex";
    while (gameUserInterface.firstChild) {
        gameUserInterface.removeChild(gameUserInterface.lastChild);
    }
    var date=new Date();
    gameUserInterface.innerHTML='<div><h1>Welcome to snake!</h1><p>¿Who are you?</p><input type="text" id="userName"><input type="button" value="Start" id="firstInput" onclick="startProgram(event)"><h6>Hora inicio: '+ date.getHours() +":" + date.getMinutes() + ":" + date.getSeconds() +'</h6></div>';
    //Creamos un menú de inicio en mitad de la pantalla...
}
//E> 2.1 Power On - powerOn()


function powerOff() {
    //Esta función liquida todo el contenido de la página...
}

function startProgram (event) {
    if(event.target.id=="firstInput") {
        userName=document.getElementById("userName").value;
        document.getElementById("gameUI").style.display="none";
        startGame();
    }

}

    //E> 2.1 START AND END PROGRAM
    /************************************** */
/************************************** */

/************************************** */
    /************************************** */
    //S> 2.1 LIFE OF THE GAME
    //Funciones de flujo de programa...


function startGame() {
    //IMPROTANT!
    //ADD KERYBOARD EVENT LISTENERS
    document.addEventListener("keydown", executeKey);
    //IMPROTANT!

    //If we are retrying
    document.getElementById("gameUI").style.display="none";
    //We destroy all posible children of gameBaord to start again clean...
    const gameBoard = document.getElementById("gameBoard");
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.lastChild);
    }
    //Clean some variables...
    mapIDs=[];
    userScore=0;
    snakeArrayIdPosition=[];
    startGameTime = new Date();
    //End clean some variables...

    console.clear();
    console.log(gameBoard);
    //Creamos el mapa...
    var idMap = makeBoard(10, "gameBoard");
    mapIDs = idMap;
    //Ponemos la serpiente en el mapa...
    var startPosition = document.getElementById(idMap[2]);
    snakeArrayIdPosition.push(idMap[2], idMap[1], idMap[0]); //Fill the start positions of the Snake
    //Creamos la cabeza de serpiente
    // var snakeHead=document.createElement("img");
    // snakeHead.src=imgHead; //Le asignamos su imagen...
    // snakeHead.id=snakeHeadId; //le asignamos un id
    //Anclamos la imagen a la posición inicial
    // startPosition.appendChild(snakeHead);
    drawSnake(snakeArrayIdPosition);
    putAnObject(snakeArrayIdPosition, mapIDs);

    //NOW WE HAVE TO ADD THE EVENT LISTENER...

}

function stopGame (causeOfDeath) {
    var newUserToPush= {
        name: userName,
        score: userScore
    }
    users.push(newUserToPush);
    var gameUserInterface=document.getElementById("gameUI");
    gameUserInterface.style.display="flex";
    gameUserInterface.removeChild(gameUserInterface.firstChild);
    var newDiv =document.createElement("div");
    gameUserInterface.appendChild(newDiv);
    let title = document.createElement("h1");
    if(causeOfDeath=="snake") {
        title.innerHTML ="You ate yourself... ¡Monster!";
    } else {
        title.innerHTML ="You die...";
    }
    newDiv.append(title);
    let newP = document.createElement("p");
    newP.innerHTML = "You eat " + userScore + " this game...";
    newDiv.append(newP);

    var endGameTime = new Date();
    var pTime = document.createElement("p");
    pTime.innerHTML="Time of game: " + Math.round((endGameTime.getTime() - startGameTime.getTime())/1000) +" seconds.";
    newDiv.append(pTime);
    var retryButton=document.createElement("button");
    retryButton.innerHTML="Retry...";
    retryButton.addEventListener("click", startGame);
    newDiv.appendChild(retryButton);
    var newButton=document.createElement("button");
    newButton.innerHTML="New user";
    newButton.addEventListener("click", powerOn);
    newDiv.appendChild(newButton);

    let ScoreTable= document.createElement("div");
    let  innerHTML="<h3>Ranking:</h3>";
    for (let i=0; i<users.length; i++) {
        innerHTML+="<p style='text-align: left;'><strong>"+users[i].name + ": </strong>  " + users[i].score + " </p>";
    }
    ScoreTable.innerHTML=innerHTML;
    newDiv.appendChild(ScoreTable);

}



function startMove(speed) { //speed in miliseconds...
    if(speed==undefined) speed=500;
    if(moveLoop==null) //Vamos que si no hay Loop iniciado...
    moveLoop=setInterval(function(){
        //Cada vez que da una vuelta tiene que bajar una casilla
        //Pero si es superior al borde del tablero mueres...
        headPosition=document.getElementById(snakeHeadId).parentNode.id;
        switch (direction) {
            case "W": //ARRIBA
                if(idY(headPosition)==1)  {//se va a chocar...
                    smashBorder();
                    break;
                }

                var newIdPosition =makeXY(idX(headPosition), idY(headPosition)-1);
                if(isSmashing(newIdPosition, snakeArrayIdPosition)) {
                    smashSnake();
                    break;
                }
                document.getElementById(snakeHeadId).style.transform = "rotate(270deg)";
                //moveChild(headPosition, newIdPosition);
                eraseSnake(snakeArrayIdPosition);
                snakeArrayIdPosition=moveSnakeArray(snakeArrayIdPosition,newIdPosition, isEating (newIdPosition, appleId));
                drawSnake(snakeArrayIdPosition,"W");
                break;
            case "S": //ABAJO
                if(idY(headPosition)==numberRowsColumns){//se va a chocar...
                    smashBorder();
                    break;
                }

                var newIdPosition =makeXY(idX(headPosition), idY(headPosition)+1);
                if(isSmashing(newIdPosition, snakeArrayIdPosition)) {
                    smashSnake();
                    break;
                }
                document.getElementById(snakeHeadId).style.transform = "rotate(90deg)";
                //moveChild(headPosition, newIdPosition);
                eraseSnake(snakeArrayIdPosition);
                snakeArrayIdPosition=moveSnakeArray(snakeArrayIdPosition,newIdPosition, isEating (newIdPosition, appleId));
                drawSnake(snakeArrayIdPosition,"S");
                break;
            case "A": //IZQUIERDA
                if(idX(headPosition)==1) {//se va a chocar...
                    smashBorder();
                    break;
                }

                var newIdPosition =makeXY(idX(headPosition)-1, idY(headPosition));
                if(isSmashing(newIdPosition, snakeArrayIdPosition)) {
                    smashSnake();
                    break;
                }
                document.getElementById(snakeHeadId).style.transform = "rotate(180deg)";
                //moveChild(headPosition, newIdPosition);
                eraseSnake(snakeArrayIdPosition);
                snakeArrayIdPosition=moveSnakeArray(snakeArrayIdPosition,newIdPosition, isEating (newIdPosition, appleId));
                drawSnake(snakeArrayIdPosition,"A");
                break;
            case "D": //DERECHA
                if(idX(headPosition)==numberRowsColumns) {//se va a chocar...
                    smashBorder();
                    break;
                }
                if(idX(headPosition)>numberRowsColumns)  smashBorder(); //se va a chocar...
                var newIdPosition =makeXY(idX(headPosition)+1, idY(headPosition));
                document.getElementById(snakeHeadId).style.transform = "rotate(0deg)";
                // moveChild(headPosition, newIdPosition);
                eraseSnake(snakeArrayIdPosition);
                snakeArrayIdPosition=moveSnakeArray(snakeArrayIdPosition,newIdPosition, isEating (newIdPosition, appleId));
                drawSnake(snakeArrayIdPosition,"D");
                startMove();
                break;
        }
        /************************** */
        function smashBorder() {
            stopMove();
            stopGame("border");
        }
        function smashSnake() {
            stopMove();
            stopGame("snake");
        }
        function isSmashing(snakeHeadPosition, arrayAllSnake) {
            //first remove the head element... Because don't thing that he is eating his head...
            let arrayToKill = [];
            let array = arrayToKill.concat(arrayAllSnake);
            array.shift();
            if(array.includes(snakeHeadPosition)) {
                return true;
            } else {
                return false;
            }
        }
        /************************** */
    }, speed);
}
function stopMove() {
    clearInterval(moveLoop);
    moveLoop=null; //Así invocarlo dará null y podremos saber que está apagado... :)
    //Font by Pau: https://stackoverflow.com/questions/34805296/check-if-an-interval-is-running-and-viceversa
}

    //E> 2.1 LIFE OF THE GAME
    /************************************** */
/************************************** */

//E> 2. LIFE OF PROGRAM
/******************************************************************************************** */



/******************************************************************************************** */
//S> 5. SNAKE FUNCTIONS

//S> 5.1 Put the snake images in the Board
function drawSnake (arrayId, headDirection) {
    if(headDirection==undefined) headDirection="D";
    arrayId.forEach(function(id, index) {
        let position = document.getElementById(id); //Find the cell element
        let newElement = document.createElement("img");
        if(index==0) { //If is the first part of snake is the HEAD
            newElement.src=imgHead; //Le asignamos su imagen...
            newElement.id=snakeHeadId; //le asignamos un id por ser la cabeza de todo! :)
            position.appendChild(newElement);
            //Now switch to put his head in right position...
            switch (headDirection) {
                case "W": //up
                    document.getElementById(snakeHeadId).style.transform = "rotate(270deg)";
                    break;
                case "S": //down
                    document.getElementById(snakeHeadId).style.transform = "rotate(90deg)";
                    break;
                case "A": //left
                    document.getElementById(snakeHeadId).style.transform = "rotate(180deg)";
                    break;
                case "D": //right
                    document.getElementById(snakeHeadId).style.transform = "rotate(0deg)";
                    break;
            }
        } else if(index==arrayId.length-1) { //If is the last part of the SNAKE is the TAIL
            newElement.src=imgTail; //Le asignamos su imagen...
            switch(nowDirectionType(id, arrayId)) {
                case "W":
                    newElement.style.transform="rotate(90deg)";
                    break;
                case "D":
                    newElement.style.transform="rotate(180deg)";
                    break;
                case "S":
                    newElement.style.transform="rotate(270deg)";
                    break;
                case "A":
                    newElement.style.transform="rotate(0deg)";
                    break;
            }
            position.appendChild(newElement);
        } else {
            //hay dos formas para esta pieza... Y va respecto a la anterior...
            //x-x: The elemement is horizontal between horizontal elements.
            //y-y: The element is vertical between vertical elements.
            //x-W: The element is a change to Up
            //x-S: The element is a change to Down
            //y-D: The element is a change to Right
            //y-A: The element is a change to Left
            //x-W-i: The element is a change to Up
            //x-S-i: The element is a change to Down
            //y-D-i: The element is a change to Right
            //y-A-i: The element is a change to Left
            newElement.src=imgRock;
            switch (nowDirectionType(id, arrayId)) {
                case "x-x":
                    newElement.src=imgBody; //Le asignamos su imagen...
                    newElement.style.transform="rotate(0deg)";
                    break;
                case "y-y":
                    newElement.src=imgBody; //Le asignamos su imagen...
                    newElement.style.transform="rotate(90deg)";
                    break;
                case "x-W":
                    newElement.src=imgChange; //Le asignamos su imagen...
                    newElement.style.transform="rotate(0deg)"; //v v
                    break;
                case "x-S":
                    newElement.src=imgChange; //Le asignamos su imagen...
                    newElement.style.transform="rotate(270deg)"; //v
                    break;
                case "y-D":
                    newElement.src=imgChange; //Le asignamos su imagen...
                    newElement.style.transform="rotate(90deg)"; //v
                    break;
                case "y-A":
                    newElement.src=imgChange; //Le asignamos su imagen...
                    newElement.style.transform="rotate(0deg)"; //vx
                    break;
                case "x-W-i":
                    newElement.src=imgChange; //Le asignamos su imagen...
                    newElement.style.transform="rotate(90deg)"; //v
                    break;
                case "x-S-i":
                    newElement.src=imgChange; //Le asignamos su imagen...
                    newElement.style.transform="rotate(180deg)"; //v
                    break;
                case "y-D-i":
                    newElement.src=imgChange; //Le asignamos su imagen...
                    newElement.style.transform="rotate(180deg)"; //v
                    break;
                case "y-A-i":
                    newElement.src=imgChange; //Le asignamos su imagen...
                    newElement.style.transform="rotate(270deg)"; //v
                    break;
                default:
                    console.log("No se ha mostrado tipo...");
                    break;
            }
            position.appendChild(newElement);
        }
    });
    function nowDirectionType(positionActualId, arrayId) {
        //Return:
        //x-x: The elemement is horizontal between horizontal elements.
        //y-y: The element is vertical between vertical elements.
        //x-W: The element is a change to Up
        //x-S: The element is a change to Down
        //y-D: The element is a change to Right
        //y-A: The element is a change to Left
        //x-W-i: The element is a change to Up
        //x-S-i: The element is a change to Down
        //y-D-i: The element is a change to Right
        //y-A-i: The element is a change to Left
        var idPositionIndex = arrayId.indexOf(positionActualId);
        if(idPositionIndex!=arrayId.length-1) {
            if(idX(positionActualId)>idX(arrayId[idPositionIndex-1]) && idY(positionActualId)==idY(arrayId[idPositionIndex-1])) {
                //If actual have horizontal move
                //Now we have to look if the next element go horizontal or change line
                if (idX(positionActualId)==idX(arrayId[idPositionIndex+1])) { //This means that the future element not is horizontal...
                    if(idY(positionActualId)>idY(arrayId[idPositionIndex+1])) {
                        //If the actual position is bigger then _l
                        return "x-W";
                    } else {
                        return "x-S";
                    }
                }
                return "x-x"; //Horizontal move...
            }
            if(idX(positionActualId)<idX(arrayId[idPositionIndex-1]) && idY(positionActualId)==idY(arrayId[idPositionIndex-1])) {
                //If actual have horizontal move

                //Now we have to look if the next element go horizontal or change line
                if (idX(positionActualId)==idX(arrayId[idPositionIndex+1])) { //This means that the future element not is horizontal...
                    if(idY(positionActualId)>idY(arrayId[idPositionIndex+1])) {
                        //If the actual position is bigger then _l
                        return "x-W-i";
                    } else {
                        return "x-S-i";
                    }
                }
                return "x-x"; //Horizontal move...
            }
            if(idY(positionActualId)>idY(arrayId[idPositionIndex-1]) && idX(positionActualId)==idX(arrayId[idPositionIndex-1])) {
                //If actual have vertical move

                //Now we have to look if the next element go vertical or change line
                if (idY(positionActualId)==idY(arrayId[idPositionIndex+1])) { //This means that the future element not is vertical...
                    if(idX(positionActualId)>idX(arrayId[idPositionIndex+1])) {
                        //If the actual position is bigger then _l
                        return "y-A";
                    } else {
                        return "y-D";
                    }
                }
            }
            if(idY(positionActualId)<idY(arrayId[idPositionIndex-1]) && idX(positionActualId)==idX(arrayId[idPositionIndex-1])) {
                //If actual have vertical move

                //Now we have to look if the next element go vertical or change line
                if (idY(positionActualId)==idY(arrayId[idPositionIndex+1])) { //This means that the future element not is vertical...
                    if(idX(positionActualId)>idX(arrayId[idPositionIndex+1])) {
                        //If the actual position is bigger then _l
                        return "y-A-i";
                    } else {
                        return "y-D-i";
                    }
                }
            }
            return "y-y"; //Horizontal move...
        } else {
            if(idX(positionActualId)>idX(arrayId[idPositionIndex-1]) && idY(positionActualId)==idY(arrayId[idPositionIndex-1])) {
                //If vertical position is the same and x is bigger than...
                return "D"; //The tail end in the right of snake...
            }
            if(idX(positionActualId)<idX(arrayId[idPositionIndex-1]) && idY(positionActualId)==idY(arrayId[idPositionIndex-1])) {
                //If vertical position is the same and x is lower than...
                return "A"; //The tail end in the right of snake...
            }
            if(idX(positionActualId)==idX(arrayId[idPositionIndex-1]) && idY(positionActualId)>idY(arrayId[idPositionIndex-1])) {
                //If horizontal position is the same and vertical is bigger than...
                return "S"; //The tail end in the down of snake...
            }
            if(idX(positionActualId)==idX(arrayId[idPositionIndex-1]) && idY(positionActualId)<idY(arrayId[idPositionIndex-1])) {
                //If horizontal position is the same and vertical is lower than...
                return "W"; //The tail end in the top of snake...
            }
        }
    }
}
//S> 5.1 Put the snake images in the Board  drawSnake(arrayId)

//S> 5.2 Put the snake images in the Board
function eraseSnake (arrayId) {
    arrayId.forEach(function(id, index) {
        var img = document.getElementById(id);
        img.removeChild(img.firstChild);
    });
}
//S> 5.2 Put the snake images in the Board  drawSnake(arrayId)

//S> 5.3 MoveSnakeArray  moveSnakeArray(arrayId, newPosition, eat=false)
function moveSnakeArray(arrayId, newPosition, eat) {
    if(eat==undefined) eat=false;
    var newArray = [];
    if (eat) {
        newArray.push(newPosition);
        newArray = newArray.concat(arrayId);
    } else {
        arrayId.pop();
        newArray.push(newPosition);
        newArray = newArray.concat(arrayId);
    }
    return newArray;
}
//E> 5.3 MoveSnake  moveSnakeArray(arrayId, newPosition, eat=false)

//S> 5.4 isEating(newPosition, mapArrayId)
function isEating (newPosition, foodId) {
    //is important to look if is eating before move, because first have to make disappear the eat...
    if(newPosition == document.getElementById(foodId).parentNode.id) {
        console.log("ÑAM ÑAM... DELICIOUS...");
        userScore+=1;
        console.log("you have eat " + userScore + " apples! \nDon't stop to eat!");
        let elementContainer=document.getElementById(newPosition);
        elementContainer.removeChild(elementContainer.firstChild);
        putAnObject(snakeArrayIdPosition,mapIDs);
        return true;
    }
    return false;
}
//E> 5.4 isEating(newPosition, mapArrayId)

//S> 5.5 putAnObject(snakeArrayId, mapArrayId)
function putAnObject (snakeArrayId, mapArrayId, object) {
    if(object==undefined) object="apple";
    if(snakeArrayId.length<mapArrayId.length) {
        //The theory say that always have to be bigger the element map to the Snake
        var arrayWithoutSnake = mapArrayId.filter(function(item){
            return !snakeArrayId.includes(item); //Return all elements that not are in the snake array
        });
        //Now we have a new array... We have to make a random...
        let randomPosition = Math.round(Math.random() * arrayWithoutSnake.length);
        switch(object) {
            case "apple":
                let fatherNewObjectElement = document.getElementById(arrayWithoutSnake[randomPosition-1]); //-1 to length be aproperty to an array
                let apple=document.createElement("img");
                apple.src=imgApple;
                apple.id=appleId;
                fatherNewObjectElement.appendChild(apple);
                break;
            default:
                alert("Object don't found...");
                break;
        }


    }
    return null;

    //Font of array filter idea: https://www.freecodecamp.org/forum/t/how-to-filter-an-array-with-another-array/139352/2
}
//E> 5.5 putAnObject(snakeArrayId, mapArrayId)

//E> 5. SNAKE FUNCTIONS
/******************************************************************************************** */



/******************************************************************************************** */
//S> 60. BOARD FUNCTIONS

//S>60.1 - Función makeBoard - makeBoard(rowsAndColumns, fatherId)
function makeBoard(rowsAndColumns, fatherId) {
    //
    //La función makeBoard hace posible generar el tablero, necesita el tamaño de un lado y el id en el que se va a anclar el resultado... Devuelve un array con todos los ids de la tabla... Por si las moscas...
    if (rowsAndColumns<4) {
        return false;
    }
    //Guardamos este dato...
    numberRowsColumns = rowsAndColumns;
    //Calculamos el tamañano de cada lado del board (son iguales)
    sizeBoard= 64*rowsAndColumns;

    //Buscamos el elemento padre de anclaje y lo guaramos en una variable...
    let fatherElement= document.getElementById(fatherId);

    //Modificamos el estilo de la capa contenedora para que cuadre con el número de div...
    let txtStyleGridColumn="display: display:-ms-grid; display: grid; width: "+sizeBoard+"px; height: "+sizeBoard+"px; ";txtStyleGridColumn+="grid-template-columns: ";
    for(let i=0; i<rowsAndColumns; i++)  {
        txtStyleGridColumn+=" "+sizeCell+"px ";
    }
    //Cerramos el estilo con ;
    txtStyleGridColumn+=";";

    //Insertamos el estilo en el estilo de padre...
    fatherElement.style = txtStyleGridColumn;

    //Hacemos una variable para el mapa de id...
    let idMap=[];
    //Generamos los divs... Con id's unicas x1-y1 x2-y1 etc...
    for(let y=1; y<=rowsAndColumns; y++)  {
        //Estamos en la fila y ? y tenemos que rellenar todas las x...
        snakeMap.push([]);
        for(let x=1; x<=rowsAndColumns; x++) {
            //Creamos elemento y le asignamos el id correcto luego lo cargamos...
            let cell= document.createElement("div");
            //Le asignamos el fondo y la clase! :)
            cell.className="cell";
            cell.style.backgroundImage='url('+imgGreen+')';
            //Creamos un id
            let newId='x'+x+'-y'+y;
            cell.id ='x'+x+'-y'+y;//le asignamos el id específico!
            idMap.push(newId); //Lo guardamos por si las moscas...
            fatherElement.appendChild(cell);

            //Generamos el array del tablero...
            snakeMap[y-1].push(0);
        }
    }
    return idMap;
}
//E> 60.1 Function make board - makeBoard(rowsAndColumns, fatherId)


//S> 60.2 - Función isMakeBoardPosible - isMakeBoardPosible(rowsAndColumns)
function isMakeBoardPosible(rowsAndColumns) {
    //Necesitamos obtener tamaño de su pantalla

    //Primero miramos qué lado es más pequeño...

    //Le restamos px para que no sea tan apretado...

    //Miramos si es posible...

    //si es posible devolvemos true...

    //si no devolvemos false (o podríamos devolver las dimensiones mínimas aunque sea por consola...)

}
//E> 60.2 - Función isMakeBoardPosible - isMakeBoardPosible(rowsAndColumns)


//E> 60. BOARD FUNCTIONS
/******************************************************************************************** */

/******************************************************************************************** */
//S> 99. - POSITION FIND AND CREATE FUNCTIONS
function idX (id) {
    //Devuelve la posición x, de un id, es decir el número
    //La utilidad es obtener fácilmente X e Y de un id para usarlo en la búsqueda de un array...
    let pos=id.indexOf("x");
    let posBar =id.indexOf("-");
    return parseInt(id.slice(pos+1,posBar));
}
function idY (id) {
    //Devuelve la posición x, de un id, es decir el número
    //La utilidad es obtener fácilmente X e Y de un id para usarlo en la búsqueda de un array...
    let pos=id.indexOf("y");
    return parseInt(id.slice(pos+1));
}
function makeXY(x,y) {
    //Crea una id estándar con solo dar x e y
    let newId='x'+x+'-y'+y;
    return newId;
}

//E> 99. - POSITION FIND AND CREATE FUNCTIONS
/******************************************************************************************** */

/******************************************************************************************** */
//S> TAG AND DOM FUNCTIONS
function moveChild(oldFatherID, newFatherID) {
    var newFather = document.getElementById(newFatherID);
    var oldFather = document.getElementById(oldFatherID);
    newFather.append(oldFather.firstChild);/*
    oldFather.removeChild(oldFather.firstChild);
    oldFather.childNodes.forEach(function(element, index) {
        oldFather.remove(element);
    })*/
}
//E> TAG AND DOM FUNCTIONS
/******************************************************************************************** */

/****META META META */

/******************************************************************************************** */
//S>  POSITION FIND AND CREATE FUNCTIONS
    /**************************************************************************************** */
    //S> 0.1 - Variables de imagenes!

    //E> 0.1 - Variables de imagenes!
    /**************************************************************************************** */
//E> POSITION FIND AND CREATE FUNCTIONS
/******************************************************************************************** */

/******************************************************************************************** */
//S> X.  POSITION FIND AND CREATE FUNCTIONS

//E> X. POSITION FIND AND CREATE FUNCTIONS
/******************************************************************************************** */