
//Winning scene 
scene("win", () => {
    let winner = add([
      sprite("trees"),
      pos(width() / 2, height() / 2),
      origin("center"),
      scale(3),
      fixed()
    ])
    let winText = add([
      text(`You Win!\n"You conquered the Jungle!\n\nScored:${score}`),
      origin("center"),
      color(hsl2rgb((score * 10) / 255, 0.6, 0.7)),
      pos(width() / 2, height() / 2),
      scale(1),
      fixed(),
    ])
  
    keyPress("space", () => {
      go("game"),
        score = 0
    })
  })


  //starting scene 
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
// tutorial scene 
  scene("tutorial", () => {
    let tutorialBg= add([
      sprite("rain"),
      pos(width() / 2, height() / 2),
      origin("center"),
      scale(1),
      fixed()
    ])
    let tutorialHtp = add([
      sprite("HTP"),
      pos(width() / 2, height() / 2),
      origin("center"),
      scale(1),
      fixed()
    ])

    onKeyPress("enter", () => {
      go("game")
    })
  })
//lose scene 
  scene("lose", () => {
    let loser = add([
      sprite("trees"),
      pos(width() / 2, height() / 2),
      origin("center"),
      scale(3),
      fixed()
    ])
    add([
      text("You Lose" + "\n" + "\n" + "Space to Retry"),
      color(255, 5, 0),
      origin("center"),
      pos(width() / 2, height() / 2)
    ])
    keyPress("space", () => {
      go("game"),
      score = 0
    })
  })
  go("title")