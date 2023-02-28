var count = 0   //  For Row Id of Input Table and for array delete index
// Array Declaration

var inputArr = [
    {
        name: "",
        subject: "",
        marks: "",
    },
    {
        name: "",
        subject: "",
        marks: "",
    },
    {
        name: "",
        subject: "",
        marks: "",
    },
    {
        name: "",
        subject: "",
        marks: "",
    },
    {
        name: "",
        subject: "",
        marks: "",
    }
]

var intialArr = JSON.parse(JSON.stringify(inputArr));
//function Dynamic Update of Row Id on Delete
function updateRowId() {
    $("#inputTableGenerate tr").each((i, ele) => {
        ele.setAttribute('id', `rowid${i}`)
    })
}
function intialRow() {
    for (i = 0; i < 5; i++) {
        $("#inputTableGenerate").append(`<tr id="rowid${count++}">  
             <td></td>
           <td><input type="text" class="form-control studentName" oninput="updateArray(this)"></td>
           <td><input type="text" class="form-control subject" oninput="updateArray(this)"></td>
           <td><input type="text" class="form-control studentMarks" oninput="updateArray(this)"></td>
           <td><button  class="btn btn-outline-primary button-style" >Pass</button ><button class="btn btn-outline-danger button-style">Fail</button></td>
      </tr>`)
    }
    emptyArr();


}

$(document).ready(() => {
    
    //Generating the table for 5 static data
    inputArr.forEach(_element => {

        $("#inputTableGenerate").append(`<tr id="rowid${count++}">  
             <td></td>
           <td><input type="text" class="form-control studentName" oninput="updateArray(this)"></td>
           <td><input type="text" class="form-control subject" oninput="updateArray(this)"></td>
           <td><input type="text" class="form-control studentMarks" oninput="updateArray(this)"></td>
           <td><button  class="btn btn-outline-primary button-style" >Pass</button ><button class="btn btn-outline-danger button-style">Fail</button></td>
      </tr>`)

    })

    // Counter Function
    // setInterval(function () {

    //    alert("Timeout");
    // },5000);
    counter();
    function counter() {
        var width = 100,
        height = 100,
        timePassed = 0,
        timeLimit = 90;

        var fields = [{
            value: timeLimit,
            size: timeLimit,
            update: function () {
                return timePassed = timePassed + 1;
            }
        }];

        var nilArc = d3.svg.arc()
            .innerRadius(50)
            .outerRadius(70)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        var arc = d3.svg.arc()
            .innerRadius(30)
            .outerRadius(40)
            .startAngle(0)
            .endAngle(function (d) {
                return ((d.value / d.size) * 2 * Math.PI);
            });

        var svg = d3.select("#counter").html(``).append("svg")
            .attr("width", width)
            .attr("height", height);

        var field = svg.selectAll(".field")
            .data(fields)
            .enter().append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .attr("class", "field");

        var back = field.append("path")
            .attr("class", "path path--background")
            .attr("d", arc);

        var path = field.append("path")
            .attr("class", "path path--foreground");

        var label = field.append("text")
            .attr("class", "label")
            .attr("dy", ".40em");

        (function update() {

            field
                .each(function (d) {
                    d.previous = d.value, d.value = d.update(timePassed);
                });

            path.transition()
                .ease("elastic")
                .duration(500)
                .attrTween("d", arcTween);
            if ((timeLimit - timePassed) == -1) {
                
                Swal.fire({
                    title: 'Your Free Trial Is Over You Can Log In To Use WithOut Time Limit',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Use WIth Time Limit',
                    denyButtonText: `Log In`
                  }).then((result) => {
        
                    if (result.isConfirmed) {
                      counter();
                    } else if (result.isDenied) {
                        window.location.href = 'LoginPage.html'
                    }
                    else{
                        counter();
                    }
                  })

            }
            if ((timeLimit - timePassed) <= 10) { pulseText(); }
            else
                label
                    .text(function (d) {
                        return d.size - d.value;
                    });

            if (timePassed <= timeLimit)
                setTimeout(update, 1000 - (timePassed % 1000));
            else
                destroyTimer();

        })();

        function pulseText() {
            back.classed("pulse", true);
            label.classed("pulse", true);

            if ((timeLimit - timePassed) >= 0) {
                label.style("font-size", "40px")
                    .attr("transform", "translate(0," + +4 + ")")
                    .text(function (d) {
                        return d.size - d.value;
                    });
            }

            label.transition()
                .ease("elastic")
                .duration(900)
                .style("font-size", "25px")
                .attr("transform", "translate(0," + -10 + ")");
        }

        function destroyTimer() {
            label.transition()
                .ease("back")
                .duration(700)
                .style("opacity", "0")
                .style("font-size", "5")
                .attr("transform", "translate(0," + -40 + ")")
                .each("end", function () {
                    field.selectAll("text").remove()
                });

            path.transition()
                .ease("back")
                .duration(700)
                .attr("d", nilArc);

            back.transition()
                .ease("back")
                .duration(700)
                .attr("d", nilArc)
                .each("end", function () {
                    field.selectAll("path").remove()
                });
        }

        function arcTween(b) {
            var i = d3.interpolate({
                value: b.previous
            }, b);
            return function (t) {
                return arc(i(t));
            };
        }


    }


    // Add empty  object to and calling addRow Html to generate row in web
    $("#addRow").on("click", function addRow() {

        var newStudentData = {
            name: "",
            subject: "",
            marks: "",
        }
        inputArr.push(newStudentData)
        addRowHtml()
    });
});
//  addRow Html to generate row in web
function addRowHtml() {
    $("#inputTableGenerate").append(`<tr id="rowid${count++}">
        <td></td>
        <td><input type="text" class="form-control studentName" oninput=updateArray(this)></td>
        <td><input type="text" class="form-control subject" oninput=updateArray(this)></td>
        <td><input type="text" class="form-control studentMarks" oninput=updateArray(this)></td>
         <td><button  class="btn btn-outline-primary button-style">Pass</button ><button class=" button-style btn btn-outline-danger">Fail</button><button class="btn  btn-danger btn-block button-style" onclick="common(this.parentElement.parentElement,this.parentElement.parentElement.id)" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg></button></td>
        </tr>`)
}
//Function for common delete btn
function common(element, id) {
    // if (confirm("Really want to delete the record !!") == true) {
    //     element.remove();
    //     removeArr(id);
    //     updateRowId();
    //     outputTableGenerate();
    //     count--;
    // } else {
    //     alert("Record is not deleted");
    // }
    // Using swal
    Swal.fire({
        title: 'Are you sure to delete the Row?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Row has been deleted.',
                'success',
            )
          
            element.remove();
            removeArr(id);
            updateRowId();
            outputTableGenerate();
            count--;
        }
    })

}

