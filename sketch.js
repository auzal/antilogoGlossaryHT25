let tbl;

function preload() {
  tbl = loadTable(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQk_RnhT4mUteKpvDFQFFIo498TO13mi58E4jcKqV8qQAV8bxA-95cEQNFqfkDSBZUTrMee-hfbzZL5/pub?gid=0&single=true&output=csv',
    'header',
    'csv'
  );
}

function setup() {
  noCanvas();
  parseData(tbl);
}


function parseData(tbl){
  

  // create an HTML table with w3.css class with the table tbl
  // tbl should be a p5.Table object
  // tableID is the selector ID you want to assign to the table
  // parentID is the element ID under which you want to locate the table
  // classID is the class to add to the <table>
  
  let cc = tbl.getColumnCount();
  let rc = tbl.getRowCount();  
  let rows = tbl.getRows();
  
  print('col =' +cc + ' row = ' +rc);
  print(tbl);

 
  
  for (let r = 0; r < rc; r++){
 
    for (let c = 1; c < cc; c++){
      
    
      if(c == 1){
        createElement('h3',tbl.get(r,c).toUpperCase());
      }
      else if(c == 2){
        createP(tbl.get(r,c));
      }else if(c == 4){
        let keywords = tbl.get(r,c);
        if(keywords.length > 0){
          keywords = 'Keywords: ' + keywords;
          createElement('h5',keywords);
        }
      }else if(c == 5){
          createElement('h6','Written by: ' + tbl.get(r,c));
      }
      
       
    }
  }
  
  
  
 // t.addClass(classID); // add the  table class from w3.csss
 // t.id(tableID); // sets the id for this <table>
  //t.parent(parentID);


}

function draw() {}

function setValue(idTag, x){
  select(idTag).value(x);
}

function buildTable (columnHeader){
  // return an empty P5 table with headers but no data
  let t = new p5.Table();
  let c;
  for(c=0; c < columnHeader.length; c+=1){
    t.addColumn(columnHeader[c]) ; 
  }
  return t;
}



function build_HTML_table (tbl, tableID, parentID, classID){
  // create an HTML table with w3.css class with the table tbl
  // tbl should be a p5.Table object
  // tableID is the selector ID you want to assign to the table
  // parentID is the element ID under which you want to locate the table
  // classID is the class to add to the <table>
  
  let cc = tbl.getColumnCount();
  let rc = tbl.getRowCount();  
  let rows = tbl.getRows();
  
  print('col =' +cc + ' row = ' +rc);
  print(tbl);
  
  // setup the table header HTML string
  let hh ="<tr>"; // header html
  for (let c = 0; c < cc; c++) {
    hh +="<th>" +  tbl.columns[c] +"</th>";
  }
  hh +="</tr>"
  
  // setup the table row HTML string
  let rh =""; // row html
  
  for (let r = 0; r < rc; r++){
    rh +="<tr>";
    for (let c = 0; c < cc; c++){
      
       // add the content of each cell
       rh +="<td>" +  tbl.get(r,c) + "</td>"; 
       
    }
    rh +="</tr>";
  }
  
  //print('cell (0,1) = ' + tbl.get(0, 1));
  //print('cell (0,0) = ' + tbl.get(0, 0));
  
  let t = createElement('table', hh+rh);
  
  t.addClass(classID); // add the  table class from w3.csss
  t.id(tableID); // sets the id for this <table>
  //t.parent(parentID);
  
}