if (document.querySelector('.leaderboard')) {

    let gamername = JSON.parse(localStorage.getItem('userdata'))

    const select = document.getElementById('mode');
    select.value = gamername.mode

    const leaderboard = document.querySelector('.leaderboard-block__leaders')

    let scoreFromLocal = JSON.parse(localStorage.getItem('score')) || []
    console.log('score', scoreFromLocal);

    function setScores(selectedMode) {
        scoreFromLocal.sort((a, b) => a.score - b.score).forEach((item,) => {
            if (selectedMode === item.mode) {
                const singleScore = `
                <div class="item-wrapper">
                <div class="name"> ${item.name}</div>
                <div class="score"> ${item.score}</div>
                </div>
              `
                leaderboard.insertAdjacentHTML('afterbegin', singleScore)
            }
        })
    }
    setScores(gamername.mode)

    select.addEventListener('change', (e) => {
        leaderboard.innerHTML = ''
        if (e.target.value === 'time') {
            setScores('time')
        } else {
            setScores('practice')
        }
    })












































}