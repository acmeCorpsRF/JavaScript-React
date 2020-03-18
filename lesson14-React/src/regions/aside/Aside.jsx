import React, {Component} from 'react';
import './Aside.scss';
import ChatList from '../../components/ChatList/ChatList';

export class Aside extends Component {
    render() {
        return (
            <aside className="aside">
                <ChatList/>
            </aside>
        );
    }
}