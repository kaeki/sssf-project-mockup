const messages = [
    {
        channel: '#random',
        messages: [
            {
                user: 'Frönäfroon',
                message: 'OMG LOL',
                time: null
            },{
                user: 'Whiterun Guard',
                message: 'I was once an adventurer like you',
                time: null
            },{
                user: 'Frönäfroon',
                message: 'XD ASDASDASDSADASDASDS',
                time: null
            },{
                user: 'Muumipeikko',
                message: 'Nuuskamuikkunen hoooooi!',
                time: null
            }
        ]
    },
    {
        channel: '#super_serious_stuff',
        messages: [
            {
                user: 'RickA',
                message: "I'm never gonna give you up",
                time: null
            },{
                user: 'RickA',
                message: 'Never gonna let you down',
                time: null
            }
        ]
    },
    {
        channel: '#flumbaar',
        messages: [
            {
                user: 'Rick',
                message: "H-hey, little buddy. H-h-how're you doin' in here right now?",
                time: null
            },{
                user: 'Morty',
                message: "Aw geez, Rick, w-what are you doing, man?",
                time: null
            },{
                user: 'Rick',
                message: "Y-y-you're a good kid, Morty, y-you're a l-little c-character, Morty.",
                time: null
            },{
                user: 'Morty',
                message: "Oh, boy...",
                time: null
            }
        ]
    }    
];

function messageTemplate(msg) {
    const time = new Date(msg.time).toLocaleString('fi-FI');
    const template = `<div class="card message">
                        <h6>${msg.user}</h6>
                        <p>${msg.message}</p>
                        <p class="timestamp">${time}</p>
                    </div>`;
    return template;
};

function sidebarClick (evt) {
    const channel = evt.target.innerText;
    document.querySelector('#chat-title').innerText = channel;
    showChat(channel);
};

function showChat(currentChannel) {
    const messageContainer = document.querySelector('#messages');
    messageContainer.innerHTML = '';
    const channelObj = messages.filter( channel => channel.channel == currentChannel );
    channelObj[0].messages.forEach(message => {
        const msgElem = messageTemplate(message);
        messageContainer.innerHTML += msgElem;
    });
};

function sendMessage(evt){
    evt.preventDefault();
    const currentChannel = document.querySelector('#chat-title').innerText;
    const user = 'ME';
    const message = document.querySelector('#newMessage').value;
    document.querySelector('#newMessage').value = '';
    if(message == '' || typeof message == 'undefined'){
        return;
    }
    const time = Date.now();
    const channelarr = messages.filter(channel => channel.channel == currentChannel);
    channelarr[0].messages.push({user: user, message: message, time: time});
    showChat(currentChannel);
};

function startVideoChat(evt) {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        .then(function(stream) {
            evt.target.setAttribute('display', 'hidden');
            videoSuccess
        }).catch(function(err) {
            console.log(err);
        });
};
function videoSuccess(stream) {
    const video = document.querySelector('#userVideo');
    window.stream = stream;
    if(window.url){
        video.src = window.URL.createObjectURL(stream);
    }
    else{
        video.src = stream;    
    }
}
// ###### EVENT LISTENERS ######

document.querySelectorAll('tr').forEach( item => {
    item.addEventListener('click', sidebarClick );
});
document.querySelector('#startVideoBtn').addEventListener('click', startVideoChat);

document.querySelector('#sendMessageForm').addEventListener('submit', sendMessage );
