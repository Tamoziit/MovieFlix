const APILINK='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=717b10feb5790d15faf1ad335880f0d2&page=1';
const IMG_PATH='https://image.tmdb.org/t/p/w1280';
const SEARCHAPI='https://api.themoviedb.org/3/search/movie?&api_key=717b10feb5790d15faf1ad335880f0d2&query=';

const main=document.getElementById("section");
const form=document.getElementById("form");
const search=document.getElementById("query");

returnMovies(APILINK); //calling returnMovies() method with APILINK as parameter. It also previews a few movie posters on our webpage even before searching.
function returnMovies(url)
{
  fetch(url).then(res => res.json()) //passing response(res)
  .then(function(data){
    console.log(data.results);
    data.results.forEach(element=>{ //creating html tags for each relevant search result(element) from the Database
      const div_card=document.createElement('div');//creating <div> tag in html
      div_card.setAttribute('class', 'card'); //creating attributes for the <div> tag, i.e. class="card".
      
      const div_row=document.createElement('div');
      div_row.setAttribute('class', 'row');
      
      const div_column=document.createElement('div');
      div_column.setAttribute('class', 'column');
      
      const image=document.createElement('img');//creating <img> tag in html
      image.setAttribute('class', 'thumbnail');
      image.setAttribute('id', 'image'); //<img id="image">
      
      const title=document.createElement('h3');//creating <h3> tag in html
      title.setAttribute('id', 'title');
      
      const center=document.createElement('center');
      

      title.innerHTML=`${element.title}<br><a class="reviews" href="movie.html?id=${element.id}&title=${element.title}">Reviews</a>`; //whenever a relevant result is found acc. to the search, by the API; it returns the movie name in title. .innerHTML function helps to display the movie name stored in title for each element(element.title) inside the <h3> tag associated with const 'title'. <a> - Linking the cards to reviews page. 
      
      image.src=IMG_PATH + element.poster_path; //adding the relevant poster path from search results for each element to the specified IMG_PATH, and passing it to src of <img> tag.

      center.appendChild(image); //.appendChild :- adds an element under another element.
      div_card.appendChild(center);
      div_card.appendChild(title);
      div_column.appendChild(div_card);
      div_row.appendChild(div_column);
      main.appendChild(div_row);
      /* This sequence of .appendChild() made a tree as:
         <section>(main parent)
         --->(under) <div class="div_row">
                ---> <div class="div_column">
                    ---> <div class="div_card">
                       ---> <title> , <center> (2 childs of div_card) */
                          
    });    
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); //removes default item set in html
  main.innerHTML=''; //updating search section
  const searchItem=search.value;
  if(searchItem)
  {
    returnMovies(SEARCHAPI + searchItem); //calling returnMovies(...) with searched value & api db.
    search.value=""; //updating search status to default
  }
});