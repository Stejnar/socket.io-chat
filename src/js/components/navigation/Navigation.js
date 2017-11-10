import * as React from "react";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.renderRightButtons = this.renderRightButtons.bind(this);
        this.renderBackButton = this.renderBackButton.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
    }

    navigateBack(event) {
        event.preventDefault();
        this.props.history.goBack();
    }

    renderBackButton() {
        const backIcon = './res/icons/arrow-left2.png';
        if (this.props.backButton) {
            return (
                <div className='back-button'>
                    <button onClick={this.navigateBack}>
                        <img className='icon' src={backIcon}/>
                    </button>
                </div>
            );
        }
    }

    renderRightButtons() {
        if (this.props.rightButtons) {
            const buttons = this.props.rightButtons.map((button, index) => {
                return (
                    <button key={index} onClick={(event) => {
                        button.listener(event, this.props.history);
                    }}>
                        {button.template}
                    </button>
                );
            });
            if (buttons) {
                return <div className='right-button'>{buttons}</div>;
            }
        }
    }

    render() {
        return (
            <div className='navigation-component'>
                {this.renderBackButton()}
                <div className='title'>
                    <h2>{this.props.title}</h2>
                </div>
                {this.renderRightButtons()}
            </div>
        );
    }
}