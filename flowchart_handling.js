console.log("Cards is being generated...");
const table = document.getElementById('recommends');

console.log(table);

function reqListener () {
    var obj = JSON.parse(this.responseText);
    document.getElementById("mainTitle").textContent = obj["Nodes"]["1"]["Title"]
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
    card.append(textTitle)
    card.append(bottomImage);
    card.append(topName);
    return card
}



/* to be replaced with .json or .xml or whatever. I just need it to work*/
table.appendChild(createCard("Popular Workplace Comedy askhdklahs fjdaklfjlska","Devil is a part timer", "https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSDLgE7v9x-3dywjUbjUTu6W4dZi3DC0ypUzUGdXujh29uG8tSSKhUpHaRHdHMVNJKhcgsjsFZfSMjEMdx7XxdaWhxgi.jpg?r=072"))
table.appendChild(createCard("Popular Workplace Comedy","Devil is a part timer", "https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSDLgE7v9x-3dywjUbjUTu6W4dZi3DC0ypUzUGdXujh29uG8tSSKhUpHaRHdHMVNJKhcgsjsFZfSMjEMdx7XxdaWhxgi.jpg?r=072"))