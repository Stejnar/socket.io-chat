import * as React from "react";
import SCREEN from "../../constants";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

@connect((store) => {
    return {
        window: store.window,
    }
})
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.renderRightButtons = this.renderRightButtons.bind(this);
        this.renderBackButton = this.renderBackButton.bind(this);
    }

    renderBackButton() {
        const backIcon = './res/icons/arrow-left2.png';
        if (this.props.backButton) {
            return withRouter(({history}) => (
                <div className='back-button'>
                    <button onClick={() => { history.goBack(); }}>
                        <img className='icon' src={backIcon}/>
                    </button>
                </div>
            ));
        }
        return () => { return <div className='placeholder'/>; };
    }

    renderRightButtons() {
        if (this.props.rightButtons) {
            const buttons = this.props.rightButtons.map((button, index) => {
                const Button = withRouter(({history}) => (
                    <button onClick={(event) => { button.listener(event, history); }}>
                        {button.template}
                    </button>
                ));
                return <Button key={index}/>
            });
            if (buttons) {
                return () => <div className='right-button'>{buttons}</div>;
            }
        }
        return () => { return <div className='placeholder'/>; };
    }

    render() {
        if (this.props.window.width < SCREEN.MEDIUM.MIN) {
            const BackButton = this.renderBackButton();
            const RightButtons = this.renderRightButtons();
            return (
                <div className='navigation-component'>
                    <BackButton/>
                    <div className='title'>
                        <h2>{this.props.title}</h2>
                    </div>
                    <RightButtons/>
                </div>
            );
        }
        return null;
    }
}