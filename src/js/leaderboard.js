if (document.querySelector('.leaderboard')) {


    const name = document.querySelector('.name')
    const score = document.querySelector('.score')

    let scoreFromLocal = JSON.parse(localStorage.getItem('score')) || []
    console.log('score', scoreFromLocal);
    
    scoreFromLocal.map(item => {
        
        name.innerHTML = item.name
        score.innerHTML = item.score
    })













































}