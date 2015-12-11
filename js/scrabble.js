/*
  File: /~eoleary/js/scrabble.js
  Author: Evan O'Leary
  Contact: evan_oleary@student.uml.edu
  Created on: December 1, 2015 
  Updated on: December 10, 2015
  This file contains the logic to play one line of Scrabble. It is being updated continuously, 
  so new implementations and functions are likely to appear.
*/

/*The main data structure to run the whole scrabble game which keeps each letter's value
 * and distribution*/
var pieces = [
  {"letter":"A", "value":1,  "amount":9},
  {"letter":"B", "value":3,  "amount":2},
  {"letter":"C", "value":3,  "amount":2},
  {"letter":"D", "value":2,  "amount":4},
  {"letter":"E", "value":1,  "amount":12},
  {"letter":"F", "value":4,  "amount":2},
  {"letter":"G", "value":2,  "amount":3},
  {"letter":"H", "value":4,  "amount":2},
  {"letter":"I", "value":1,  "amount":9},
  {"letter":"J", "value":8,  "amount":1},
  {"letter":"K", "value":5,  "amount":1},
  {"letter":"L", "value":1,  "amount":4},
  {"letter":"M", "value":3,  "amount":2},
  {"letter":"N", "value":1,  "amount":6},
  {"letter":"O", "value":1,  "amount":8},
  {"letter":"P", "value":3,  "amount":2},
  {"letter":"Q", "value":10, "amount":1},
  {"letter":"R", "value":1,  "amount":6},
  {"letter":"S", "value":1,  "amount":4},
  {"letter":"T", "value":1,  "amount":6},
  {"letter":"U", "value":1,  "amount":4},
  {"letter":"V", "value":4,  "amount":2},
  {"letter":"W", "value":4,  "amount":2},
  {"letter":"X", "value":8,  "amount":1},
  {"letter":"Y", "value":4,  "amount":2},
  {"letter":"Z", "value":10, "amount":1},
  {"letter":"_", "value":0,  "amount":2}
];

/* This is a global variable but more really an array of objects
 * This was to determine letters for each piece 
 */
var scrabble_tiles = [
  {"id": "piece0", "letter": "A"},
  {"id": "piece1", "letter": "B"},
  {"id": "piece2", "letter": "C"},
  {"id": "piece3", "letter": "D"},
  {"id": "piece4", "letter": "E"},
  {"id": "piece5", "letter": "F"},
  {"id": "piece6", "letter": "G"}
];

/*This was an object that kept track of my Scrabble Row and pieceX 
/initially "PieceX" means that there has nothing on that tile.*/
var scrabble_row = [
  {"id": "drop0",  "tile": "pieceX"},
  {"id": "drop1",  "tile": "pieceX"},
  {"id": "drop2",  "tile": "pieceX"},
  {"id": "drop3",  "tile": "pieceX"},
  {"id": "drop4",  "tile": "pieceX"},
  {"id": "drop5",  "tile": "pieceX"},
  {"id": "drop6",  "tile": "pieceX"},
  {"id": "drop7",  "tile": "pieceX"},
  {"id": "drop8",  "tile": "pieceX"},
  {"id": "drop9",  "tile": "pieceX"},
  {"id": "drop10", "tile": "pieceX"},
  {"id": "drop11", "tile": "pieceX"},
  {"id": "drop12", "tile": "pieceX"},
  {"id": "drop13", "tile": "pieceX"},
  {"id": "drop14", "tile": "pieceX"}
];

/*This function will find what the current word will be and then output it to the
 html doc. It also gets the score but by calling another function to actually
 calculate the score.*/
function get_word() {
    var word = "";
    var score = 0;
    
    for(var i = 0; i < 15; i++) {
        if(scrabble_row[i].tile != "pieceX") {
            word += get_letter(scrabble_row[i].tile);
            score += calc_score(scrabble_row[i].tile);
        }
    }
    
    score += (score * scrabble_double());
    
    $("#score").html(score);
    
    if(word != "") {
        $("#word").html(word);
        return;
    }
    $("#word").html("_____")
}
// This function does the actual calculation for the score and 
function calc_score(passed_id) {
    var letter = get_letter(passed_id);
    var score = 0;
    
    /*Loop goes through the alphabet*/
    for(var i = 0; i < 27;i++) {
        var object = pieces[i];
        
        // checking if the piece on the screen correspond with what is actually in the 
        // object.
        if(object.letter == letter) {
            score = object.value;
            
            //*Check to see if we should double letter based on it's position*/
            score += (score * double_letter(passed_id));
        
            return score;
        }

    }
    // error code indicating something went wrong.
    return -1;
}

