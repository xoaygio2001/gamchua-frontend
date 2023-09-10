import React, { Component } from "react";

import './ManageGame.scss'

import Header from "../header-footer/Header";
import OutStandingGame from "../../client/home-page/OutStandingGame"
import HomeGame from "../../client/home-page/HomeGame"

import { Button, Form } from 'react-bootstrap';

import { getAllCode, createNewGame } from '../../../services/userService';

import CommonUtils from "../../../utils/CommonUtils";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import { connect } from "react-redux";

import * as Action from '../../../store/actions';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class MangeGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            arrCategory: [],
            arrLanguage: [],
            arrPlayWith: [],
            arrOS: [],

            selectCategory: [],
            selectLanguage: 'null',
            selectPlayWith: 'null',
            selectOS: 'null',

            name: '',
            img: '',
            contentMarkdown: '',
            contentHTML: '',
            capacity: '',
            partNumber: '',
            playerNumber: '',
            ram: '',
            seri: '',
            url: ''

        }
    }


    async componentDidMount() {
        this.props.getAllCodeRedux('CATEGORY')
        this.props.getAllCodeRedux('LANGUAGE')
        this.props.getAllCodeRedux('OS')
        this.props.getAllCodeRedux('PLAYWITH')

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.Category !== this.props.Category) {
            this.setState({
                arrCategory: this.props.Category
            })
        }
        if (prevProps.Language !== this.props.Language) {
            this.setState({
                arrLanguage: this.props.Language
            })
        }
        if (prevProps.OS !== this.props.OS) {
            this.setState({
                arrOS: this.props.OS
            })
        }
        if (prevProps.PlayWith !== this.props.PlayWith) {
            this.setState({
                arrPlayWith: this.props.PlayWith
            })
        }

    }


    handleChangeSelectGameInfor = (target, type) => {
        switch (type) {

            case 'LANGUAGE':
                this.setState({
                    selectLanguage: target.value
                })
                break;

            case 'OS':
                this.setState({
                    selectOS: target.value
                })
                break;

            case 'PLAYWITH':
                this.setState({
                    selectPlayWith: target.value
                })
                break;

            case 'CATEGORY':
                if (target.checked) {
                    let data = this.state.selectCategory.filter(item => {
                        return item == target.value
                    })
                    if (data.length == 0) {
                        let fakeData = this.state.selectCategory
                        fakeData.push(target.value)
                        this.setState({
                            selectCategory: fakeData
                        })
                    }
                } else {
                    let data = this.state.selectCategory.filter(item => {
                        return item != target.value
                    })
                    this.setState({
                        selectCategory: data
                    })
                }
                break;

        }
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;

        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                img: base64
            })
        }
    }

    handleSaveGame = async () => {
        let {
            name, img, contentMarkdown, contentHTML, capacity,
            partNumber, playerNumber, ram, seri, selectCategory,
            selectLanguage, selectPlayWith, selectOS, url
        } = this.state

        if (
            !name || !img || !url || !contentMarkdown || !contentHTML || !capacity ||
            !partNumber || !playerNumber || !ram || !seri || !selectCategory ||
            !selectLanguage || !selectPlayWith || !selectOS
        ) {
            console.log('thieu parameter')
        } else {
            await createNewGame({
                name: name,
                img: img,
                url: url,
                contentMarkdown: contentMarkdown,
                contentHTML: contentHTML,
                capacity: capacity,
                partNumber: partNumber,
                playerNumber: playerNumber,
                ram: ram,
                seri: seri,
                tags: selectCategory,
                language: selectLanguage,
                playWith: selectPlayWith,
                win: selectOS
            })

        }
    }


    handEditor = (e) => {
        this.setState({
            contentHTML: e.html,
            contentMarkdown: e.text
        })
    }





    render() {
        let { arrCategory, arrLanguage, arrPlayWith, arrOS } = this.state
        return (
            <div className="container">
                <div className="content-container">
                    <Header />
                    <div className="body">
                        <div className="title">Quản lý Game</div>
                        <div className="content">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Tên Game</Form.Label>
                                    <Form.Control
                                        onChange={(event) => this.handleOnChangeText(event, 'name')}
                                        value={this.state.name}
                                        type="text" placeholder="Nhập Tên Game" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Hình Đại Diện Cho Game</Form.Label>
                                    <Form.Control type="file"
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">{"Đường Dẫn Cho Game (URL)"}</Form.Label>
                                    <Form.Control
                                        onChange={(event) => this.handleOnChangeText(event, 'url')}
                                        value={this.state.url}
                                        type="text" placeholder="Nhập Đường Dẫn URL" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Dung Lượng Game (GB)</Form.Label>
                                    <Form.Control
                                        onChange={(event) => this.handleOnChangeText(event, 'capacity')}
                                        value={this.state.capacity}
                                        type="text" placeholder="Nhập Dung Lượng Game" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Số Lượng Part</Form.Label>
                                    <Form.Control
                                        onChange={(event) => this.handleOnChangeText(event, 'partNumber')}
                                        value={this.state.partNumber}
                                        type="text" placeholder="Nhập Số Lượng Part" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Ram Yêu Cầu</Form.Label>
                                    <Form.Control
                                        onChange={(event) => this.handleOnChangeText(event, 'ram')}
                                        value={this.state.ram}
                                        type="text" placeholder="Nhập Ram Yêu Cầu" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Số Lượng Người Chơi</Form.Label>
                                    <Form.Control
                                        onChange={(event) => this.handleOnChangeText(event, 'playerNumber')}
                                        value={this.state.playerNumber}
                                        type="text" placeholder="Nhập Số Lượng Người Chơi" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Tên Seri</Form.Label>
                                    <Form.Control
                                        onChange={(event) => this.handleOnChangeText(event, 'seri')}
                                        value={this.state.seri}
                                        type="text" placeholder="Nhập Tên Seri" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Ngôn Ngữ</Form.Label>
                                    <Form.Select
                                        onChange={(e) => this.handleChangeSelectGameInfor(e.target, 'LANGUAGE')}
                                        aria-label="Default select example">
                                        <option value={'null'} >Open this select menu</option>
                                        {arrLanguage && arrLanguage.length > 0 &&
                                            arrLanguage.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{item.value}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Hệ Điều Hành</Form.Label>
                                    <Form.Select
                                        onChange={(e) => this.handleChangeSelectGameInfor(e.target, 'OS')}
                                        aria-label="Default select example">
                                        <option>Open this select menu</option>
                                        {arrOS && arrOS.length > 0 &&
                                            arrOS.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{item.value}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Chơi Bằng</Form.Label>
                                    <Form.Select
                                        onChange={(e) => this.handleChangeSelectGameInfor(e.target, 'PLAYWITH')}
                                        aria-label="Default select example">
                                        <option>Open this select menu</option>
                                        {arrPlayWith && arrPlayWith.length > 0 &&
                                            arrPlayWith.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{item.value}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Thể Loại</Form.Label>
                                    <div>
                                        {arrCategory && arrCategory.length > 0 &&
                                            arrCategory.map((item, index) => {
                                                return (
                                                    <Form.Check
                                                        onChange={(e) => this.handleChangeSelectGameInfor(e.target, 'CATEGORY')}
                                                        className="label"
                                                        inline
                                                        key={index}
                                                        label={item.value}
                                                        value={item.keyMap}
                                                    />
                                                )
                                            })
                                        }
                                    </div>

                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Phần Giới Thiệu</Form.Label>
                                    {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} /> */}
                                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={(e) => this.handEditor(e)} />
                                </Form.Group>





                                <Button
                                    onClick={() => this.handleSaveGame()}
                                    variant="primary">
                                    Lưu
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <div className="footer">
                    </div>
                </div>

            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Category: state.category,
        Language: state.language,
        OS: state.os,
        PlayWith: state.playWith
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // deleteRedux: (user) => dispatch({type: 'HAHA', payload: user}),
        getAllCodeRedux: (type) => dispatch(Action.getAllCodeAction(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MangeGame);