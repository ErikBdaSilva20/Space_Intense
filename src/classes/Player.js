import {
  ENGINE_IMAGE,
  ENGINE_SPRITES,
  INITIAL_FRAMES,
  PATH_SPACESHIP_IMAGE,
} from '../utils/constants.js'
import Projectile from './Projectiles.js'

class Player {
  constructor(canvasWidth, canvasHeight) {
    this.width = 48 * 2
    this.height = 48 * 2
    this.velocity = 10

    this.position = {
      x: canvasWidth / 2 - this.width / 2,
      y: canvasHeight - this.height - 30,
    }

    this.image = this.getImage(PATH_SPACESHIP_IMAGE)
    this.engineImage = this.getImage(ENGINE_IMAGE)
    this.engineSprites = this.getImage(ENGINE_SPRITES)
    this.sx = 0
    this.framesCounter = 10
  }

  getImage(path) {
    const image = new Image()
    image.src = path
    return image
  }

  moveLeft() {
    this.position.x -= this.velocity
  }

  moveRight() {
    this.position.x += this.velocity
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.height,
      this.width,
    )

    ctx.drawImage(
      this.engineSprites,
      this.sx,
      0,
      48,
      48,
      this.position.x,
      this.position.y + 16,
      this.width,
      this.height,
    )

    ctx.drawImage(
      this.engineImage,
      this.position.x,
      this.position.y + 8,
      this.height,
      this.width,
    )
    this.uptade()
  }

  uptade() {
    if (this.framesCounter === 0) {
      this.sx = this.sx === 96 ? 0 : this.sx + 48
      this.framesCounter = INITIAL_FRAMES
    }
    this.framesCounter--
  }

  shoot(projectiles) {
    const p = new Projectile(
      {
        x: this.position.x + this.width / 2 - 1,
        y: this.position.y,
      },
      -5,
    )

    projectiles.push(p)
  }
}

export default Player
