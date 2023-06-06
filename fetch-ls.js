fetchList = async () => {
    let list = document.getElementById(listElemID);
    let res = await fetch(notesURL);
    let json = await res.json();
    for (let i in json) {
        console.log(json[i]);
        let link = document.createElement('a');
        let div = document.createElement('div');
        let img = document.createElement('img')
        link.setAttribute('href', `javascript:dl("https://noteslink.github.io/c10/${json[i].path}")`);
        div.innerHTML = json[i].name;
        img.setAttribute('src', '/file-icon.png');
        link.appendChild(img);
        link.appendChild(div);
        list.appendChild(link);
    }
}

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/sw.js", {
                scope: "/",
            });
            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active");
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};
registerServiceWorker();

function addManifest() {
    let l = document.createElement('link');
    l.setAttribute("rel", "manifest");
    l.setAttribute("href", "/.webmanifest");
    document.head.appendChild(l);
}

dl = (url) => {
    fetch(url).then(res => res.blob()).then(blob => {
        var f = window.URL.createObjectURL(blob);
        window.location.assign(f);
    });
}

load = () => { fetchList(); addManifest(); }