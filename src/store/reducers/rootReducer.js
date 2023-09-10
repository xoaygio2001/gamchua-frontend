import { getAllCodeAction } from '../actions/userAction';

const initState = {
    category: [],
    os: [],
    playWith: [],
    language: [],
    games: [],
    detailGame: [],
    game: {},
    outStandingGame: [],
    newGame: [],
    hotGame: [],
    game18: [],
    allTagGame: [],
    topGame18: [],
    gameByKeyword: [],
    userLogin: JSON.parse(localStorage.getItem('userLogin'))

}


const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CATEGORY':
            state.category = action.data;
            return {
                ...state,
            }
            break;

        case 'OS':
            state.os = action.data;
            return {
                ...state,
            }
            break;

        case 'PLAYWITH':
            state.playWith = action.data;
            return {
                ...state,
            }
            break;

        case 'LANGUAGE':
            state.language = action.data;
            return {
                ...state,
            }
            break;

        case 'ALLGAME':
            state.games = action.data;
            return {
                ...state,
            }
            break;

        case 'GAME':
            state.game = action.data;
            return {
                ...state,
            }
            break;

        case 'ALLTAGGAME':
            state.allTagGame = action.data;
            return {
                ...state,
            }
            break;

        case 'TOPGAME18':
            state.topGame18 = action.data;
            return {
                ...state,
            }
            break;

        case 'LOGIN-SYSTEM':
            localStorage.setItem('userLogin', JSON.stringify(action.data));
            return {
                ...state
            }
            break;

        case 'GAME-BY-KEYWORD':
            state.gameByKeyword = action.data;
            return {
                ...state,
            }
            break;

            


        case 'TOPGAME':

            switch (action.typeTop) {
                case 'HOT':
                    state.hotGame = action.data;
                    break;
                case 'NEW':
                    state.newGame = action.data;
                    break;
                case '18':
                    state.game18 = action.data;
                    break;
                case 'OUTSTANDING':
                    state.outStandingGame = action.data;
                    break;
            }
            return {
                ...state,
            }
            break;

        default:
            return state
            break;
    }
}


export default rootReducer;