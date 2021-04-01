let canvas = document.getElementById('game')
let context = canvas.getContext('2d')

let balloons = []
let needle = { xPos: 300, yPos: 0, dx: 10 }
let timer = 0;
let score = 0;
let time = 10;
let round = 1;

let countOfImg = 0

let needleImg = new Image()
needleImg.src = 'img/needle.png'
needleImg.onload = function () {
    countOfImg += 1
    if (countOfImg === 6) {
        game()
    }
}

let balloonImg = new Image()
balloonImg.src = 'img/balloon.png'
balloonImg.onload = function () {
    countOfImg += 1
    if (countOfImg === 6) {
        game()
    }
}

let aquaBallonImg = new Image()
aquaBallonImg.src = 'img/aqua_balloon.png'
aquaBallonImg.onload = function () {
    countOfImg += 1
    if (countOfImg === 6) {
        game()
    }
}

let coloredBallonImg = new Image()
coloredBallonImg.src = 'img/colored_balloon.png'
coloredBallonImg.onload = function () {
    countOfImg += 1
    if (countOfImg === 6) {
        game()
    }
}

let greenBallonImg = new Image()
greenBallonImg.src = 'img/green_balloon.png'
greenBallonImg.onload = function () {
    countOfImg += 1
    if (countOfImg === 6) {
        game()
    }
}

let pinkBallonImg = new Image()
pinkBallonImg.src = 'img/pink_balloon.png'
pinkBallonImg.onload = function () {
    countOfImg += 1
    if (countOfImg === 6) {
        game()
    }
}

let fonImg = new Image()
fonImg.src = 'img/background.png'
fonImg.onload = function () {
    countOfImg += 1
    if (countOfImg === 6) {
        game()
    }
}

let possibleBallons = [balloonImg, aquaBallonImg, coloredBallonImg, greenBallonImg, pinkBallonImg]


document.addEventListener('keypress', (event) => {
    if (event.key === 'a' || event.key === 'ф') {
        needle.xPos -= needle.dx
    }
    if (event.key === 'd' || event.key === 'в') {
        needle.xPos += needle.dx
    }
})

// обновление данных
function update() {

    if (needle.xPos >= 950) needle.xPos = 950
    if (needle.xPos <= 1) needle.xPos = 1

    timer += 1
    time -= 0.01

    let size = Math.floor(Math.random() * 50 + 50)
    if (timer % 60 === 0) {
        balloons.push({
            pic: possibleBallons[Math.floor(Math.random() * 4)],
            xPos: Math.random() * 900,
            yPos: 650,
            dx: 0,
            dy: Math.floor(Math.random() * 3) * (-1),
            xSize: size,
            ySize: size * 1.2,
            del: 0
        })
    }

    if (time <= 0) {
        alert(`Time is over! Your score - ${score}`)
        for (i in balloons) {
            balloons[i].dy += 5
        }
        round += 1
        time = 10
        score = 0
        needle.dx *= 1.5
    }

    // // физика
    for (i in balloons) {
        balloons[i].xPos += balloons[i].dx
        balloons[i].yPos += balloons[i].dy
    }

    for (i in balloons) {

        // границы
        if (balloons[i].yPos < -200) balloons.splice(i, 1)

        if (Math.abs(balloons[i].xPos + 25 - needle.xPos - 25) < 50
            && Math.abs(balloons[i].yPos - needle.yPos) < 50) {
            balloons[i].del = 1
        }
        if (balloons[i].del === 1) {
            balloons.splice(i, 1)
            score += 1
        }
    }
}

// отрисовка
function render() {
    context.drawImage(fonImg, 0, 0, 1000, 600)
    context.drawImage(needleImg, needle.xPos, needle.yPos, 50, 50)

    for (i in balloons) {
        context.drawImage(balloons[i].pic, balloons[i].xPos, balloons[i].yPos, balloons[i].xSize, balloons[i].ySize)
    }

    context.fillStyle = '#000'
    context.font = '25px Verdana'
    context.fillText(`Time: ${time}`, 10, canvas.height - 70)
    context.fillText(`Score: ${score}`, 10, canvas.height - 40)
    context.fillText(`Round: ${round}`, 10, canvas.height - 10)
}

// Бесконечный цикл основной игровой цикл
function game() {
    update()
    render()
    requestAnimationFrame(game)
}