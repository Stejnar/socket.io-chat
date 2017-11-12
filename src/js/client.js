import * as React from "react";
import ReactDOM from 'react-dom';

import {Provider} from "react-redux";
import {store} from "./store";
import Layout from "./components/layout/Layout";


class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Layout/>
            </Provider>
        );
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));