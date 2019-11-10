$.fn.sheet = function( rowSize, columnHeaders, data, CellWidTh) {
	
	var exportButton = document.createElement('button')
	exportButton.id = "exportButton";
	exportButton.innerText = "Export";
	exportButton.style.margin = "4px"
	this.append(exportButton)
	
	
	var isMouseDown = false;
	var selectedCells = [];

	var data = [
		
		["1","1","1"],
		["1","2","1"]
		
	]
	var rows = 10;
	var columnHeader = ["folder","page","MR1"];
	var columnType = [];
	var columnData = ["","",""];
	var columnWidth = [100,100,100];
	var table = document.createElement("table")
	//table.border = "solid 1px black"
	var thead = document.createElement("thead")
	var theadtr = document.createElement("tr")
	theadtr.innerHTML = "<td class='header-class'> Rows </td>"

	for (var i = 0; i < columnHeader.length; i++) {
		theadtr.innerHTML = theadtr.innerHTML + "<td class='header-class' height = '25px'width = '" + columnWidth[i] + "'>"  +  columnHeader[i] + "</td>";
	}

	var tbody = document.createElement("tbody")
	var tr = document.createElement("tr")

	for (var i = 0; i < rows; i++) {

		var tr = document.createElement("tr")
		
		var rowId = document.createElement("td")
		rowId.innerText = i+1;
		rowId.className = "RowLine"
		tr.append(rowId)
		
		for (var o = 0; o < columnHeader.length; o++) {
			var td = document.createElement("td")
			td.height="25px";
			td.id= i + "-" + o;
			if (data[i] != undefined) {
				td.innerText = data[i][o]
			}
			td.contentEditable = true;
			td.className = "Cell"
			td.addEventListener("blur", function() {
				UpdateData();
			});
			tr.append(td)
		}
		tbody.append(tr)
	}


	thead.append(theadtr)
	table.append(thead)
	table.append(tbody)
	this.append(table)

	
	$("tbody td").bind( "click", function() {
		if (this.className != "header-class" && this.className != "RowLine") {
		if (this.getAttribute("data").match(/[+-/*//]/g) && this.getAttribute("data").substring(0,1) == "=") {
			this.innerText = this.getAttribute("data");
		}
		}
	});
	
	//$(table).on("DOMSubtreeModified", function() {
	  //alert('changed');
	//});

	
	$("#exportButton").bind( "click", function() {
		
		var csvFile;
		var downloadLink;
		var csv = [];
		
		var rows = table.querySelectorAll("table tr")
		console.log(rows)
		
	    for (var i = 0; i < rows.length; i++) {
			var row = [];
			var tds = rows[i].querySelectorAll("td");
			
			for (var o = 0; o < tds.length; o++) {
				row.push(tds[o].innerText);     
			}
			csv.push(row.join(","));   
		}
		
		console.log(csv.join("\n"))

		csvFile = new Blob([csv.join("\n")], {type: "text/csv"});
		downloadLink = document.createElement("a");
		downloadLink.download = "simplesheet.csv";
		downloadLink.href = window.URL.createObjectURL(csvFile);
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		
	});
	
	function UpdateData() {
		
		var cells = table.querySelectorAll("table td")

		for (var i = 0 ; i < cells.length ; i ++) {
			
			
			
			if (cells[i].innerText.match(/[+-/*//]/g) && cells[i].innerText.substring(0,1) == "=" ) {
				cells[i].setAttribute("data", cells[i].innerText)
				console.log(cells[i].innerText.substring(0,1))
				cells[i].innerText = eval(cells[i].innerText.substring(1))
			}
			
		}
		
		
		
	} //end of UpdateData
	
	
/*

	$("tbody td").bind( "dblclick", function() {
		$("tbody td").removeClass("selected");
		$("tbody td").removeClass("normal");
		$("tbody td").addClass("dblclicked");
		this.className = "dblclicked";
	});
	
	$("tbody td").bind( "mousedown", function() {
		isMouseDown = true;
	});
	
	$("body").bind( "mouseup", function() {
		isMouseDown = false;
		selectedCells = [];
	});
	
	$("tbody td").bind( "mouseover", function() {
		if (isMouseDown == true) {
			selectedCells.push(this.id)
		}


	});
	
	*/
	
	//this.append($('<table>adfds</table>')
		//	.attr({ cellSpacing : 0 })

		//)



































	
	
}; 
