!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},a=e.parcelRequire4383;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in o){var a=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,a.call(r.exports,r,r.exports),r.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){o[e]=t},e.parcelRequire4383=a);var r=a("6MX1w"),n=a("jzQFI");r=a("6MX1w");a("fDiVl"),console.log("START");var d={btnWatched:document.querySelector(".watched"),btnQueue:document.querySelector(".queue"),libraryGallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),noItemsImg:document.querySelector(".library__no-items")};d.loader.classList.add("is-hidden");var l="empty",c="",i="";function s(){document.querySelector(".backdrop").style.display="none",document.querySelector("body").style.overflowY="visible",console.log("currentState при закрытии модалки->",l),function(){switch(l){case"watched":c=JSON.parse(localStorage.getItem("WATCHED")),(0,r.default)(c);break;case"queue":i=JSON.parse(localStorage.getItem("QUEUE")),(0,r.default)(i)}}()}localStorage.getItem("WATCHED")&&(c=JSON.parse(localStorage.getItem("WATCHED")),console.log("watchedMovies :>> ",c.length),c.length&&(l="watched",d.loader.classList.add("is-hidden"),(0,r.default)(c),d.btnQueue.classList.remove("library-header__button--active"),d.btnWatched.classList.add("library-header__button--active"))),localStorage.getItem("QUEUE")&&(i=JSON.parse(localStorage.getItem("QUEUE"))).length&&(l="queue",d.loader.classList.add("is-hidden"),(0,r.default)(i),d.btnWatched.classList.remove("library-header__button--active"),d.btnQueue.classList.add("library-header__button--active")),"empty"===l&&(d.btnQueue.disabled=!0,d.btnWatched.disabled=!0,d.noItemsImg.style.display="block"),d.btnWatched.addEventListener("click",(function(e){e.preventDefault(),console.log(e),e.target.classList.contains("watched")&&(d.btnQueue.classList.remove("library-header__button--active"),d.btnWatched.classList.add("library-header__button--active"));l="watched",console.log("watchedMovies :>> ",c);var t=c.length,o=Math.ceil(t/10);console.log("totalPages :>> ",o),(0,r.default)(c),d.loader.classList.add("is-hidden")})),d.btnQueue.addEventListener("click",(function(e){e.preventDefault(),e.target.classList.contains("queue")&&(d.btnWatched.classList.remove("library-header__button--active"),d.btnQueue.classList.add("library-header__button--active"));l="queue",(0,r.default)(i),d.loader.classList.add("is-hidden")})),document.querySelector(".modal__close").addEventListener("click",s),CURRENTSTATE=l.toUpperCase(),console.log("currentState==",CURRENTSTATE),document.querySelector(".gallery").addEventListener("click",(function(e){var t=e.target;if(t.closest(".card")){var o=t.closest(".card").getAttribute("movie-id"),a=JSON.parse(localStorage.getItem(CURRENTSTATE)).find((function(e){if(Number(o)===e.id)return!0}));currentMovie=a,document.querySelector(".content-card__img>img").setAttribute("src","https://image.tmdb.org/t/p/w500"+a.poster_path),document.querySelector(".content-card__title").innerText=a.title,document.querySelector(".content-card__about-text").innerText=a.overview,document.querySelector(".modal__movie-bord").innerText=a.vote_average.toFixed(1),document.querySelector(".modal__movie-number").innerText=a.vote_count,document.querySelector(".modal__movie-popularity").innerText=a.popularity.toFixed(1),document.querySelector(".modal__movie-original").innerText=a.original_title,document.querySelector(".modal__movie-genres").innerText=(0,r.default)(a.genre_ids),function(){document.querySelector(".backdrop").style.display="block",document.querySelector("body").style.overflowY="hidden",(0,n.storageHasMovie)(n.storageKeys.watched,currentMovie.id)?n.addWatchedBtn.textContent=n.buttonStates.on+" "+n.storageKeys.watched:n.addWatchedBtn.textContent=n.buttonStates.off+" "+n.storageKeys.watched;(0,n.storageHasMovie)(n.storageKeys.queue,currentMovie.id)?n.addQueueBtn.textContent=n.buttonStates.on+" "+n.storageKeys.queue:n.addQueueBtn.textContent=n.buttonStates.off+" "+n.storageKeys.queue}()}})),window.addEventListener("click",(function(e){e.target===document.querySelector(".backdrop")&&s()})),window.addEventListener("keydown",(function(e){27===e.keyCode&&s()}))}();
//# sourceMappingURL=library.0cae30ec.js.map