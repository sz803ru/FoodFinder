const greetButton = document.getElementById("GreetButton")
const greetOutput=document.getElementById("")
greetButton.getEventListener("click", ()=>{
    greetOutput.textContent="Hello Welcome to my Website"
})

const revealbutton=document.getElementById("RevealBtn")
const revealout=document.getElementById("RevealOut")

revealButton.addEventListener('click', () => {
    secretMessage.textContent = 'Thinking...';
    setTimeout(() => {
        secretMessage.textContent = 'Surprise! You found the secret message!';
    }, 2000);
})