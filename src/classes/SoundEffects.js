class SoundEffects {
  constructor() {
    this.shootSounds = Array(5)
      .fill()
      .map(() => new Audio('src/assets/audios/shoot.mp3'))
    this.hitSounds = Array(5)
      .fill()
      .map(() => new Audio('src/assets/audios/hit.mp3'))

    this.explosionSound = new Audio('src/assets/audios/explosion.mp3')
    this.nextLevelSound = new Audio('src/assets/audios/next_level.mp3')

    // 🎵 Músicas de fundo
    this.backgroundMusics = [
      new Audio('src/assets/audios/backgroundMusic1.mp3'),
      new Audio('src/assets/audios/backgroundMusic2.mp3'),
    ]

    this.currentShootSounds = 0
    this.currentHitSounds = 0

    this.adjustVolumes()
  }

  playShootSound() {
    this.shootSounds[this.currentShootSounds].currentTime = 0
    this.shootSounds[this.currentShootSounds].play()
    this.currentShootSounds =
      (this.currentShootSounds + 1) % this.shootSounds.length
  }

  playHitSound() {
    this.hitSounds[this.currentHitSounds].currentTime = 0
    this.hitSounds[this.currentHitSounds].play()
    this.currentHitSounds = (this.currentHitSounds + 1) % this.hitSounds.length
  }

  playExplosionSound() {
    this.explosionSound.play()
  }

  playNextLevelSound() {
    this.nextLevelSound.play()
  }

  playRandomBackgroundMusic() {
    this.backgroundMusics.forEach(music => {
      music.pause()
      music.currentTime = 0
    })

    const randomIndex = Math.floor(Math.random() * this.backgroundMusics.length)
    const selectedMusic = this.backgroundMusics[randomIndex]

    selectedMusic.loop = true
    selectedMusic.volume = 0.5
    selectedMusic.play()
  }

  stopBackgroundMusic() {
    this.backgroundMusics.forEach(music => {
      music.pause()
      music.currentTime = 0
    })
  }

  adjustVolumes() {
    this.hitSounds.forEach(sound => (sound.volume = 0.3))
    this.shootSounds.forEach(sound => (sound.volume = 1))
    this.backgroundMusics.forEach(music => (music.volume = 0.5))
    this.explosionSound.volume = 1
    this.nextLevelSound.volume = 1
  }
}

export default SoundEffects
