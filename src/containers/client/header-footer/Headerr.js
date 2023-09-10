import React, { Component } from "react";

import { useState } from 'react';

import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import { NavLink } from "react-router-dom";

import { Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap';

import './Header.scss'

import { useParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import LoginModal from "./LoginModal";

import SignUpModal from "./SignUpModal";

import { Scrollbars } from 'react-custom-scrollbars';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            getAllTagGame: [],
            setShow: false,
            setShow2: false,
            search: '',
            gameByKeyword: [],
            allTagGame: [],
        }
    }

    async componentDidMount() {
        this.props.getAllTagGame()
    }

    handlePopupSiginSignup = (state) => {
        this.setState({
            setShow: state
        })
    }

    handlePopupSiginSignup2 = (state) => {
        this.setState({
            setShow2: state
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.gameByKeyword !== this.props.gameByKeyword) {
            this.setState({
                gameByKeyword: this.props.gameByKeyword
            })
        }

        if (prevProps.allTagGame !== this.props.allTagGame) {
            this.setState({
                allTagGame: this.props.allTagGame
            })
        }
    }

    handleGoHome = () => {
        this.props.history('/')
        this.setState({
            search: ''
        })
    }

    handleOnChangeSearch = async (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })

        await this.props.getGameByKeyWord(stateCopy.search)

    }

    handleDetailGame = (id) => {
        this.props.history(`/detail-game/${id}`)
    }



    render() {

        let { allTagGame, search, gameByKeyword } = this.state
        let { userLogin } = this.props


        return (
            <div class="header">
                <div class="top">
                    <div class="trash">
                        Napvip
                    </div>
                    <div class="search">
                        <div className="search-1">
                            <i class="fas fa-search"></i>
                            <input
                                value={search}
                                onChange={(e) => this.handleOnChangeSearch(e, 'search')}
                            />
                        </div>

                        <div className={search.length > 0 ? 'search-2 active' : 'search-2'}>

                            {gameByKeyword && gameByKeyword.length > 0 &&
                                gameByKeyword.map((item, index) => {
                                    return (
                                        <div onClick={() => this.handleDetailGame(item.id)} className="game-search">
                                            <div className="img" />
                                            <p>{item.name}</p>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>


                    <div class="account">
                        <div class="inform">
                            <i class="fas fa-bell"></i>
                        </div>
                        {userLogin && userLogin.username ?
                            <div className="isLogin">Hi, {userLogin.username}</div>
                            :
                            <>
                                <div onClick={() => this.handlePopupSiginSignup2(true)} class="sign-up">Đăng ký</div>
                                <div onClick={() => this.handlePopupSiginSignup(true)} class="sign-in">Đăng nhập</div>
                            </>

                        }


                    </div>

                    <SignUpModal
                        setShow={this.state.setShow2}
                        handlePopupSiginSignup={this.handlePopupSiginSignup2}
                    />

                    <LoginModal
                        setShow={this.state.setShow}
                        handlePopupSiginSignup={this.handlePopupSiginSignup}
                    />



                </div>
                <div class="bottom">
                    <div class="left">
                        <div onClick={() => this.handleGoHome()} class="logo"></div>
                        <div onClick={() => this.handleGoHome()} class="title">GAME CHÙA</div>

                    </div>
                    <div class="right">
                        <div class="game">
                            <div className="title">GAME</div>
                            <div className="sub-nav">
                                {allTagGame && allTagGame.length > 0 &&
                                    allTagGame.map((item, index) => {
                                        return (
                                            <div className="children">{item.value}</div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        <div class="game-viet-hoa">GAME Việt Hóa</div>
                        <div class="game-18">GAME 18+</div>
                        <div class="phan-mem">Phần Mềm</div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        allTagGame: state.allTagGame,
        userLogin: state.userLogin,
        gameByKeyword: state.gameByKeyword
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGameById: (id) => dispatch(Action.getGameByIdAction(id)),
        getAllTagGame: () => dispatch(Action.getAllTagGameAction()),
        getGameByKeyWord: (keyword) => dispatch(Action.getGameByKeyWordAction(keyword)),


    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(Header));