//Inicial Values
const API_KEY = '79b47b23ca612a186d057b1c035b2473';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=79b47b23ca612a186d057b1c035b2473';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

//selecting elements from the dom
const buttonElement = document.querySelector('#searchpes');
const inputElement = document.querySelector('#inputValuepes'); 
const moviesSearchable = document.querySelector('#movies-searchable');

//gerar url
function generateUrl(path){
    const url =`https://api.themoviedb.org/3${path}?api_key=79b47b23ca612a186d057b1c035b2473`
    return url;
}


//criar a section de filmes
function movieSection(movies){
    return movies.map((movie,index)=>{
        const url2 = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=79b47b23ca612a186d057b1c035b2473`;
        console.log('URL2: ',url2);
        
        if(movie.poster_path){
            return `
            <div class= "boxfilme">
                <div class= "containerImg">
                    <img 
                        src=${IMAGE_URL + movie.poster_path} 
                        data-movie-id=${movie.id}
                    />
                </div>
                <div class="containerInfos">
                    <h2>
                        <b>${movie.title}</b>
                    </h2>
                    <p>
                        <b>Sinopse:</b> ${movie.overview}
                    </p>
                    <p>
                        <b>Data de Lançamento:</b> ${movie.release_date}
                    </p>
                    <p>
                        <b>Media de Votos:</b> ${movie.vote_average} | <b>Contagem de Votos:</b> ${movie.vote_count}
                    </p>
                    <button type="button" class="btn btn-light">
                        <a target="_blank" href="https://www.themoviedb.org/movie/${movie.id}?language=pt-BR">Leia Mais</a>
                    </button>
                </div>
            </div>`;
        }

    })
}
function createMovieContainer(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');
    console.log(movies);
    const movieTemplate = `
        <section class="searchSection" id="searchSection">
            ${movieSection(movies)}
        </section>
    `;
    movieElement.innerHTML = movieTemplate;
    return movieElement;
}
 //procurar o filme
function renderSearchMovies(data){
    //data.results[]
    moviesSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    moviesSearchable.appendChild(movieBlock);
    console.log('Data: ',data);
    console.log('data.results: ',movies);
}

//botão de pesquisar

buttonElement.onclick = function(event){
    event.preventDefault();
    const value = inputElement.value;
    const path = '/search/movie';
    const newUrl = generateUrl(path) + '&query=' + value;
    fetch(newUrl)
        .then((res)=>res.json())
        .then(renderSearchMovies)
        .catch((error)=>{
            console.log('Erro: ', error);
        });

        inputElement.value = '';
    console.log('Value: ', value);
    console.log('Url: ',newUrl);
}
