import React, {Component} from 'react';
import './Aside.scss';
import ChatList from '../../containers/ChatList/ChatList';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {addChat} from '../../actions/chatActions';

class Aside extends Component {
    static propTypes = {
        addChat: PropTypes.func.isRequired,
    };

    render() {
        const {addChat} = this.props;
        return (
            <aside className="aside">
                <ChatList url={this.props.url}/>
                <Button className="add-chat" variant="contained" color="primary" startIcon={<CloudUploadIcon/>}
                        onClick={addChat}>Добавить чат...</Button>
            </aside>
        );
    }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({addChat}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Aside);
