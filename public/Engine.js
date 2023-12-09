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
        // Init engine
        this.stockfish.postMessage("uci");
        this.stockfish.postMessage("isready");
    }

    evaluatePosition(fen, depth) {
        this.stockfish.postMessage(`position fen ${fen}`);
        this.stockfish.postMessage(`go depth ${depth}`);
    }
    stop() {
        this.stockfish.postMessage("stop"); // Run when changing positions
    }
    quit() {
        this.stockfish.postMessage("quit"); // Good to run this before unmounting.
    }
}

export default Engine;