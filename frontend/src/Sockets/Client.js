import io from 'socket.io-client';

export default class Client {
	constructor(gameState) {
		this.game = gameState;
		
		const serverUrl = __DEV__ ? 'http://localhost:3000' : ''; // eslint-disable-line

		this.socket = io(serverUrl);
		this.socket.on('connect', () =>{
			
		});

		
		this.socket.on('disconnect', ()=> {});

		this.socket.on('game', data => {
			this.gotGameState(data);
		});

		this.socket.on('joinedRoom', (roomId)=>{
			this.room=roomId;
			console.log("joined Room:", this.room)
		})

		this.socket.on('gameOver', () => {
			this.gotGameOver();
		});

		this.socket.on('gameWon', () => {
			this.gotGameWon();
		});

		this.socket.on('userMoveUpdate', data => {
			this.gotUserMove(data);
		});

		this.socket.on('initalState', data => {
			this.gotInitialGameState(data);
		});
	}

	startGame() {
		this.socket.emit('startGame');
	}
	restartGame() {
		this.socket.emit('startGame');
	}
	createRoom(){
		this.socket.emit('createRoom');
	}

	dispatchMove({ rowIndex, columnIndex }) {
		return this.socket.emit('userMove', { row: rowIndex, column: columnIndex });
	}
	gotGameState(data) {
		this.gameStateData = data;
		this.game.updateGrid(this.gameStateData);
	}
	gotUserMove(userMove) {
		this.game.updateGrid(userMove);
	}

	gotInitialGameState(data) {
		this.initGameState = data;

		console.log(this.room)
		this.game.createGame(this.initGameState);
	}

	gotGameOver() {
		this.game.gameOver();
	}

	gotGameWon() {
		this.game.gameWon();
	}
}
