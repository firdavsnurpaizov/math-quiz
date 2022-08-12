if (document.querySelector('.login')) {

    let username = document.querySelector('.username')
    let warningText = document.querySelector('.warning-text')
    let start = document.querySelector('.go')
    const mode = document.querySelector('input[name="mode"]:checked').value
    const modes = document.querySelectorAll('input[name="mode"]')
    let currentUser = JSON.parse(localStorage.getItem('username')) || []
    let currentName
    let currentMode
    // console.log(currentUser, 'currentUser');
    // let currentMode = JSON.parse(localStorage.getItem('username'))

    // username.value = currentUser

    if (currentUser) {
        currentName = currentUser?.name || ''
        currentMode = currentUser?.mode || ''

        // username.value = currentUser[0]?.name || ''
    }

    // console.log('currentUser:',currentUser);

    let userdata = {
        name: currentName,
        mode: currentMode
    }

    function setUserData(e) {
        userdata.name = e.target.value
        userdata.mode = mode
    }

    username.oninput = (e) => {
        setUserData(e)
    }

    modes.forEach(item => {
        item.addEventListener('change', () => {
            userdata.mode = item.value
        })
    })
    const gamername = document.querySelector('.gamername')

    start.addEventListener('click', () => {
        if (username.value == '') {
            warningText.style.opacity = 1
            warningText.style.visibility = 'visible'
        } else {
            warningText.style.opacity = 0
            warningText.style.visibility = 'hidden'
            localStorage.setItem('userdata', JSON.stringify(userdata))
            location.assign('../game.html')
            gamername.innerTEXT = 'firdavs'
        }
    })



}