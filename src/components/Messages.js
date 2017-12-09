import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

class Messages extends React.Component {
    componentDidUpdate() {
        const messagesContainer = document.getElementsByClassName('messages')[0];
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    render() {
        return (
            <List className="messages" style={{height: 'calc(100% - 122px)', margin: '64px 0 0', overflow: 'scroll', padding: 0, position: 'absolute', width: '100%'}}>
                {this.props.messages.length !== 0 ? this.props.messages.map(({id = moment().valueOf(), author, createdAt, text, offline}) => (
                    <div key={id}>
                        <ListItem
                            disabled={true}
                            innerDivStyle={{display: 'flex', flexDirection: 'column', padding: '10px 24px 0 64px'}}
                            leftAvatar={<Avatar size={30} src={author.photoURL} style={{top: 10}} />}
                            style={offline ? {color: 'red'} : undefined}
                        >
                            <span style={{display: 'flex', justifyContent: 'space-between'}}><b style={{maxWidth: '56%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', wordWrap: 'break-word'}}>{author.displayName}</b><span>{moment(createdAt).format('MMM D HH:mm')}</span></span>
                            <p>{text}</p>
                        </ListItem>
                    </div>
                )) : (
                    <div>
                        <ListItem disabled={true}>No messages</ListItem>
                    </div>
                )}
            </List>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
});

export default connect(mapStateToProps, undefined)(Messages);