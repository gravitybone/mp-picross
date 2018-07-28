import { centerGameObjects } from '../utils'
import config from '../config';
import Banner from '../sprites/Banner'
import lang from '../lang';

class Splash extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'SplashScene'
    });
}


  init () {}

  preload () {
    
  }

  create () {
    let bmd = this.add.graphics();    
    bmd.fillStyle(0xececec, 1);
    bmd.fillRect(0, 0, config.width,config.height);
   
    Banner(this, config.width / 2, 200, lang.text('welcome'), 100);

    const start = Banner(this, config.width / 2, config.height-150, lang.text('start'), 75);
    start.setInteractive();
    start.once('pointerdown', this.startGame,this)
  }

  startGame(){
    
    this.scene.start('GameScene');
  }
}

export default Splash;