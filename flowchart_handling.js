console.log("Cards is being generated...");
const table = document.getElementById('recommends');
const button_table = document.getElementById('choices')

console.log(table);

var step_count = "1"

function reqListener () {
    var obj = JSON.parse(this.responseText);
    generatePage(obj)
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "flowchart_short.json");
oReq.send();


function createCard(title, text_name, img_src) {
    
    const align = document.createElement("div")
    align.className = "col-sm-4"
    const card = document.createElement('div');
    card.className = "panel panel-primary";
    card.id = "card"; 
    const textTitle = document.createElement("div");
    textTitle.textContent = title;
    textTitle.id = "textTitle"
    textTitle.className = "panel-heading"
    const topName = document.createElement("div");
    topName.textContent = text_name;
    topName.id = "topName"
    topName.id = "panel-footer"
    const bottomImage = document.createElement("div");
    bottomImage.innerHTML = `<img src= ${img_src} class="img-responsive center-block" id="cardImage">`;
    bottomImage.className = "panel-body"
    bottomImage.id = "bottomImage"
    card.append(textTitle);
    card.append(bottomImage);
    card.append(topName);
    align.appendChild(card)
    return align
}

function update_page(destination, json_obj){
    step_count = destination
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }
    while (button_table.hasChildNodes()) {
        button_table.removeChild(button_table.lastChild);
    }
    generatePage(json_obj);

}

function createButton(text, destination, json_obj){
    const button = document.createElement('button');
    button.textContent = text
    button.onclick = function() {update_page(destination, json_obj)};
    button.className = "col-sm-4"
    button.id = "buttonChoices"
    return button

}

function generatePage(json_obj){
    var step_dict = step_count in json_obj["Nodes"]? json_obj["Nodes"][step_count]:NaN
    var step_edges = step_count in json_obj["Edges"]? json_obj["Edges"][step_count]:NaN
    if(step_dict != NaN){
        const rowDiv = document.createElement('div')
        rowDiv.className = "row"
        for (var i in step_dict){
        rowDiv.appendChild(createCard(step_dict[i][0], step_dict[i][1], step_dict[i][2]))
    } 
    table.appendChild(rowDiv)
}
    if(step_edges != NaN){
        const rowDiv = document.createElement('div')
        rowDiv.className = "row"
        for (var key in step_edges){
        rowDiv.appendChild(createButton(step_edges[key]["Text"], step_edges[key]["Destination"], json_obj))
    }
    button_table.appendChild(rowDiv)
}
    document.getElementById("mainTitle").textContent = json_obj["Title"][step_count];
    
}
