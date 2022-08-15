if (document.querySelector('.game')) {
    const playername = document.querySelector('.gamername')
    let gamername = JSON.parse(localStorage.getItem('userdata'))
    playername.innerHTML = gamername.name
    let seconds
    let isPause = false
    if (gamername.mode == "time") {
        seconds = 60;
        let t;
        function time() {
            if (isPause === false) {
                if (seconds < 60) {
                    document.getElementById("m").innerHTML = seconds;
                }
                if (seconds > 0) {
                    seconds--;
                } else {
                    clearInterval(t);
                    document.querySelector('.final-score').innerHTML = playerdata.score
                    document.querySelector('.final-correct').innerHTML = playerdata.correct
                    document.querySelector('.final-incorrect').innerHTML = playerdata.incorrect
                    document.querySelector('.modal-end').style.opacity = 1
                    document.querySelector('.modal-end').style.visibility = 'visible'
                }
            }
        }
        if (!t) {
            t = window.setInterval(function () {
                time();
            }, 1000);
        }
        document.getElementById("m").innerHTML = "1:00";
    } else {
        document.getElementById("m").innerHTML = "Practice";
    }

    const num1 = document.querySelector('.item-1')
    const operator = document.querySelector('.operator')
    const num2 = document.querySelector('.item-2')
    const result = document.querySelector('.result')
    const score = document.querySelector('.score')
    const back = document.querySelector('.back')
    const backend = document.querySelector('.back-end')
    const continueBtn = document.querySelector('.continue')
    const stop = document.querySelector('.stop')
    const endGame = document.querySelector('.end')
    const again = document.querySelector('.again')
    const leaderboard = document.querySelector('.leaderboard-btn')

    back.addEventListener('click', () => {
        location.assign('../index.html')
    })
    backend.addEventListener('click', () => {
        location.assign('../index.html')
    })
    leaderboard.addEventListener('click', () => {
        location.assign('../leaderboard.html')
    })
    continueBtn.addEventListener('click', () => {
        isPause = false
        document.querySelector('.modal-menu').style.opacity = 0
        document.querySelector('.modal-menu').style.visibility = 'hidden'
    })
    endGame.addEventListener('click', () => {
        seconds = 0
        isPause = false
        document.querySelector('.modal-menu').style.opacity = 0
        document.querySelector('.modal-menu').style.visibility = 'hidden'
    })
    again.addEventListener('click', () => {
        location.reload()
        document.querySelector('.modal-end').style.opacity = 0
        document.querySelector('.modal-end').style.visibility = 'hidden'
    })

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const operators = ['+', '-', '*', '/']

    const sum = (a, b, randomValue) => {
        if (randomValue === '+') return a + b
        if (randomValue === '-') return a - b
        if (randomValue === '/') return a / b
        return a * b
    }

    function generateItems() {
        const number1 = getRandomIntInclusive(1, 10)
        const number2 = getRandomIntInclusive(1, 10)
        let randomValue = operators[Math.floor(operators.length * Math.random())];
        if (randomValue === "/") {
            if (number1 % number2 !== 0) {
                return generateItems()
            }
        }
        const trueResult = sum(number1, number2, randomValue)
        return { randomValue, number1, number2, trueResult }
    }

    function setItems(data) {
        num1.innerHTML = data.number1
        num2.innerHTML = data.number2
        operator.innerHTML = data.randomValue
    }

    let items = generateItems()
    setItems(items)
    let win = 0
    let correct = 0
    let incorrect = 0

    const mathGame = document.querySelector('.game-calculation')
    function animation() {
        mathGame.classList.remove("slide-in-right")
        mathGame.classList.add("slide-in-right")
        setTimeout(() => {
            mathGame.classList.add("slide-in-right")
            mathGame.classList.remove("slide-in-right")
            setItems(items)
        }, 300)
    }
    animation()

    let playerdata = {
        name: gamername.name,
        mode: gamername.mode,
        score: win,
        correct: correct,
        incorrect: incorrect
    }

    document.addEventListener('keydown', (e) => {
        if (e.keyCode == '13' || e.code === "Enter") {
            if (result.value == items.trueResult) {
                animation()
                result.value = ''
                items = generateItems()
                setItems(items)
                win = win + 1
                playerdata.score = win
                correct = correct + 1
                playerdata.correct = correct
                score.innerText = win
                document.querySelector('.notification').innerHTML = "+1"
                document.querySelector('.notification').classList.add('animation')
                document.querySelector('.notification').classList.add('green')
                setTimeout(() => {
                    document.querySelector('.notification').classList.remove('animation')
                    document.querySelector('.notification').classList.remove('green')
                    document.querySelector('.notification').innerHTML = ''
                }, 700)
            } else {
                animation()
                result.value = ''
                items = generateItems()
                if (win <= 0) {
                    animation()
                    win = 0
                    setItems(items)
                    score.innerText = win
                    playerdata.score = win
                    incorrect = incorrect + 1
                    playerdata.incorrect = incorrect
                    return
                }

                document.querySelector('.notification').innerHTML = "-1"
                document.querySelector('.notification').classList.add('animation')
                document.querySelector('.notification').classList.add('red')
                setTimeout(() => {
                    document.querySelector('.notification').classList.remove('animation')
                    document.querySelector('.notification').classList.remove('red')
                    document.querySelector('.notification').innerHTML = ''
                }, 700)

                win = win - 1
                playerdata.score = win
                incorrect = incorrect + 1
                playerdata.incorrect = incorrect
                setItems(items)
                score.innerText = win
            }
        }
    })
    function setPlayerData() {
        if (gamername.mode == 'practice') {
            document.querySelector('.modal-end').style.opacity = 1
            document.querySelector('.modal-end').style.visibility = 'visible'

            let data = JSON.parse(localStorage.getItem('score')) || []
            let currentUser = data.find(item => item.name === playerdata.name && item.mode === playerdata.mode)
            if (currentUser) {
                if (currentUser.score < playerdata.score) {
                    currentUser.score = playerdata.score
                    currentUser.correct = playerdata.correct
                    currentUser.incorrect = playerdata.incorrect
                }
            } else {
                data.push(playerdata)
            }
            localStorage.setItem('score', JSON.stringify(data))
            document.querySelector('.final-score').innerHTML = playerdata.score
            document.querySelector('.final-correct').innerHTML = playerdata.correct
            document.querySelector('.final-incorrect').innerHTML = playerdata.incorrect
            console.log(JSON.parse(localStorage.getItem('score')));
        } else {
            isPause = true
            document.querySelector('.modal-menu').style.opacity = 1
            document.querySelector('.modal-menu').style.visibility = 'visible'
            let data = JSON.parse(localStorage.getItem('score')) || []
            let currentUser = data.find(item => item.name === playerdata.name && item.mode === playerdata.mode)
            if (currentUser) {
                if (currentUser.score < playerdata.score) {
                    currentUser.score = playerdata.score
                    currentUser.correct = playerdata.correct
                    currentUser.incorrect = playerdata.incorrect
                }
            } else {
                data.push(playerdata)
            }
            localStorage.setItem('score', JSON.stringify(data))
        }
    }
    stop.addEventListener('click', setPlayerData)
}