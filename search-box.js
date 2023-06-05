function search(t) {
    console.log(t.toLowerCase());
    let l = Array.from(document.getElementById(listElemID).children);
    if (t == null) {
        t == "";
    }
    console.log(l);
    for (let i in l) {
        console.log(l[i].innerText.toLowerCase());
        if (String(l[i].innerText).toLowerCase().includes(t.toLowerCase())) {
            l[i].style.display = '';
        } else if (l[i].tagName == 'a') {
            l[i].style.display = '';
        } else {
            console.log('setting' + l[i].innerText + "to display:none")
            l[i].style.display = 'none';
        }
    }
}