
const socket = io()
let names;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    names = prompt('Please enter your name: ')
} while(!names)



textarea.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
        sendMessage(event.target.value)
    }
})



function sendMessage(message) {
    let msg = {
        user: names,
        message: message.trim()
    }  
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    socket.emit('message', msg)
}



function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let newMessage = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = newMessage
    messageArea.appendChild(mainDiv)
}
 

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
})




// function scrollToBottom() {
//     messageArea.scrollTop = messageArea.scrollHeight
// }



