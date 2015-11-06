/*
  File: /~eoleary/js/dynamictable_v2.js
  This file will read input from a form and output a multiplication table, while
  alerting users immediately if they have made an error achieved through the use
  of the jQuery validate plugin.
  Author: Evan O'Leary
  Contact: evan_oleary@student.uml.edu
  Created on: October 29, 2015
*/
$(document).ready(function(){
$("#frm").validate({
//rules to make sure all fields are numbers
rules:{
rowStart:{
    required: true,
    number: true,
    min: -10,
    max:10
},
rowEnd:{
    required: true,
    number: true,
    min: -10,
    max:10
},
colStart:{
    required: true,
    number: true,
    min: -10,
    max:10
},
colEnd:{
    required: true,
    number: true,
    min: -10,
    max:10
}
},
//add custom error messages and highlight errors
messages:{
    rowStart:{
    required: function(){
        highlightError("rowStart");
        return "Row Start is required";
    },
    number:function(){
        highlightError("rowStart");
        return "Please provide a number for Row Start";
    },
    min: function(){
        highlightError("colEnd");
        return "Please enter a number greater than or equal to -10";
    },
    max: function(){
        highlightError("colEnd");
        return "Please enter a number less than or equal to 10";
    }
},
rowEnd:{
    required: function(){
        highlightError("rowEnd");
        return "Row End is required";
    },
    number: function(){
        highlightError("rowEnd");
        return "Please provide a number for Row End";
    },
    min: function(){
        highlightError("colEnd");
        return "Please enter a number greater than or equal to -10";
    },
    max: function(){
        highlightError("colEnd");
        return "Please enter a number less than or equal to 10";
    }
},
colStart:{
    required: function(){
        highlightError("colStart");
        return "Column Start is required";
    },
    number: function(){
        highlightError("colStart");
        return "Please provide a number for Column Start";
    },
    min: function(){
        highlightError("colEnd");
        return "Please enter a number greater than or equal to -10";
    },
    max: function(){
        highlightError("colEnd");
        return "Please enter a number less than or equal to 10";
    }
},
colEnd:{
    required: function(){
        highlightError("colEnd");
        return "Column End is required";
    },
    number: function(){
        highlightError("colEnd");
        return "Please provide a number for Column End";
    },
    min: function(){
        highlightError("colEnd");
        return "Please enter a number greater than or equal to -10";
    },
    max: function(){
        highlightError("colEnd");
        return "Please enter a number less than or equal to 10";
    }
}
},

// if an input is successful, get rid of the highlighted border
    success:function(error, element){
    $(element).css({border: ""});
},

//place error messages next to the right of where error occurred
errorPlacement:function(error, element){
    var id = $(element).attr("id");
    $("#" + id + "Error").append(error);
},
  // if the input is valid and the form is submitted, call the SubmitForm function
    submitHandler: SubmitForm
}); // end of form validate
}); //end of document ready

/*
 This function highlights input form box where error has occurred
 */
function highlightError(str){
    $("#" + str).css({border: "2px solid red"});
}



function SubmitForm() {
    //clear any previous table
    $("#formOutput").html("");
    //get all 4 values entered from the form
    var rowStart = $("#rowStart").val();
    var rowEnd = $("#rowEnd").val();
    var colStart = $("#colStart").val();
    var colEnd = $("#colEnd").val();


    // convert the form input to integers, truncate any floating point numbers
    rowStart = parseInt(rowStart);
    rowEnd = parseInt(rowEnd);
    colStart = parseInt(colStart);
    colEnd = parseInt(colEnd);

    // create arrays of each numbers in the initial rows and columns
    var rowArray = CreateNumberArray(rowStart, rowEnd);
    var colArray = CreateNumberArray(colStart, colEnd);


    //build a multiplication table and print it to the page
    CreateTable(rowArray, colArray);
}//end of SubmitForm

/*
 This function takes in a starting number and ending number and 
 builds an array of all values between those numbers (including both of them)
 */
function CreateNumberArray(start, end) {
    // create empty array
    var array = [];

    // calculate the total length of the array
    var num = Math.abs(end - start);
    
    var increment;
    
    // if the start of the row is less than the end, we will be incrementing
    if (start < end) {
        increment = 1;
    }
    // otherwise we will decrement
    else {
        increment = -1;
    }
    // fill a vector with all the elements of the starting row
    for (var i = 0; i <= num; i++)
    {
        array[i] = start;
        start = start + increment;
    }
    
    // return the created array
    return array;
}

/*
 This function takes in two arrays of numbers (multiplicands and multipliers)
 and builds a multiplication table out of their products
 */
function CreateTable(rowArray, colArray) {

    // first print the top row by itself
    var toprow = "<tr><td></td>";
    for (var a = 0, b = colArray.length; a < b; a++)
    {
        toprow += "<td class='topRow'>" + colArray[a] + "</td>";
    }
    toprow += "</tr>";
    $("#formOutput").append(toprow);

    // now build the rest of the multiplication table by traversing each row
    // and each column in each row, and multiplying the values from the corresponding arrays
    for (var i = 0, j = rowArray.length; i < j; i++)
    {
        var rowContent = "<tr><td>" + rowArray[i] + "</td>";
        for (var k = 0, m = colArray.length; k < m; k++)
        {
            rowContent += "<td>" + rowArray[i] * colArray[k] + "</td>";
        }
        rowContent += "</tr>";
        $("#formOutput").append(rowContent);
    }
}
