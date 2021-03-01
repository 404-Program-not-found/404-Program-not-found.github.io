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
    const card = document.createElement('div');
    card.className = "cell";
    card.id = "card"; 
    const textTitle = document.createElement("div");
    textTitle.textContent = title;
    textTitle.className = "textTitle"
    const topName = document.createElement("div");
    topName.textContent = text_name;
    topName.className = "topName"
    const bottomImage = document.createElement("div");
    bottomImage.innerHTML = `<img src= ${img_src} class="cardImage">`;
    bottomImage.className = "bottomImage"
    card.append(textTitle);
    card.append(bottomImage);
    card.append(topName);
    return card
}

function update_page(json_obj){
    step_count = destination
    while (table.hasChildNodes()) {
        table.removeChild(node.lastChild);
    }
    while (button_table.hasChildNodes()) {
        button_table.removeChild(node.lastChild);
    }
    generatePage(json_obj);

}

function createButton(text, json_obj){
    const button = document.createElement('button');
    button.textContent = text
    button.onclick = update_page(json_obj);
    button.className = "button"
    return button

}

function generatePage(json_obj){
    var step_dict = json_obj["Nodes"][step_count]
    var step_edges = json_obj["Edges"][step_count]
    document.getElementById("mainTitle").textContent = step_dict["Title"];
    var count = Object.keys(step_dict).length;
    if(count > 1){
        var i;
        for (i in step_dict.slice(1)){
        table.appendChild(createCard(i[0], i[1], i[2]))
    } 
}
    var count = Object.keys(step_edges).length;
    if(count >= 1){
        var i;
        for (i in step_edges){
        button_table.appendChild(createButton(i["Text"], json_obj))
    }
    
}
}