import Grid from './classes/Grid.js'
import Invader from './classes/Invader.js'
import Player from './classes/Player.js'
import Projectile from './classes/Projectiles.js'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
ctx.imageSmoothingEnabled = false

const player = new Player(canvas.width, canvas.height)
const grid = new Grid(3, 6)
const playerProjectiles = []
const invadersProjectiles = []

const keys = {
  left: false,
  right: false,
  shoot: {
    pressed: false,
    released: true,
  },
}

const drawProjectiles = () => {
  const projectiles = [...playerProjectiles, ...invadersProjectiles]

  projectiles.forEach(projectile => {
    projectile.draw(ctx)
    projectile.update()
  })
}

const clearProjectiles = () => {
  playerProjectiles.forEach((projectile, index) => {
    if (projectile.position.y <= 0) {
      playerProjectiles.splice(index, 1)
    }
  })
}

const checkShootInvaders = () => {
  grid.invaders.forEach((invaders, invadersIndex) => {
    playerProjectiles.some((projectile, projectileIndex) => {
      if (invaders.playerHitEnemy(projectile)) {
        grid.invaders.splice(invadersIndex, 1)
        playerProjectiles.splice(projectileIndex, 1)
      }
    })
  })
}
/* Ferramentas que são executadas em loop (Infinitamente) */
const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawProjectiles()
  clearProjectiles()

  checkShootInvaders()

  grid.draw(ctx)
  /* grid.update() */

  ctx.save()
  ctx.translate(
    player.position.x + player.width / 2,
    player.position.y + player.height / 2,
  )

  if (keys.shoot.pressed && keys.shoot.released) {
    keys.shoot.released = false
    player.shoot(playerProjectiles)
  }

  if (keys.left && player.position.x >= 0) {
    player.moveLeft()
    ctx.rotate(-0.1)
  }

  if (keys.right && player.position.x <= canvas.width - player.width) {
    player.moveRight()
    ctx.rotate(0.1)
  }

  ctx.translate(
    -player.position.x - player.width / 2,
    -player.position.y - player.height / 2,
  )

  player.draw(ctx)

  ctx.restore()

  requestAnimationFrame(gameLoop)
}

addEventListener('keydown', event => {
  const key = event.key.toLocaleLowerCase()

  if (key === 'a') keys.left = true

  if (key === 'd') keys.right = true

  if (key === 'enter') keys.shoot.pressed = true
})

addEventListener('keyup', event => {
  const key = event.key.toLocaleLowerCase()

  if (key === 'a') keys.left = false

  if (key === 'd') keys.right = false

  if (key === 'enter') {
    keys.shoot.pressed = false
    keys.shoot.released = true
  }
})

setInterval(() => {
  const invader = grid.getRandomInvader()

  if (invader) {
    invader.shoot(invadersProjectiles)
  }
}, 1000)

gameLoop()
