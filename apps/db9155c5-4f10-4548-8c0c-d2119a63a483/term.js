var xterm = new Terminal();
xterm.open(document.getElementById('terminal'));
const { master, slave } = openpty();
const fitAddon = new window.FitAddon.FitAddon();
xterm.loadAddon(fitAddon);
xterm.loadAddon(master);
Module = {
    pty: slave,
    isSyncing: false,
    preRun: [function() {
        FS.mkdir('/wasm');
        FS.mount(IDBFS, {}, '/wasm');
        Module.addRunDependency('syncfs');
        FS.syncfs(true, function (err) {
          if (err) {
            console.error("fs_load: fail", err);
          } else {
            console.log("fs_load: success");
          }
          Module.removeRunDependency('syncfs');
        });
        setInterval(function() {
            if (Module.isSyncing) return;
            Module.isSyncing = true;
            FS.syncfs(false, function(err) {
                Module.isSyncing = false;
                if (err) console.error("auto_sync: fail", err);
            });
        }, 300);
    }]
};
window.addEventListener('resize', () => {
    fitAddon.fit();
});
window.addEventListener('beforeunload', function() {
    if (Module.FS) {
        Module.FS.syncfs(false, function() {});
    }
});
setInterval(() => {
    fitAddon.fit();
}, 50);