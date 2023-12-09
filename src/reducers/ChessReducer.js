import { createSlice } from "@reduxjs/toolkit";

const chessSlice = createSlice({
    name: "chess",
    initialState: {
        welcomDiagOpen: true,
        restartModel: false,
        startGame: false,
        stockfishLevel: 2,
        gamePosition: {},
        game: {},
        resignModal: false
    },
    reducers: {
        setWelcomDiagOpen: (state, action) => {
            state.welcomDiagOpen = action.payload
        },
        setRestartModel: (state, action) => {
            state.restartModel = action.payload
        },
        setStartGame: (state, action) => {
            state.startGame = action.payload
        },
        setStockfishLevel: (state, action) => {
            state.stockfishLevel = action.payload
        },
        setGamePosition: (state, action) => {
            state.gamePosition = action.payload
        },
        setGameObj: (state, action) => {
            state.game = action.payload
        },
        setResignModel: (state, action) => {
            state.resignModal = action.payload
        }
    }
})

export const { setWelcomDiagOpen, setRestartModel, setStartGame, setStockfishLevel, setGamePosition, setGameObj, setResignModel } = chessSlice.actions;

export default chessSlice.reducer