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
        number: true
},
rowEnd:{
    required: true,
    number: true
},
colStart:{
    required: true,
    number: true
},
colEnd:{
    required: true,
    number: true
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

        // create arrays of each numbers in the initial rows and columns
        var rowArray = CreateNumberArray(rowStart, rowEnd);
        var colArray = CreateNumberArray(colStart, colEnd);


        //build a multiplication table and print it to the page
        var tableContent = CreateTable(rowArray, colArray);
        $('#table').append(tableContent);
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
    
    var increment = 1; 
    
    /*will always fill the top row from least to greatest, 
     * even if the user enters numbers from greatest to least (row start > row end)*/
    if (start > end){
        end = [start, start = end][0]; 
    }
    
    // fill a vector with all the elements of the starting row
    for (var i = 0; i <= num; i++)
    {
            array[i] = start;
            //try changing to start = start ++;
            //because increment does not change from 1 to -1 anymore do to switch
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
    var content =  "<table><tbody id='formOutput'><tr><td></td>";
    for (var a = 0, b = colArray.length; a < b; a++)
    {
        content += "<td class='topRow'>" + colArray[a] + "</td>";
    }
    content += "</tr>";

    // now build the rest of the multiplication table by traversing each row
    // and each column in each row, and multiplying the values from the corresponding arrays
    for (var i = 0, j = rowArray.length; i < j; i++)
    {
        content = "<tr><td>" + rowArray[i] + "</td>";
        for (var k = 0, m = colArray.length; k < m; k++)
        {
            content += "<td>" + rowArray[i] * colArray[k] + "</td>";
        }
           content += "</tr>";
    }
    content += "</tr></tbody></table>";
    return content;
}
