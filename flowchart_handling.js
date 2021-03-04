console.log("Cards is being generated...");
const table = document.getElementById('recommends');
const button_table = document.getElementById('choices')
var element = document.querySelector('meta[name~="jsonDoc"]');
var content = element && element.getAttribute("content");
var json_file

console.log(table);

var step_count;

function reqListener () {
    json_file = JSON.parse(this.responseText);
    step_count = json_file.Root
    generatePage(json_file)
}

window.onpopstate = function(event) {
    if (event.state == null){
        step_count = json_file.Root;
        generatePage(json_file)}
    else if(event.state.step_destination){
            step_count = event.state.step_destination;
            generatePage(json_file)
    }
  };

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", content);
oReq.send();


function createCard(parsed_value) {
    
    var data_tags = {"normal":"normal", "shoujo":"border-info border-3 colored-border", "shounen":"border-success border-3 colored-border", "ecchi":"border-danger border-3 colored-border"}
    var change_tags = {"true":"changes border-3", "false":"not-change"}
    var tooltip_tags = {"normal":"", "shoujo":"targets female audiences (usually include themes of romance and friendship)", "shounen":"targets male audiences (usually aims to be adventurous and energetic)", "ecchi":"contains mild NSFW content", "true":"contains a plot twist or a slow start", "false":""}
    const align = document.createElement("div")
    align.className = "col-md mb-5"
    const card = document.createElement('div');
    card.className = "card";
    const cardBody = document.createElement("div");
    cardBody.className = "card-body"
    const textTitle = document.createElement("h5");
    textTitle.textContent = parsed_value[0];
    textTitle.id = "textTitle"
    textTitle.className = "card-title"
    const topName = document.createElement("span");
    topName.textContent = parsed_value[1];
    topName.id = "topName";
    topName.id = "card-text";
    var backgroundColor = data_tags.normal
    var outline = change_tags.false
    var hint_string = []
    if (data_tags[parsed_value[3]]){
       backgroundColor = data_tags[parsed_value[3]]
       hint_string.push(tooltip_tags[parsed_value[3]])
    };
    if (change_tags[parsed_value[4]]){
        outline = change_tags[parsed_value[4]]
        hint_string.push(tooltip_tags[parsed_value[4]])
    };
    card.classList.add(...backgroundColor.split(" "));
    card.classList.add(...outline.split(" "));
    if(parsed_value[2]){
    const bottomImage = document.createElement("img");
    if(!parsed_value[2].includes("img/")){
        parsed_value[2] = "img/"+ parsed_value[2]
    }
    bottomImage.src = parsed_value[2];
    bottomImage.className = "card-img-top"
    bottomImage.id = "bottomImage";
    card.append(bottomImage);
}
    cardBody.append(textTitle);
    cardBody.append(topName);
    if(card.classList.contains("border-3")){
        const inline_hint = document.createElement('span');
        inline_hint.setAttribute("data-bs-toggle", "tooltip");
        inline_hint.className = "bi bi-question-circle";
        inline_hint.id = "tooltip";
        inline_hint.setAttribute("data-bs-placement", "bottom");
        inline_hint.setAttribute("data-bs-original-title", `This show ${hint_string.filter(item => item).join(" and ")}`);
        cardBody.append(inline_hint);
    }
    card.append(cardBody)
    align.appendChild(card) 
    return align
}

function update_page(destination, json_obj){
    window.scrollTo(0, 0);
    history.pushState({"step":step_count, "step_destination":destination}, "", window.location);
    console.log({"step":step_count});
    step_count = destination;
    generatePage(json_obj);

}

function back(){
    console.log(history.state)
    history.back();
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
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }
    while (button_table.hasChildNodes()) {
        button_table.removeChild(button_table.lastChild);
    }
    var step_dict = step_count in json_obj["Nodes"]? json_obj["Nodes"][step_count]:NaN
    var step_edges = step_count in json_obj["Edges"]? json_obj["Edges"][step_count]:NaN
    if(step_dict != NaN){
        const rowDiv = document.createElement('div')
        rowDiv.className = "row"
        for (var i in step_dict){
        rowDiv.appendChild(createCard(step_dict[i]))
    }
    table.appendChild(rowDiv)
}   
    const backBtn = document.getElementById("backBtn")
    if(step_count != json_obj.Root){
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
    document.getElementById("mainTitle").innerHTML = null
    document.getElementById("mainTitle").innerHTML = json_obj["Title"][step_count].replace(/(\r\n|\r|\n)/g, '<br>');
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
    
}
