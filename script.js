
kaboom()

let score = 0;
const HERO_SPEED = 350;


const maps = [
  [

    "                                                                                                        ",
    "                                                                                                        ",
    "                                                                                                        ",
    "                                                                                                        ",
    "                                                                                                        ",
    "         o                o                                                                             ",
    "      +  o   +    s       o                                  oo                                         ", 
    "         o       ====     o          +  ooooo                oo                                         ",
    "                   s   +  o       ^    o   t                 oo                    +                    ",
    " $$$$^^ $$$$$$$$$$$$$$$$$$$$   =    $$$$$$$$$$$$$$$$     ^^^$$$$$    $$$$$ ^^^ s $$$$$$$  s       @       ",
    " ===========================      ================     =========      ===== ==== ========= ====    ====  "


  ],
  [
    "                                       ",
    "                                       ",
    "                                       ",
    "                                       ",
    "                                       ",
    "                                       ",
    "    +     +      +                     ",
    "    =========   ====       ==          ",
    "                                @      ",
    " ====================================  "
  ],
  [
    "                                                                                                        ",
    "                                                                                                        ",
    "                                                                                                        ",
    "                                                                                                        ",
    "                                                                                                        ",
    "                                                                                                        ",
    "      +  o   +   + s                                                                                    ", 
    "         o       ====                    ooooo                                                          ",
    "                    +   s      + o     o     o                            s                             ",
    " $$$$^^ $$$$$$$$$$$$$$$$$$$$$     ^$$$$$$$$$$$$$$$$     ^  $$$$$  $$$$$ ^^^ $$$$$$$  s       w          ",
    " ===========================   ================       ======  ===== ==== ========= ====      ====       "

  ],
]

scene("game", ({ level } = { level: 0 }) => {
  let background = add([
    sprite("JUNGLE"),
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(2.2),
    fixed()
  ])
  function patrol(speed = 60, dir = 1) {
    return {
      id: "patrol",
      require: [ "pos", "area", ],
      add() {
        this.on("collide", (obj, col) => {
          if (col.isLeft() || col.isRight()) {
            dir = -dir
          }
        })
      },
      update() {
        this.move(speed * dir, 0)
      },
    }
  }
  const levelCfg = {
    width: 60,
    height: 70,

    "@": () => [
      sprite("portal"),
      "block",
      area(),
      solid(),
      "portal"
    ],
    "t": () => [
      sprite("portal"),
      "block",
      area(),
      solid(),
      "troll"
    ],
    "=": () => [
      sprite("grass"),
      "block",
      area(),
      solid(),
      scale(1)
    
    ],
    "$": () => [
      sprite("grass"),
      "block",
      area(),
      body(),
      scale(1)
    ],

    "s": () => [
      sprite("s"),
      "enemy",
      "snake",
      area(),
      body(),
    ],

    "+": () => [
      sprite("gorilla"),
      "gor",
      "enemy",
      area(),
      solid(),
      scale(0.8),
      patrol(),
      body(),
      scale(.8),
    
    ],
    "w": () => [
      sprite("coin"),
      area(),
      body(),
      "win"
    ],
    "m": () => [
      sprite("steel"),
      "block",
      area(),
      body(),

    ], "o": () => [
      sprite("rock"),
      "block",
      area(),
      solid(),
      body(),
      scale(0.2)
    ],
    
    "^": () => [
      sprite("spike"),
      "spikes",
      area(),
      solid(),
      body(),
    ],


  }
  //timer 

  // const timer = add([
  // 	text(0),
  // 	pos(0, 0),
  // 	fixed(),
  // 	{ time: 30},
  // ])

  const timer = add([
  	text(0),
    scale(0.7),
  	pos(0, 0),
  	fixed(),
  	{ time: 30},
  ])


  // timer.onUpdate(() => {
  // 	timer.time -= dt()
  // 	timer.text = "Timer:" + timer.time.toFixed(2)
  //   if(timer.time <= 0){
  //     go("lose")
  //   }
  // })

  const scoreboard = add([
    text("Score:" + score),
    scale(0.7),
    pos(0, 50),
    fixed(),
  ])
  const levelDisplay = add([
    text(`Level: ${level + 1}`),
    scale(0.7),
    pos(1250, 0),
    fixed(),
  ])
// hero 
  const hero = add([
    sprite("run"),
    pos(68, 5), // give it a starting postion 
    area(),
    body(), // have the object respond to graviy 
    scale(2),
    "player"
  ])


  const game_level = addLevel(maps[level], levelCfg)

  // onKeyDown("right", () => {
  //   hero.move(HERO_SPEED, 0) // the first one is the x axis, y on the rght
  // })

  onKeyDown("right", () => {
    hero.flipX(false)
    hero.move(HERO_SPEED, 0)

  })

  hero.onCollide("win", () => {
    go("win")
  })
  //player moving levels logic
  hero.onCollide("portal", () => {
    //go to scene, not maps
    go("game", {
      level: level + 1
      //map is an array thus add level to progress next
    })
  })
  hero.onCollide("troll", () => {
    go("game", {
      level: level = 0
    })
  })

  


  //temp space to set interval time for gorilla jump and down follow line 95

  onKeyDown("left", () => {
    hero.move(-HERO_SPEED, 0)
  })
  onKeyDown("space", () => {
    if (hero.grounded()) {
      hero.jump(900, 0)
    }
  })
  hero.onCollide("enemy", (enemy) => {
    if (enemy.pos.y < hero.pos.y) {
      go("lose")
    } else {
      score++
      scoreboard.text = "score " + score
      enemy.destroy()
      hero.jump(1000)
    }
  })
  hero.onCollide("spikes", (enemy) => {
      go("lose")
    
  })
  hero.onUpdate(() => {
    camPos(hero.pos)
    if (hero.pos.y > 2000) {
      go("lose")
    }
  })
})


let music = play("Chill", {
  volume: 5,
  loop: true,
})
