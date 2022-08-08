let username = document.querySelector('.username')
const mode = document.querySelector('input[name="mode"]:checked').value
const modes = document.querySelectorAll('input[name="mode"]')



function setUserData(e) {

    let userdata = {
        name: e.target.value,
        mode: mode
    }
    console.log(userdata);
    console.log(userdata.name);


    // localStorage.setItem('username', userdata)

}

username.oninput = (e) => {
    setUserData(e)
}


    modes.forEach(item => {
        item.addEventListener('change', ()=>{
                userdata.mode = item.value;
    localStorage.setItem('username', userdata)

        })
    })