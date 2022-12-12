# Build a simple message board front-end

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Packages
- [ant-design/ant-design](https://github.com/ant-design/ant-design)
- [remix-run/react-router](https://github.com/remix-run/react-router)
- [react-component/virtual-list](https://github.com/react-component/virtual-list)
- [axios/axios](https://github.com/axios/axios)
- [iamkun/dayjs](https://github.com/iamkun/dayjs)
- [laravel/echo](https://github.com/laravel/echo)
- [package/pusher-js](https://github.com/pusher/pusher-js)

---
## Setup
### Config
- generate local env file
    ```=bash
    cp .env.example .env
    ```
- configuration env variable
    ```=env
    # pusher
    REACT_APP_PUSHER_BROADCASTER=
    REACT_APP_PUSHER_KEY=
    REACT_APP_PUSHER_CLUSTER=
    ```
---

## Scripts
### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.

---
## docker image
### `docker-compose up -d`
Builds static resources in nginx container.
Open [http://localhost:3000](http://localhost:3000)