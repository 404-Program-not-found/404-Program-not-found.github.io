console.log("Cards is being generated...");
const table = document.getElementById('recommends');
const button_table = document.getElementById('choices')
var element = document.querySelector('meta[name~="jsonDoc"]');
var content = element && element.getAttribute("content");
var json_file

console.log(table);

var step_count;
var history_array;

function reqListener () {
    json_file = JSON.parse(this.responseText);
    step_count = json_file["Root"]
    history_array = new Array(step_count);
    generatePage(json_file)
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", content);
oReq.send();


function createCard(title, text_name, img_src) {
    
    const align = document.createElement("div")
    align.className = "col-md mb-5"
    const card = document.createElement('div');
    card.className = "card";
    const cardBody = document.createElement("div");
    cardBody.className = "card-body"
    const textTitle = document.createElement("h5");
    textTitle.textContent = title;
    textTitle.id = "textTitle"
    textTitle.className = "card-title"
    const topName = document.createElement("span");
    topName.textContent = text_name;
    topName.id = "topName";
    topName.id = "card-text";
    const bottomImage = document.createElement("img");
    bottomImage.src = img_src;
    bottomImage.className = "card-img-top"
    bottomImage.id = "bottomImage";
    cardBody.append(textTitle);
    cardBody.append(topName);
    card.append(bottomImage);
    card.append(cardBody)
    align.appendChild(card)
    return align
}

function update_page(destination, json_obj){
    window.scrollTo(0, 0);
    step_count = destination
    history_array.push(destination)
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }
    while (button_table.hasChildNodes()) {
        button_table.removeChild(button_table.lastChild);
    }
    generatePage(json_obj);

}

function back(){
    step_count = history_array[history_array.length - 2]
    history_array.pop()
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }
    while (button_table.hasChildNodes()) {
        button_table.removeChild(button_table.lastChild);
    }
    generatePage(json_file);
}

function createButton(text, destination, json_obj){
    const button = document.createElement('button');
    button.textContent = text
    button.onclick = function() {update_page(destination, json_obj)};
    button.className = "col-md mx-2 mb-5 px-3"
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
    const backBtn = document.getElementById("backBtn")
    if(history_array.length > 1){
        backBtn.onclick = function() {back()};
        if(backBtn.classList.contains("disabled")){backBtn.classList.remove("disabled");}
    }
    else{
        if(!backBtn.classList.contains("disabled")){backBtn.classList.add("disabled");}
    }
    if(step_edges != NaN){
        const rowDiv = document.createElement('div')
        rowDiv.className = "row justify-content-center mx-2"
        for (var key in step_edges){
        rowDiv.appendChild(createButton(step_edges[key]["Text"], step_edges[key]["Destination"], json_obj));
    }
    button_table.appendChild(rowDiv)
}
    document.getElementById("mainTitle").textContent = json_obj["Title"][step_count];
    
}
