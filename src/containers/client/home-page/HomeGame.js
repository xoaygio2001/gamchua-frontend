import React, { Component } from "react";

import './HomeGame.scss';

import { getAllGame } from '../../../services/userService'

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import { NavLink } from "react-router-dom";



class HomeGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            newGame: [],
            hotGame: [],
            navGameActive: 'NEW',
            topGame18: []
        }
    }

    async componentDidMount() {
        this.props.getTopGame(10, 'NEW')
        this.props.getAllTopGame18(10)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.newGame !== this.props.newGame) {
            this.setState({
                newGame: this.props.newGame
            })
        }
        if (prevProps.hotGame !== this.props.hotGame) {
            this.setState({
                hotGame: this.props.hotGame
            })
        }
        if (prevProps.hotGame !== this.props.hotGame) {
            this.setState({
                topGame18: this.props.topGame18
            })
        }

    }

    handleChangeNav = (type) => {
        if (type) {
            this.setState({
                navGameActive: type
            })
            this.props.getTopGame(5, type)
        }
    }


    handleFindGame = (id) => {

    }

    render() {
        let { newGame, hotGame, navGameActive, topGame18 } = this.state
        let data = [];

        switch (navGameActive) {
            case 'NEW':
                data = newGame
                break;
            case 'HOT':
                data = hotGame
                break;
            case '18':
                data = topGame18
                break;

            default:
                break;
        }

        return (
            <div className="home-game">
                <div className="nav">
                    <div
                        onClick={() => this.handleChangeNav('NEW')}
                        className={`new-game ${navGameActive == 'NEW' ? 'active' : ''}`}>
                        GAME MỚI
                    </div>
                    <div
                        onClick={() => this.handleChangeNav('HOT')}
                        className={`hot-game ${navGameActive == 'HOT' ? 'active' : ''}`}>
                        GAME HOT
                    </div>
                    <div
                        onClick={() => this.handleChangeNav('18')}
                        className={`game-18 ${navGameActive == '18' ? 'active' : ''}`}>
                        GAME 18+
                    </div>
                </div>

                <div className="games">

                    {data && data.length > 0 &&
                        data.map((item, index) => {
                            return (
                                <div key={index} className="game">
                                    <div className="img"
                                        style={{ backgroundImage: `url(${item.img})` }}
                                    />
                                    <div className="name">{item.name}</div>

                                    <div className="tag">
                                        <i className="fas fa-tags"></i>
                                        <p>
                                            {item.TagGames && item.TagGames.length > 0 &&
                                                item.TagGames.map((itemTag, indexMap) => {
                                                    return (
                                                        `${itemTag.AllCode.value},   `

                                                    )
                                                }
                                                )
                                            }
                                        </p>
                                    </div>
                                    <div className="see">
                                        <NavLink className="download" to={`/detail-game/${item.id}`}>
                                            TẢI GAME
                                        </NavLink>;
                                    </div>
                                </div>
                            )
                        })

                    }

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newGame: state.newGame,
        hotGame: state.hotGame,
        game18: state.game18,
        topGame18: state.topGame18
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTopGame: (limit, type) => dispatch(Action.getTopGameAction(limit, type)),
        getAllTopGame18: (limit) => dispatch(Action.getAllTopGame18Action(limit)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeGame);