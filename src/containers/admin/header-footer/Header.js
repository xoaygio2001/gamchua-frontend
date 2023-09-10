import React, { Component } from "react";

import './Header.scss'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: []
        }
    }

    async componentDidMount() {

    }

    render() {


        return (
            <div className="header-admin">
                <div className="navigate">
                    <div className="manage-user">Quản Lý Người Dùng</div>
                    <div className="manage-game">Quan Lý Game</div>
                </div>
                <div className="account">
                        <div className="hello">Xin Chào, Quản lý</div>
                        <div className="log-out">Đăng Xuất</div>
                </div>
            </div>
        )
    }
}

export default Header;