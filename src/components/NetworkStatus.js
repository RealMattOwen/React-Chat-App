import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

class NetworkStatus extends React.Component {
    state = {
        message: '',
        open: false
    };
    componentWillReceiveProps(nextProps) {
        if ('network' in nextProps) {
            if (nextProps.network === 'online') {
                this.setState({
                    message: 'You have reconnected.',
                    open: true
                }, );
            } else {
                this.setState({
                    message: 'You have disconnected.',
                    open: true
                });
            }
        }
    }
    handleActionTouchTap = () => {
        this.setState({
            open: false,
        });
    };
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    render() {
        return (
            <Snackbar
                action="Ok"
                className="snackbar"
                message={this.state.message}
                onActionTouchTap={this.handleActionTouchTap}
                onRequestClose={this.handleRequestClose}
                open={this.state.open}
            />
        );
    }
}

const mapStateToProps = state => ({
    network: state.network
});

export default connect(mapStateToProps, undefined)(NetworkStatus);