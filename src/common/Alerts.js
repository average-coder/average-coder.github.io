import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export class Alerts extends Component {

    static propTypes ={
        error: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps){
        const { error, alert, messages } = this.props;
        if(error !== prevProps.error){
        if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
        if (error.msg.username) alert.error("USERNAME: "+error.msg.username.join());
        if (error.msg.password) alert.error("PASSWORD: "+error.msg.password.join());
        if (error.msg.email) alert.error("EMAIL: "+error.msg.email.join());
        if (error.msg.title) alert.error("TITLE: "+error.msg.title.join());
        if (error.msg.name) alert.error("NAME: "+error.msg.name.join());
        if (error.msg.data) alert.error("DATA: "+error.msg.data.join());
        if (error.msg.captcha) alert.error("PLEASE COMPLETE THE CAPTCHA");
        if (error.msg.mismatch) alert.error(error.msg.mismatch);
        if (error.msg && error.status === 10401) alert.error(error.msg);
        }

        if(messages !== prevProps.messages){
        alert.success(messages.msg);
        }
    }

    render() {
        return (
            <Fragment/>
        )
    }
}

const mapStateToProps = (state) =>({
    error: state.errors,
    messages: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));