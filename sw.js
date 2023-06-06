const notesprefix = "https://noteslink.github.io/notes10/"

refreshWorker = async () => {
    fetch('/res.json').then((res) => {
        res.json().then((json) => {
            caches.open("2").then((cache) => {
                for (let m in json.ls) {
                    console.log(json.ls[m]);
                    cache.delete(json.ls[m]);
                    cache.add(json.ls[m]);
                }
                for (let i in json.gh) {
                    fetch(json.gh[i]).then((res) => {
                        cache.delete(json.gh[i]);
                        cache.add(json.gh[i]);
                        console.log(json.gh[i]);
                        res.json().then((k) => {
                            for (let j in k) {
                                console.log(k[j]);
                                cache.delete(`${notesprefix}${json[i].path}${k[j].path}`);
                                cache.add(`${notesprefix}${json[i].path}${k[j].path}`);
                            }
                        });
                    });
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    });
}

self.addEventListener("install", () => {
    refreshWorker();
    self.skipWaiting();
});

const cacheFetch = async (req) => {
    let path;
    if (new URL(req.url).host !== new URL(self.origin).host) {
        path = req.url;
    } else {
        path = new URL(req.url).pathname;
    }
    let check = await caches.match(path);
    console.log(path);
    if (check) {
        console.log("served " + req.url + " from cache");
        return await caches.match(path);
    } else {
        console.log("fetching " + req.url);
        return await fetch(req);
    }
};

self.addEventListener("fetch", (e) => {
    e.respondWith(cacheFetch(e.request));
});