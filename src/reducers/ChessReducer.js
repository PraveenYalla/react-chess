import { createSlice } from "@reduxjs/toolkit";

const chessSlice = createSlice({
    name: "chess",
    initialState: {
        welcomDiagOpen: true,
        restartModel: false,
        stockfishLevel: 2,
        gamePosition: {},
        game: {},
        engine: {},
        resignModal: false,
        userWon: false,
        darkMode: false
    },
    reducers: {
        setWelcomDiagOpen: (state, action) => {
            state.welcomDiagOpen = action.payload
        },
        setRestartModel: (state, action) => {
            state.restartModel = action.payload
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
        setEngineObj: (state, action) => {
            state.engine = action.payload
        },
        setResignModel: (state, action) => {
            state.resignModal = action.payload
        },
        setUserWon: (state, action) => {
            state.userWon = action.payload
        },
        setDarkMode: (state, action) => {
            if (action.payload) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            state.darkMode = action.payload
        }
    }
})

export const { setWelcomDiagOpen, setRestartModel, setStockfishLevel, setGamePosition, setGameObj, setResignModel, setDarkMode, setUserWon, setEngineObj } = chessSlice.actions;

export default chessSlice.reducer