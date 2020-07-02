// menue 

let leftMenu=$(".leftMenu");
let rightMenu=$(".rightMenu");
let menu =$("#triggle");
let menu_item =$(".nav-item li ");



menu.click(function(){
     
    let width= leftMenu.outerWidth();
    if (menu.attr("class")== "open")
    {
        menu.addClass("close").removeClass("open")
        leftMenu.animate({"left":"0px"},1000);
        rightMenu.animate({"left":`${width}`},1000)
        for(let i=1 ; i<=menu_item.length; i++)
        {
            $(`.item${i}`).animate({"paddingTop": "25px", "opacity":"1"}, i*100+1000)
        }
    }
    else
    {
        menu.addClass("open").removeClass("close")
        leftMenu.animate({"left":`-${width}`},1000);
        rightMenu.animate({"left":`0px`},1000)
    }
})

let allMovies;
let moviesContainer = document.getElementById("movies-container")
let search = document.getElementById("search")
let searchResult = document.getElementById("searchResult")
let searchByWord = document.getElementById("searchByWord")
let imgPath = 'https://image.tmdb.org/t/p/w500'
function getmovies(){

    let req = new XMLHttpRequest();

    req.open("Get","https://api.themoviedb.org/3/movie/upcoming?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&page=1")
    req.send();
    req.onreadystatechange=function(){
        if(req.readyState==4 && req.status==200)
        {
           allMovies= JSON.parse(req.response).results;
           displayData()
            
        }
    }

}

getmovies()

function displayData()
{
    let temp = "";
    for(let i=0; i<allMovies.length;i++)
    {
        temp+=`  <div class="col-md-4 mb-5">
        <div class="movie-item">
            <img src="${imgPath+allMovies[i].poster_path}" class="img-fluid">
            <div class="layer">
                <h3>${allMovies[i].title}</h3>
                <p> ${allMovies[i].overview}</p>
                <p>${allMovies[i].vote_average}</p>
                <p>${allMovies[i].release_date}</p>
            </div>
        </div>
    </div>
`
    }
    moviesContainer.innerHTML=temp
}


search.onkeyup=function()
{
    let word = search.value ;
    searchInMovie(word)
}

function searchInMovie (word)
{
    let content = "";
    if (word=="")
    {
        return false ;
    }
    for(let i=0 ; i<allMovies.length; i++)
    {
        if(allMovies[i].title.toLowerCase().includes(word.toLowerCase())==true)
        {
            content += `  <div class="col-md-4 mb-5">
            <div class="movie-item">
                <img src="${imgPath+allMovies[i].poster_path}" class="img-fluid">
                <div class="layer">
                    <h3>${allMovies[i].title}</h3>
                    <p> ${allMovies[i].overview}</p>
                    <p>${allMovies[i].vote_average}</p>
                    <p>${allMovies[i].release_date}</p>
                </div>
            </div>
        </div>
    `
        }
    }

    searchResult.innerHTML=content ;
}

function searchByword(test)
{
    let req = new XMLHttpRequest();

    req.open("Get","https://api.themoviedb.org/3/search/movie?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&query=${text}&page=1&include_adult=false")
    req.send();
    req.onreadystatechange=function(){
        if(req.readyState==4 && req.status==200)
        {
           allMovies= JSON.parse(req.response).results;
           displayData()
            
        }
    }
}