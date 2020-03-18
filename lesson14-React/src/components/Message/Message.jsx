import React, {Component} from 'react';
import './Message.scss';
import PropTypes from 'prop-types';

export class Message extends Component {

    static propTypes = {
        message: PropTypes.object.isRequired
    };

    render() {
        return <li className={'message '+ Object.keys(this.props.message)}>
            {Object.values(this.props.message)}
        </li>
    }

}