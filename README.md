# Hue - CS:GO Reload

# Run App
* For usage, you need download the gamestate_integration_c4_hue.cfg file and copy into CS:GO Folder

Example:

`C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg`

And you only need to execute the exe file, for this iteration this work only in Windows.

# Install and Usage for developers

* You need to install dependencies with the command:
```bash
npm install
```

* Copy gamestate_integration_c4_hue.cfg to your CS:GO cfg directory.

```text
OS X: /Users/<username>/Library/Application Support/Steam/SteamApps/common/Counter-Strike Global Offensive/csgo/cfg
```

```text
Windows: C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg
```

* Later you need run the code, i prefer:
```bash
npm run start
```

When you launch the app, it will search for your bridge on the network and will prompt you to press the Hue Bridge button to start.


When you do this you can select the lights on which you want the effect to be applied.

* Final step:
```text
ENJOY :D
```

## make an exe file

You only need run
```bash
npm run make
```
And in the exe file generated in `out` folder 