/*This function was just cases whether the program had to double the word or not
 in this case the tiles where I had double words were at index 3 and 11 which is 
the fourth and twelveth tiles on my scrabble row.*/ 
function scrabble_double(){
    if(scrabble_row[3].tile != "pieceX") {
        return 1;
    }
    if (scrabble_row[11].tile != "pieceX") {
        return 1;
    }
    
    return 0;
}

/*This function similar to the scrabble_double function, it is checking if the 
 program has to double the letter this time. For this case the places where I 
 had these double letters was the first tile, the 8th tile, and the last tile 
 which translate to the to the 0th, 7th, and 14th index.*/
function double_letter(passed_id) {
    var dropped_ID = find_tile_position(passed_id);
    
    if(dropped_ID == "drop0" || dropped_ID == "drop7" || dropped_ID == "drop14") {
        return 1
    }
    else {
        return 0;
    }
}
/*This function was to get the letter by passing an ID and then return the letter*/
function get_letter(passed_id) {
    // loop to iterate through the 7 pieces on the rack
    for(var i = 0; i < 7; i++) {
        // case to check if the letter was found
        if(scrabble_tiles[i].id == passed_id) {
            return scrabble_tiles[i].letter;
        }
    }
    // error to indicate if something went wrong.
        return -1;
}

/*This function finds the position of the piece on the board*/
function find_board_position(passed_id) {
    for(var i = 0; i < 15; i++) {
        if(scrabble_row[i].id == passed_id) {
            return i;
        }
    }
    return -1;
}
// Jason Downing and We helped me with these two functions and explained to me why he used
// them in his own implementation and suggested I should also do something similar.
// What I learned from him was this was to find which dropped ID does the passed ID
// belongs to.
function find_tile_position(passed_id) {
    for(var i = 0; i < 15; i++) {
        if(scrabble_row[i].tile == passed_id) {
            return scrabble_row[i].id;
        }
    }
}

/*This function will load the pieces for the Scrabble board it is modified from Jason Downing's implementation.*/
function load_scrabble_pieces() {
  var base_url = "img/scrabble/Scrabble_Tile_";       // base URL of the image
  var random_letter = "";                             // Random letter for the tile
  var piece = "";                                     // HTML for the current tile (image tag)
  var piece_ID = "";                                  // ID for the current tile. In the form "piece#" where # is between 0 and 6.
  var pos;                                            // Position of the rack.
  var img_left, img_top;                              // Used to set the tile's position, based on the position of the rack (pos)
   var rand_num = 1;

  // Load up 7 pieces
      for(var i = 0; i < 7; i++) {
        var temp = true;
        while(temp == true) {
            // this was generate 7 random letters from the object
            rand_num = generate_random_ints(0,26);
            // this was to check that each time we generate 7 random letters
            // to remove those letters out of the object pieces
            if(pieces[rand_num].amount != 0) {
                temp = false;
                pieces[rand_num].amount--;
            }
        }
    
    // This gets a random letter (letter's index in the array).
    random_letter = pieces[rand_num].letter;

    // Make the img HTML and img ID so we can easily append the tiles.
    piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + random_letter + ".jpg" + "'></img>";
    piece_ID = "#piece" + i;
    scrabble_tiles[i].letter = random_letter;

    // Reposition the tile on top of the rack, nicely in a row with the other tiles.

    // We first get the rack's location on the screen. Idea from a Stackoverflow post,
    // URL: https://stackoverflow.com/questions/885144/how-to-get-current-position-of-an-image-in-jquery
    pos = $("#the_rack").position();

    // Now figure out where to reposition the board piece.
    img_left = pos.left + 30 + (50 * i);      // This controls left to right placement.
    img_top = pos.top + 30;                   // This controls top to bottom placement.

    /* Load onto the page and make draggable.
       The height / width get set using these tricks:
       https://stackoverflow.com/questions/10863658/load-image-with-jquery-and-append-it-to-the-dom
       https://stackoverflow.com/questions/2183863/how-to-set-height-width-to-image-using-jquery
       https://stackoverflow.com/questions/9704087/jquery-add-image-at-specific-co-ordinates
       The relative stuff came from this w3schools page. I realized I could set the top and left
       relative to the rack (and the board for the droppable targets), which makes things wayyyyy
       easier. URL: http://www.w3schools.com/css/css_positioning.asp
    */
    // Add the piece to the screen
    $("#rack").append(piece);

    // Move the piece relative to where the rack is located on the screen.
    $(piece_ID).css("left", img_left).css("top", img_top).css("position", "absolute");

    // Make the piece draggable.
    $(piece_ID).draggable({
      appendTo: scrabble_board_row,
      revert: "invalid",            // This is key. Only the rack and game board are considered valid!
      start: function(ev, ui) {
        // Save original position. (used for swapping tiles)
        startPos = ui.helper.position();  // startPos is a global variable found in variables.js
      },
      stop: function() {
        // If an invalid event is found, this will return the draggable object to its
        // default "invalid" option. From this Stackoverflow post (also used in the droppable part.)
        $(this).draggable('option','revert','invalid');
      }
    });
  }
  }

