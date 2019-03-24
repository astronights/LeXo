# CreateReactRouterPWA

This is a boilerplate for starting a React PWA with Router! Uses Eslint too!
I made it from scratch and if there's any useful Babel features missing, do let me know!
I did not use CRA (Create React App) due to it's intricate way of editing service workers which are necessary for PWAs.
I've used Workbox for the PWA functionality like adding to homescreen, precaching, and caching.

Feel free to start off by replacing the manifest.json details, deleting the components, and editing AppRouter.js & App.js!


### Dev Server command: npm start PORT
> npm start 4000

### Production Build command: npm run build
> npm run build

### Publish to Github pages: gh-pages -d build
Make sure package.json has "homepage" filled in :)
