# typscript-eapp-get-started

**Clone and start learning typescript in building Electron App**

This is a minimal Electron application in TypeScript to start coding in TypeScript using Node and Web api.

This minimal Electron application needs just these files to get started.  

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `\src\main.ts` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `\app\app.html` - A web page to render. This is the app's **renderer process**.
- `\src\index.ts` - the entry point of coding in the app's **renderer process**.

It is with development workflow with hot-rebuild of the rendering.js on Typescript source codes changes.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed on your computer. [yarn](https://yarnpkg.com/en/) is recommmended. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/typscript-eapp-get-started
# Go into the repository
cd typscript-get-started
# Install dependencies
yarn install
# build the main.js
yarn main
# Run the app in development mode with hot-reload upon changes of index.ts
yarn start
```


## License

[CC0 1.0 (Public Domain)](LICENSE.md)