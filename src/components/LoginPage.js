import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startAnonLogin } from '../actions/auth';

export const LoginPage = ({ startAnonLogin, startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">React Chat App</h1>
            <button className="button" onClick={startAnonLogin} style={{marginBottom: 10}}>Login anonymously</button>
            <button className="button" onClick={startLogin}>Login with Google</button>
        </div>
    </div>
);

const mapDispatchToProps = dispatch => ({
    startAnonLogin: () => dispatch(startAnonLogin()),
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);