//Dynamic Update of array function
function updateArray(e) {
    var id = parseInt($(e).parents('tr').attr('id').split('rowid')[1]);
    var keys = Object.keys(inputArr[id]);
    $(e).parents('tr').find('input').each((i, e) => {
        inputArr[id][keys[i]] = e.value;
    })

}

// DYNAMIC VALIDATION OF DATA
// function dynamicInputValidation(e)
// {
//     var id = parseInt($(e).parents('tr').attr('id').split('rowid')[1]);  //Row index
//     var keys = Object.keys(inputArr[id]);  //key[i]  give row element 

// }
function removeArr(arrIndex) {
    var id = parseInt((arrIndex).split('rowid')[1]);
    inputArr.splice(id, 1);
}
$("#saveData").on("click", function () {
    $("#outputTableGenerate").html("")
    inputArr.forEach(element => {
        if (element.name != "" && element.subject != "" && element.marks != " ") {
            $("#outputTableGenerate").append(`<tr>
                <td></td>
                <td>${element.name}</td>
                <td>${element.subject}</td>
                <td>${element.marks}</td>          
           </tr>`)
        }
    })
});
// FUNCTION CALLING WHEN DELETE BTN IS CLICKED SO DYNAMIC UPDATE ON GENERATED REPORT
function outputTableGenerate() {
    $("#outputTableGenerate").html("")
    inputArr.forEach(element => {
        if (element.name != "" && element.subject != "" && element.marks != " ") {
            $("#outputTableGenerate").append(`<tr>
                <td></td>
                <td>${element.name}</td>
                <td>${element.subject}</td>
                <td>${element.marks}</td>          
           </tr>`)
        }
    })
}
function emptyArr() {
    inputArr = JSON.parse(JSON.stringify(intialArr));
}

//  Refresh Button function
$("#refresh").on("click", function refresh() {
    $("#inputTableGenerate").html("");
    $("#outputTableGenerate").html("");
    count = 0;
    intialRow();

})


// Function For Creating Matrix
$("#matrix").on("click" ,function (){
  
    do{ 
     var rowNo = parseInt(prompt("How many rows would you like?"));
    if(isNaN(rowNo)){
        alert("Enter a Valid Input")
        rowNo=""
    }
    }while(isNaN(rowNo) || rowNo =='' || rowNo<0 );
   
    do{ 
        var colNo = parseInt(prompt("How many columns would you like?"));
        if(isNaN(colNo)){
            alert("Enter a Valid Input")
            colNo=""
        }
     
        }while(isNaN(colNo) || colNo =='' || colNo<0);
    
    var matrixTable = "";
    var cellNum=0, row=rowNo, col=colNo;
        for (var r = 0; r < row ; r++) {
        matrixTable += "<tr>";
        for (var c = 0 ; c < col; c++ ) {
            matrixTable += "<td>" + (++cellNum) + "</td>";
        }
        matrixTable += "</tr>";

        }
    $("#generateMatrix").html("<table border=5>" + matrixTable + "</table>");
})
