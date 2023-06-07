const links = document.querySelectorAll('.links')

Array.from(links).forEach((link) => {
    link.addEventListener('click',e =>{
        console.log(e.target.innerText)
        localStorage.setItem('mode', e.target.innerText)

    })
})