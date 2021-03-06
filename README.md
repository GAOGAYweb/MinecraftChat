MinecraftChat
-------

Web based Minecraft chat client for 1.8 servers.

![MinecraftChat Screenshot](http://puu.sh/hwR1L/9e88547904.png)

###Description
This is a very lightweight application... ~500kb without modules. It is built on Node and utilizes tools such as [mineflayer](https://github.com/andrewrk/mineflayer), [node-minecraft-protocol](https://github.com/PrismarineJS/node-minecraft-protocol#windows) and [socket.io](http://socket.io/). The whole purpose is that you can chat on Minecraft servers from your browser. This makes it easier to just jump in, say a few things, and leave without having to wait for your game to load.

###Installing on your own server
```
npm install && grunt build
npm start
```

This will start the application on port `3000` or the one specified by the `PORT`environment variable.
