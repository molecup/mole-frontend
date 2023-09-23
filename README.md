# Mole Fronted
Repository for a create-react-app static wep app frontend

## Project creation and deployment
The ReactJS project has been created with create-react-app using progressive app template (see: https://create-react-app.dev/docs/making-a-progressive-web-app).
```
npx create-react-app mole-frontend --template cra-template-pwa
```

Please refer to https://create-react-app.dev/docs/documentation-intro for extensive create-react-app documentation, testing and deployment instructions.

## Modules
The project uses some additional modules. Please refer to the official documentations for usage examples, help, and troubleshooting

* [Material UI](https://mui.com/material-ui/getting-started/) - Used with Emotion for graphics, layout and style
* [React Router](https://reactrouter.com/en/main/start/overview) - Used for client-side routing

## Project structure
The project structure is automatically created and managed by npn. Static resources (such as static images, icons, etc..) are contained in */public*. The React source code is contained in */src*. The root component is *App.js*, while other components and assets are organized as follow:

### Components folder
Contains all the components created in this project. Each component corresponds to a basic element and is then imported in other components or pages.

### Pages folder
Contains all the app's pages. Each page ideally corresponds to a different URL path and is managed by react router from *App.js*. This is where components are used.
