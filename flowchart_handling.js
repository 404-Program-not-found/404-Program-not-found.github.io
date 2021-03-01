console.log("Cards is being generated...");
const table = document.getElementById('recommends');

console.log(table);

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

var jsonFile;
fetch("flowchart_short.json")
    .then(res => res.json())
    .then(data => jsonFile = JSON.parse(data));
document.getElementById("mainTitle").textContent = data[Nodes]["1"]["Title"]
/* to be replaced with .json or .xml or whatever. I just need it to work*/
table.appendChild(createCard("Popular Workplace Comedy askhdklahs fjdaklfjlska","Devil is a part timer", "https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSDLgE7v9x-3dywjUbjUTu6W4dZi3DC0ypUzUGdXujh29uG8tSSKhUpHaRHdHMVNJKhcgsjsFZfSMjEMdx7XxdaWhxgi.jpg?r=072"))
table.appendChild(createCard("Popular Workplace Comedy","Devil is a part timer", "https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSDLgE7v9x-3dywjUbjUTu6W4dZi3DC0ypUzUGdXujh29uG8tSSKhUpHaRHdHMVNJKhcgsjsFZfSMjEMdx7XxdaWhxgi.jpg?r=072"))