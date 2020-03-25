import React, {Component} from 'react';
import './Aside.scss';
import ChatList from '../../containers/ChatList/ChatList';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {updateDataAddChat} from '../../actions/chatActions';

class Aside extends Component {
    static propTypes = {
        updateDataAddChat: PropTypes.func.isRequired,
    };

    render() {
        const {updateDataAddChat} = this.props;
        return (
            <aside className="aside">
                <ChatList url={this.props.url}/>
                <Button className="add-chat" variant="contained" color="primary" startIcon={<CloudUploadIcon/>}
                        onClick={updateDataAddChat}>Добавить чат...</Button>
            </aside>
        );
    }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({updateDataAddChat}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Aside);
