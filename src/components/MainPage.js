import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import SendIcon from 'material-ui/svg-icons/content/send';
import TextField from 'material-ui/TextField';
import Messages from './Messages';
import NetworkStatus from './NetworkStatus';
import { startLogout } from '../actions/auth';
import { addErrorMessage, startAddMessage } from '../actions/messages';

class MainPage extends React.Component {
    state = {
        author: undefined,
        createdAt: undefined,
        text: undefined
    };
    handleUserTyping = value => {
        this.setState(() => {
            return {
                text: value
            };
        });
    };
    handleAddMessage = e => {
        e.preventDefault();
        if (this.state.text) {
            if (this.props.network === 'online') {
                this.setState(() => {
                    return {
                        author: this.props.user,
                        createdAt: moment().valueOf()
                    };
                }, () => {
                    this.props.startAddMessage(this.state);
                    this.setState(() => {
                        return {
                            author: undefined,
                            createdAt: undefined,
                            text: undefined
                        };
                    });
                });
            } else if (this.props.network === 'offline') {
                this.setState(() => {
                    return {
                        author: this.props.user,
                        createdAt: moment().valueOf(),
                        offline: true
                    };
                }, () => {
                    this.props.addErrorMessage(this.state);
                    this.setState(() => {
                        return {
                            author: undefined,
                            createdAt: undefined,
                            text: undefined
                        };
                    });
                });
            }
        }
    };
    render() {
        return (
            <div>
                <AppBar
                    iconElementRight={<IconButton><LogoutIcon /></IconButton>}
                    onRightIconButtonTouchTap={this.props.startLogout}
                    showMenuIconButton={false}
                    style={{position: 'fixed'}}
                    title="Messages"
                />
                <Messages />
                <div style={{bottom: 0, backgroundColor: 'rgb(0, 188, 212)', display: 'flex', flexDirection: 'column', height: 72, justifyContent: 'center', left: '0', position: 'fixed', right: '0'}}>
                    <form onSubmit={this.handleAddMessage} style={{alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: '0 20px'}}>
                        <TextField
                            fullWidth={true}
                            hintStyle={{color: 'white'}}
                            hintText="Enter your message here"
                            id={'message-box'}
                            multiLine={true}
                            onChange={e => this.handleUserTyping(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' ? this.handleAddMessage(e) : undefined}
                            rows={1}
                            rowsMax={2}
                            textareaStyle={{color: 'white'}}
                            value={this.state.text ? this.state.text : ''}
                        />
                        <IconButton type="submit"><SendIcon color={'white'} /></IconButton>
                    </form>
                </div>
                <NetworkStatus />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    network: state.network,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    addErrorMessage: message => dispatch(addErrorMessage(message)),
    startLogout: () => dispatch(startLogout()),
    startAddMessage: message => dispatch(startAddMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);