import {currentMovie} from './modal'
//********************************************
//Видалити цей об'єкт після злиття,
//його замінить об'єкт фільму
// let currentMovie = {
//     id: 3,
//     imgAddress: "Address123"
// };
//*******************************************
//console.log("currentMovie: " + currentMovie);
export const storageKeys = {
    watched: "WATCHED",
    queue: "QUEUE",
};
export const buttonStates = {
    on: "REMOVE FROM",
    off: "ADD TO"
}

export const addWatchedBtn = document.querySelector('.watched-btn');
export const addQueueBtn = document.querySelector('.queue-btn');
//addWatchedBtn.focus()
addWatchedBtn.addEventListener("click", onAddWatchedBtn);
addQueueBtn.addEventListener("click", onAddQueueBtn);

/**  Записує об'єкт фільму до localStorage
 * 
 * @param {*} key ключ
 * @param {*} movie об'єкт фільму
 * @returns нічого не повертає
 */
 function addMovieToStorage(key, movie, button){ 
    
    let storageMoviesStr;
    let movieStr;

    try {
        //console.log("currentMovie (modal): " + JSON.stringify(movie.id));
        storageMoviesStr = localStorage.getItem(key);
        movieStr = JSON.stringify([movie]);          

        if(!storageMoviesStr){

            localStorage.setItem(key, movieStr);
            button.textContent = buttonStates.on + " " + key; 
            button.classList.add('active');          
            return;
        }

        let storageMoviesObj = JSON.parse(storageMoviesStr);
        
        for(let i=0; i< storageMoviesObj.length; i++){
            if(storageMoviesObj[i].id === movie.id){
                
                storageMoviesObj.splice(i,1);
                localStorage.setItem(key, JSON.stringify(storageMoviesObj));
                button.textContent = buttonStates.off + " " + key;
                
                return;
            }
        }         
        
        storageMoviesObj.push(movie);        
        localStorage.setItem(key, JSON.stringify(storageMoviesObj));
        button.textContent = buttonStates.on + " " + key;        
    }
    catch(error){
        console.log("addMovieToStorage() error: ", error.message);
    }  
}

/** Обробка натискання "ADD TO WATCHED" */
function onAddWatchedBtn(event) {
       
    addMovieToStorage(storageKeys.watched, currentMovie, addWatchedBtn);
}

/** Обробка натискання "ADD TO QUEUE" */
function onAddQueueBtn(event) {

    addMovieToStorage(storageKeys.queue, currentMovie, addQueueBtn);    
}

/** Виконує пошук фільма в localStorage 
 * 
 * @param {*} movieID ідентифікатор фільма
 * @return повертає true якщо фільм знайдено
 */
export function storageHasMovie(storageKey, movieID){

    let storageMoviesStr;
    try{
        storageMoviesStr = localStorage.getItem(storageKey);
        
        let storageMoviesObj = JSON.parse(storageMoviesStr);
        
        for(let i = 0; i< storageMoviesObj.length; i++){
            if(storageMoviesObj[i].id === movieID){
                                
                return true;
            }
        }         
    }
    catch(error){
        console.log("storageHasMovie() error: " + error)
    }
    return false;
    
}

export function setButtonText(buttonElement, text){

        
    buttonElement.textContent = text;    
}


