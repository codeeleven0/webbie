# webbie
webbie is a webos i built in html, css and js (wen eta wasm?). it has an elegant glassmorphic interface that is simple to use. it uses the winbox.js window manager for stable and elegant window orchestration.

# trying it out
go to the pages site thats in the right panel in my github repo or the demo link on my stardance!<br>
go to [https://codeeleven0.github.io/webbie](https://codeeleven0.github.io/webbie) to test it out!

# creating apps
creating apps for webbie is simple, create a folder with an uuid name in `apps/`, add its manifest to `apps/apps.js`. in apps, you can use webbie's components via `parent.*`/`parent.window` namespace. 

# thanks to
- stardance
- hack club
- svgrepo (tysm!)
- winbox.js
- xterm-pty (for v2, preparations started)
- xterm.js
- emscripten
- the reviewer who reviewed my first shipment! (i got lots of ideas thx)

# future plans for v2
for v2, i prepared a barebones app for emscripten and linux app containers.

# ai usage
generative llms were utilized to provide help mostly on css and wasm embedding preparation, so mostly qa.
no file is fully ai generated in this repo.

# usage notes!
the web browser needs the whole URL with the protocol *to load the website*, such as `https://hackclub.com` instead of `www.hackclub.com` otherwise, it will search it! i know silly but it's what it is.<br>
and since it's an iframe, some pages will refuse to load due to security policies. (i can't bypass it without a proxy). <br>
the apps take a while to load because they are spawning new instances (iframes) inside that single tab. <br>
the taskbar is used to minimize and restore application windows, the icon drops its opacity to 50% when the window is minimized and gets back to 100% opacity when restored.<br>

# and, thank you!
don't forget to leave a star! and if i made it to v2, please rate me on stardance!

# end of day?
i hope