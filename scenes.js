
//Winning scene 
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
    let tutorialPage = add([
      sprite("rain"),
      pos(width() / 2, height() / 2),
      origin("center"),
      scale(1),
      fixed()
    ])
    let titleText = add([
      text("-> Move Rigth" + "\n \n" + "<- Move Left" + "\n \n" + "Space to (jump)" + "\n \n" + "Enter to play"),
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
//lose scene 
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
  go("title")