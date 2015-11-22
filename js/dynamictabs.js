var tabCount = 0;

$(document).ready( function() {
    // add a click listener to the clear button that clears all tabs
    $("#clearButton").bind("click", function () {
        if (tabCount != 0) {
            $('#tabs ul li').remove();
            $('#tabs div').remove();
            $("#tabs").tabs("destroy");
            tabCount = 0;
        }
  });
  
  slider(); /*function to place the sliders don the page*/    
  validate(); /*function to validate the input for users*/
  submition(); /*submits a form and creates a table, assuming input is valid*/

}); // end of document ready

function submition() {
  // If the form is valid
  if( $("form#frm").valid() == true ) {
    // Then make it submit, which should update the tab in the process.
    $("form#frm").submit();
  }
}

function validate (){
  // add a form validator to the input form
  $("#frm").validate({
    // add rules that all 4 inputs are required and must be numbers
    rules: {
      rowStart: {
        required: true,
        number: true,
        min: -12,
        max: 12
      },
      rowEnd: {
        required: true,
        number: true,
        min: -12,
        max: 12
      },
      colStart: {
        required: true,
        number: true,
        min: -12,
        max: 12
      },
      colEnd: {
        required: true,
        number: true,
        min: -12,
        max: 12
      }
    },
    // add custom error messages and also highlight the input for errors
    messages: {
      rowStart: {
        required: function(){
        return "Row Start is required";
        },
        number: function(){
        return "Please provide a number for Row Start";
        },
        min: function(){
        return "Please enter a number greater than or equal to -12";
        },
        max: function(){
        return "Please enter a number less than or equal to 12";
        }
      },
      rowEnd: {
        required: function(){
        return "Row End is required";
        },
        number: function(){
        return "Please provide a number for Row End";
        },
        min: function(){
        return "Please enter a number greater than or equal to -12";
        },
        max: function(){
        return "Please enter a number less than or equal to 12";
        }
      },
      colStart: {
        required: function(){
        return "Column Start is required";
        },
        number: function(){
        return "Please provide a number for Column Start";
        },
        min: function(){
        return "Please enter a number greater than or equal to -12";
        },
        max: function(){
        return "Please enter a number less than or equal to 12";
        }
      },
      colEnd: {
        required: function(){
        return "Column End is required";
        },
        number: function(){
        return "Please provide a number for Column End";
        },
        min: function(){
        return "Please enter a number greater than or equal to -12";
        },
        max: function(){
        return "Please enter a number less than or equal to 12";
        }
      }
    },
    
    
    errorElement: "div",
    
    // custom error placement, to the right of input fields
    errorPlacement: function(error, element) {
        error.insertAfter(element);
      //var id = $(element).attr("id");
      //$("#" + id + "Error").append(error);
    },
    // if the input is valid and the form is submitted, call the SubmitForm function
    submitHandler: function(){
        createTable();
        return false;
    },
    
    invalidHandler: function () {
        // Wipe the previous table / error messages
        // This way nothing will show up if a user tries to submit with an error.
        $("#swapMsg").empty();
        $("#dynamictable").empty();
    },
    
    onkeyup: function( element, event ) {
      // Call the auto submit function on keyup, so the user does not have to
      // press the enter button.
      submition();
    }
    
  });
}

/*
  This function will place sliders to each input box. The sliders are dual binded
  so they update the text in the input box and the text entered in the input box 
  modifies the sliders. I modified code from:
  http://stackoverflow.com/questions/7523864/ui-slider-with-text-box-input/7524385#7524385
 */
function slider(){
    /*rowStart slider*/
    $("#rowStartSlider").slider({
        value: 0,
        min: -12,
        max: 12,
        animate: "fast",
        slide: function( event, ui ) {
            $( "#rowStart" ).val( ui.value );
            submition();
        }
    });
       
    $("#rowStart").on("keyup", function () {
        var value = this.value;
        $("#rowStartSlider").slider("value", value);
        submition();
    });
   
   /*rowEnd slider*/
   $("#rowEndSlider").slider({
       value: 0,
       min: -12,
       max: 12,
       animate: "fast",
       slide: function( event, ui ) {
           $( "#rowEnd" ).val( ui.value );
           submition();
       }
    });
    
    $("#rowEnd").on("keyup", function () {
        var value = this.value;
        $("#rowEndSlider").slider("value", value);
        submition();
    });
    
    /*colStart slider*/
    $("#colStartSlider").slider({
        value: 0,
        min: -12,
        max: 12,
        animate: "fast",
        slide: function( event, ui ) {
            $( "#colStart" ).val( ui.value );
            submition();
        }
    });

    $("#colStart").on("keyup", function () {
        var value = this.value; 
        $("#colStartSlider").slider("value", value);
        submition();
    });
    
    /*colEnd slider*/
    $("#colEndSlider").slider({
        value: 0,
        min: -12,
        max: 12,
        animate: "fast",
        slide: function( event, ui ) {
            $( "#colEnd" ).val( ui.value );
            submition();
        }
    });

    $("#colEnd").on("keyup", function () {
        var value = this.value;
        $("#colEndSlider").slider("value", value);
        submition();
    });    
}

