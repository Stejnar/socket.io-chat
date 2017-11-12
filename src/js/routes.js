import * as React from "react";

import SelectAvatar from "./components/avatars/SelectAvatar";
import Login from "./components/login/Login";
import Users from "./components/users/Users";
import Chat from "./components/chat/Chat";

export const Routes = [
    {
        path: '/',
        exact: true,
        sidebar: () => <SelectAvatar/>,
        main: () => <Login/>
    },
    {
        exact: true,
        path: '/chat',
        sidebar: () => <Users/>,
        main: () => <Chat/>
    },
    {
        exact: true,
        path: '/users',
        main: () => <Users/>
    },
    {
        exact: true,
        path: '/avatars',
        main: () => <SelectAvatar/>
    },
];