// This was to generate random numbers the source can be found below 
// Source : https://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function generate_random_ints(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// This function is to make the Scrabble row droppable and let the program know where
// a piece is dropped. It is based on Jason Downing's implementation.
function load_droppable_pieces() {
    var img_location = "scrabbleimages/scrabble_transparent.png"; // the image's location
    var drop = "";
    var scrabbleDropID = "#drop" + i;
    
    console.log("Load Droppable Function")
    for(var i = 0; i < 15; i++) {
        scrabbleDropID = "#drop" + i;

//      Making the ID droppable
        $(scrabbleDropID).droppable ({
        // I used the https://jqueryui.com/droppable/#default to help me understand the whole droppable idea
        // This was to allow the row to know what has been dropped in one of its tiles and hold that piece's info.
            drop: function(event, ui) {
                
                // This part I had Jasons's help and guidance. He referred me to a site that he used
                // to find this implementation : // https://stackoverflow.com/questions/5562853/jquery-ui-get-id-of-droppable-element-when-dropped-an-item
                var drag_scrabbleID = ui.draggable.attr("id");
                var drop_scrabbleID = $(this).attr("id");
                scrabble_row[find_board_position(drop_scrabbleID)].tile = drag_scrabbleID;
                get_word();
//             console.log("this was drop here " + drag_scrabbleID + "" + drop_scrabbleID );
//             a good log just for debugging purposes
 //              console.log("Tile is: " + drag_scrabbleID + " - dropped on " + drop_scrabbleID)

//          This was to make the pieces snap however I really didn't notice any difference, it was
//          shown to me from Jason however the snapp thing I used from JQuery above seem to work
//          
            $(this).append($(ui.draggable));
            ui.draggable.css("top", $(this).css("top"));
            ui.draggable.css("left", $(this).css("left"));
            ui.draggable.css("position", "relative");
           get_word();
           
            },
         // this was to make it so if a letter was removed from the row, then to also do that for the 
         // word, and score and the score/word will change due to the letter removal.
            out: function(event, ui) {
                var drag_scrabbleID = ui.draggable.attr("id");
                var drop_scrabbleID = $(this).attr("id");
                
                if(drag_scrabbleID != scrabble_row[find_board_position(drop_scrabbleID)].tile) {
                    return;
                }
                scrabble_row[find_board_position(drop_scrabbleID)].tile = "pieceX";
                
                get_word();
            }
            
        });
    }
    
}
/*This function was taken from Jason Downing's post on Piazza and iis in the process 
 * of being modified so that when the user checks their word they will get feedback 
 * on whether it is a valid word in the English language.
 */
function submit() {
    // The dictionary lookup object
    var dict = {};

// Do a jQuery Ajax request for the text dictionary
    $.get("files/dict.txt", function (txt) {
        // Get an array of all the words
        var words = txt.split("\n");

        // And add them as properties to the dictionary lookup
        // This will allow for fast lookups later
        for (var i = 0; i < words.length; i++) {
            dict[ words[i] ] = true;
        }
    });

// Modified to only pass in one word, which can then be verified.
    function find_word(word) {
        // See if it's in the dictionary
        if (dict[ word ]) {
            // If it is, return that word
            return word;
        }

        // Otherwise, it isn't in the dictionary.
        return "_____";
    }
}

/*This function resets the board, score, and word so that the player can play another round*/
function reset() {
      // First clear the game board array.
  scrabble_board_row = [];    // Easy way of doing this.
  // URL for more ways of doing this: https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript


  // Set the score back to zero.
  score = 0;
  $("#score").html(score);

  // Remove all the scrabble tiles in the rack.
  for(var i = 0; i < 7; i++) {
    var tileID = '#' + scrabble_tiles[i].id;
    $(tileID).draggable("destroy");    // Destroys the draggable element.
    $(tileID).remove();                // Removes the tile from the page.
    // URL for more info: https://stackoverflow.com/questions/11452677/jqueryui-properly-removing-a-draggable-element
  }

  // Remove all the scrabble tiles on the game board.
  for(var i = 0; i < 15; i++) {
      // Make the space droppable again.
      $("#drop" + i).droppable("enable");

      // Remove the tile attached to the space.
      $("#disabled" + (i)).remove();    // The i + x will access all of them, since i starts at 0.
    }

  // Load up some new Scrabble pieces!
  load_scrabble_pieces();

  // Resets the HTML "Word: " and "Score: " display.
  get_word();    // Technically this returns -1 and just wipes the display clean.

  // Let the user know what's going on.
  $("#messages").html("<br>\BOARD AND TILES RESET.<br>CHECK THE RACK FOR NEW TILES.");

  return;
}