function tabFunctions(){
    $("#tabs").tabs();

    // get all 4 values entered from the form
    var rowStart = $("#rowStart").val();
    var rowEnd = $("#rowEnd").val();
    var colStart = $("#colStart").val();
    var colEnd = $("#colEnd").val();

    // convert the form input to integers, truncate any floating point numbers
    rowStart = parseInt(rowStart);
    rowEnd = parseInt(rowEnd);
    colStart = parseInt(colStart);
    colEnd = parseInt(colEnd);

    tabCount++;
    
    var tabTitle = "<li class='tab'><a href='#tab" + tabCount + "'>" + rowStart +
                   " to " + rowEnd + " by " + colStart + " to " + colEnd + "</a>" +
                   "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";
      
    $("div #tabs ul").append(tabTitle);
    
    $("div #tabs").append("<div id='tab" + tabCount + "'>" + $("#dynamictable").html() + "</div>");
    
    $("#tabs").tabs("refresh");
    
    $("#tabs").tabs("option", "active", -1);
   
    $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
      var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelID ).remove();
      
    $("#tabs").tabs("refresh");
    
    if( $('div#tabs ul li.tab').length == 0) {
        $("#tabs").tabs("destroy");
    }
    
    });  
}

/*
  This function takes in two arrays of numbers (multiplicands and multipliers)
  and builds a multiplication table out of their products
*/
function createTable(rowArray, colArray) {
    // get all 4 values entered from the form
    var rowStart = $("#rowStart").val();
    var rowEnd = $("#rowEnd").val();
    var colStart = $("#colStart").val();
    var colEnd = $("#colEnd").val();

    // convert the form input to integers, truncate any floating point numbers
    rowStart = parseInt(rowStart);
    rowEnd = parseInt(rowEnd);
    colStart = parseInt(colStart);
    colEnd = parseInt(colEnd);
     
    //console.log("Row start: ", rowStart, "Row end: ", rowEnd),
    //console.log("Column start: ", colStart, "Column end: ", colEnd);
    
    
  // Empty the div first.
  // See this Stackoverflow post: https://stackoverflow.com/questions/20293680/how-to-empty-div-before-append
  $("#swapMsg").empty();

  // Swap row beginning / ending numbers if the start is larger than the beginning.
  if (rowStart > rowEnd) {

    // Add message telling user a swap has occurred 
    $("#swapMsg").append("<p class='warning_class'>Swapping the Row Start and Row End.</p>");

    var tmp_num = rowStart;
    rowStart = rowEnd;
    rowEnd = tmp_num;
  }

  // Also swap column beginning / ending
  if (colStart > colEnd) {

    // Add message telling user a swap has occurred
    $("#swapMsg").append("<p class='warning_class'>Swapping the Column Start and Column End.</p>");

    var tmp_num = colStart;
    colStart = colEnd;
    colEnd = tmp_num;
  }
  
    // first print the top row by itself
    var content = "<table><tbody id='formOutput'><tr><td></td>";
    for (var topRow = colStart; topRow <= colEnd; topRow++)
    {
      content += "<td class='topRow'>" + topRow + "</td>";
    }
    content += "</tr>";

    // now build the rest of the multiplication table by traversing each row
    // and each column in each row, and multiplying the values from the corresponding arrays
    for (var rows = rowStart; rows <= rowEnd; rows++)
    {
      content += "<tr>";
      for (var cols = colStart; cols <= colEnd; cols++)
      {
          if(cols == colStart){
              content += "<td>" + rows + "</td>";
          }
        content += "<td>" + rows * cols + "</td>";
      }
      content += "</tr>";
    }
    content += "</tbody></table>";
    
    $("#dynamictable").html(content);
    // Stop the form from refreshing.
    return false;
}

