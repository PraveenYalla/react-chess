const stockfish = new Worker("./stockfish.js");
class Engine {
    constructor() {
        this.stockfish = stockfish;
        this.onMessage = (callback) => {
            this.stockfish.addEventListener("message", (e) => {
                const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];

                callback({ bestMove });
            });
        };
    }

    evaluatePosition(fen, depth) {
        this.stockfish.postMessage(`position fen ${fen}`);
        this.stockfish.postMessage(`go depth ${depth}`);
    }
    stop() {
        this.stockfish.postMessage("stop");
    }
    quit() {
        this.stockfish.postMessage("quit");
    }
}

export default Engine;