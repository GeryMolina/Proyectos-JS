//Variables
const listTweets = document.getElementById('lista-tweets');

//Event Listener
eventListener();

function eventListener() {
    //cuando se envía el formulario
    document.querySelector('#formulario').addEventListener('submit', addTweet)
    // borrar tweet
    listTweets.addEventListener('click', removeTweet)

    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageOK)
};

//Function

//añadir Tweet.
function addTweet(e) {
    e.preventDefault();
    //leer valor de text area
    const tweet = document.getElementById('tweet').value;
    //localStorage.setItem('list', tweet)


    //añadir a local storage
    addTweetLocalStorage(tweet);
}

//Mostrar datos de Local Storage en la lista
function localStorageOK() {
    let tweets;
    tweets = getTweetsLocalStorage();
    tweets.forEach(function (tweet) {
        //crear btn de eliminar 
        const btnRemove = document.createElement('a');
        btnRemove.classList = 'borrar-tweet';
        btnRemove.innerText = 'X';

        //crear elemento
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade el btn de borrar el tweet
        li.appendChild(btnRemove)
        //añade tweet a la lista 
        listTweets.appendChild(li);
    })

}

//borrar tweet 

function removeTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        removeTweetLocalStorage(e.target.parentElement.innerText)
    }
}
//tweet a local storage

function addTweetLocalStorage(tweet) {
    let tweets;
    tweets = getTweetsLocalStorage();
    //añadir nuevo tweet
    tweets.push(tweet);
    //convertir de string a arrrglo en Local storage
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//comprueba que haya elementos en Local Storage, retorna un arreglo
function getTweetsLocalStorage() {
    let tweets;
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets
}
//Eliminar tweet local storage
function removeTweetLocalStorage(tweet){
    let tweets, tweetRemove;
    //elimina la X del tweets
    tweetRemove = tweet.substring(0, tweet.length -1);
    tweets = getTweetsLocalStorage();
    tweets.forEach(function(tweet, index){
        if(tweetRemove === tweet){
            tweets.splice(index, 1)
        }
    })
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
