import React, {Component} from 'react';
import './style.scss';
import PropTypes from 'prop-types';

export class Message extends Component {

    static propTypes = {
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    };

    render() {
        if (this.props.author == 'robot') {
            return <li className={'message robot'}>{this.props.text}</li>
        } else {
            return <li className={'message user'}>{this.props.author + ': ' + this.props.text}</li>
        }
    }

}