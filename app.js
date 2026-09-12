const desktopClock = document.querySelector("#taskbar > #taskbar-view > #clock");
const desktop = document.querySelector("#desktop-ui > #deskview");
const tasks = document.querySelector("#desktop-ui > #taskbar > #taskbar-view > #tasks");

var instances = {};

setInterval(() => {
    let date = new Date();
    desktopClock.innerText = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}, 1000);

function newWindow(wn, url, uuid) {
    return new WinBox(wn, {
        class: ["no-full", `instance-${uuid}`],
        root: desktop,
        bottom: 48,
        url: url,
        hidden: true
    });
}
function openApp(app) {
    let instanceUUID = crypto.randomUUID().toString();

    let tbent = document.createElement("div");
    tbent.classList.add("task-entry");
    tbent.classList.add(`instance-${instanceUUID}`);
    let app_logo = document.createElement("div");
    app_logo.classList.add("app-logo");
    let app_img = document.createElement("img");
    app_img.src = `apps/${app.uuid}/${app.icon}`;
    app_logo.appendChild(app_img);
    tbent.appendChild(app_logo);

    let win = undefined;
    if (app.url == undefined) {
        win = newWindow(app.name, `apps/${app.uuid}/index.html?uuid=${instanceUUID}`, instanceUUID);
    } else {
        win = newWindow(app.name, app.url, instanceUUID);
    }
    if (app.size != undefined) {
        win.resize(app.size[0], app.size[1]);
    }
    win.icon = app_img.src;
    win.onminimize = () => {
        win.hidden = true;
        win.addClass("hide");
        tbent.style.opacity = "50%";
    };
    tbent.addEventListener("click", () => {
        if (win.hidden) {
            win.restore();
            win.hidden = false;
            win.removeClass("hide");
            tbent.style.opacity = "100%";
        } else {
            win.minimize();
        }
    });

    win.removeClass("hide");
    win.hidden = false;
    win.onclose = (e) => {
        tbent.remove();
    };
    tasks.appendChild(tbent);
    instances[instanceUUID] = win;
    return instanceUUID;
}
function newDesktopEntry(app) {
    let desktop_entry = document.createElement("div");
    desktop_entry.classList.add("desktop-entry");
    let app_logo = document.createElement("div");
    app_logo.classList.add("app-logo");
    let app_name = document.createElement("div");
    app_name.classList.add("app-name");
    let app_img = document.createElement("img");
    app_logo.appendChild(app_img);
    desktop_entry.appendChild(app_logo);
    desktop_entry.appendChild(app_name);
    app_name.innerText = app.name;
    app_img.src = `apps/${app.uuid}/${app.icon}`;
    desktop_entry.addEventListener("click", () => {
        openApp(app);
    });
    desktop.querySelector("#desk-elements").appendChild(desktop_entry);
}

function openDeskCal() {
    let uuid = openApp({
        uuid: "08218d4e-3815-4326-bd3f-75b960432ec5",
        icon: "calendar-week-svgrepo-com.svg",
        name: "Calendar"
    });
    instances[uuid].resize(500, 500);
    instances[uuid].move("bottom", "bottom");
}

Object.keys(apps).forEach(key => {
    newDesktopEntry(apps[key]);
});

window.addEventListener("resize", () => {
    Object.keys(instances).forEach(key => {
        let win = instances[key];

        let x = win.x;
        let y = win.y;

        let maxX = desktop.clientWidth - win.width;
        let maxY = desktop.clientHeight - win.height;

        if (x > maxX) x = Math.max(0, maxX);
        if (y > maxY) y = Math.max(0, maxY);

        win.move(x, y);
    });
});

function picsum() {
    let url = `https://picsum.photos/${window.outerWidth}/${window.outerHeight}?salt=${Math.ceil(Math.random() * 1024)}`;
    let promise = new Promise((resolve, reject) => {
        desktop.classList.remove("focus");
        const img = new Image();
        img.src = url;
        img.onload = () => {
            desktop.classList.add("focus");
            document.body.style.backgroundImage = `url(${img.currentSrc || img.src})`;
            resolve(img);
        };
        img.onerror = (err) => { reject(err); };
    });
    return promise;
}
picsum();