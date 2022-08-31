
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


let score = 0;
const HERO_SPEED = 350;



  const maps = [
    [
      "                                        ",
      "                                        ",
      "                                        ",
      "                                        ",
      "                                        ",
      "                                        ",
      "    +           +                       ",
      "    ==      ==   ====                   ",
      "             ^   ^   +   ^  +      @    ",
      " =====================================  "
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
      "                                      ",
      " ===================================  "
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
    "=": () => [
      sprite("grass"),
      "block",
      area(),
      solid(),
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
      body(),
    ],
  }

  const scoreboard = add([
    text("Score:" + score),
    scale(.7),
    pos(0, 50),
    fixed(),
  ])

  // const health = add([
  //   text("Health:" + hp),
  //   scale(.7),
  //   pos(0, 0),
  //   fixed(),
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
  hero.collides("portal", () => {
    //go to scene, not maps
    go("game", {
      level: level + 1
      //map is an array thus add level to progress next
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
  hero.onUpdate(() => {
    camPos(hero.pos)
    if (hero.pos.y > 2000) {
      go("lose")
    }
  })

}) /
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
    text("Jungle Run" + "\n" + "\n" + "Start(Space)" + "\n" + "\n" + "How to Play"),
    color(41, 171, 135),
    pos(width() / 1.8, height() / 2),
    origin("center"),
    scale(1),
    fixed(),
  ])
  onKeyPress("space", () => {
    go("game")
  })
})


go("title")