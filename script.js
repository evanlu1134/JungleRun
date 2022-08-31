
kaboom()

loadSprite("grass", "images/grass.png");
loadSprite("portal", "images/portal.png");
loadSprite("s", "images/s.png");
loadSprite("gorilla", "images/gorilla.png");
loadSprite("gorilla", "images/gorilla.png");
loadSprite("JUNGLE", "images/JUNGLE.jpg");
loadSprite("trees", "images/trees.png");
loadSprite("run", "images/run.png");
loadSprite("rain","images/rain.png");
loadSprite("coin","images/coin.png");
loadSprite("steel","images/steel.png");



let score = 0;
const HERO_SPEED = 350;



  const maps = [
    [
      "                                                        ",
      "                                                        ",
      "                                                        ",
      "                                                        ",
      "                                                        ",
      "                                                        ",

      "    +           +                      mm                ",
      "    ==      ==   ====                  mm                   ",
      "             ^   ^   +   ^  +          mm  a        @        ",
      " ==========================   ================       ======    "

    ],
    [
      "                                      ",
      "                                      ",
      "                                      ",
      "                                      ",
      "                                      ", 
      "                                      ",
      "    +     +      +                    ",
      "    =========   ====       ==         ",
      "                                  w   ",
      " ====================================  "
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
    "a": () => [
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
      // body(),
    ],

    "^": () => [
      sprite("s"),
      "enemy",
      area(),
      body(),
    ],

    "+": () => [
      sprite("gorilla"),
      "enemy",
      area(),
      // move(hero.pos.angle(enemy.pos), 1200),
      body(),
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

    ],
  }

  const scoreboard = add([
    text("Score:" + score),
    scale(.7),
    pos(0, 50),
    fixed(),
  ])

//   const gorilla = add([
//     sprite("gorilla"),
//     pos(enemy.pos),
//     area(),
//       move(hero.pos.angle(enemy.pos), 1200),
// ])
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

  hero.onCollide("win", () => {
    go("win")
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
  hero.onUpdate(() => {
    camPos(hero.pos)
    if (hero.pos.y > 2000) {
      go("lose")
    }
  })
})

  scene("lose", () => {
    let loser = add([
      sprite("trees"),
      pos(width() / 2, height() / 2),
      origin("center"),
      scale(2),
      fixed()
    ])
    add([
      text("You Lose" + "\n" + "\n" + "Press Space to Retry"),
      color(255, 5, 0),

      origin("center"),
      pos(width() / 2, height() / 2)
    ])
    keyPress("space", () => {
      score = 0;
      go("game")

    })
  })
scene("win", () => {
  let winner = add([
    sprite("trees"),
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(2),
    fixed()
  ])
  add([
    text("You Win!🎯" + "\n" + "You conquered the Jungle!"),
    origin("center"),
    pos(width() / 2, height() / 2),
    scale(1),
    fixed()
  ])

  keyPress("space", () => {
    go("game")

  })
})
scene("title", () => {
  let titleScreen = add([
    sprite("rain"),
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(1),
    fixed()
  ])
  let titleText = add([
    text("Jungle Run" + "\n \n" + " Tutorial(Enter)" + "\n \n" + "How to Play"),
    color(41, 171, 135),
    pos(width() / 1.8, height() / 2),
    origin("center"),
    scale(1),
    fixed(),
  ])
  onKeyPress("enter", () => {
    go("tutorial")
  })
})

scene("tutorial", () => {
  let tutorialPage = add([
    sprite("rain"),
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(1),
    fixed()
  ])
  let titleText = add([
    text("-> Move Rigth" + "\n \n" + "<- Move Left" + "\n \n" + "Space to (jump)"+ "\n \n" + "Enter to play"),
    color(41, 171, 135),
    pos(width() / 1.8, height() / 2),
    origin("center"),
    scale(1),
    fixed(),
  ])
  onKeyPress("enter", () => {
    go("game")
  })
})


go("title")