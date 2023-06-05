fetchList = async () => {
    let list = document.getElementById(listElemID);
    let res = await fetch(notesURL);
    let json = await res.json();
    for (let i in json) {
        console.log(json[i]);
        let link = document.createElement('a');
        let div = document.createElement('div');
        let img = document.createElement('img')
        link.setAttribute('href', `https://github.com/NotesLink/c10/raw/main/${json[i].path}`);
        div.innerHTML = json[i].name;
        img.setAttribute('src', '/file-icon.png');
        link.appendChild(img);
        link.appendChild(div);
        list.appendChild(link);
    }
}