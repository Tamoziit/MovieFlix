/*Getting info from Url*/
const url = new URL(location.href); //making an object for the current url. location.href - inbuilt func. that converts the url to string

const movieId = url.searchParams.get("id") //searching for id parameter in the url string

const movieTitle = url.searchParams.get("title") //searching for title parameter in the url string


const APILINK = 'https://reviewsapi.tamojitdas3.repl.co/api/v1/reviews/'; //linking our backend DB API.



const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle; //passing the title extracted from url to our webpage

/*A new approach to create HTML sequence by using .innerHTML func., without multiple .createElement(..) */
const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
          New Review
          <p><strong>Review: </strong>
            <input class="inputs" type="text" id="new_review" value="">
          </p>
          <p><strong>User: </strong>
            <input class="inputs" type="text" id="new_user" value="">
          </p>
          <p><a class="emoji" href="#" onclick="saveReview('new_review', 'new_user')">💾</a>
          </p>
      </div>
    </div>
  </div>
`
main.appendChild(div_new)

returnReviews(APILINK);

function returnReviews(url) { 
  fetch(url + "movie/" + movieId).then(res => res.json()) //passing response(res) by updating url with query parameter: movieId. N.B. for fetch(), default http method = GET
  .then(function(data){
    console.log(data);
    data.forEach(review => {
      const div_card = document.createElement('div');
      div_card.innerHTML = `
      <div class="row">
            <div class="column">
              <div class="card" id="${review._id}">
                <p><strong>Review: </strong>${review.review}</p>
                <p><strong>User: </strong>${review.user}</p>
                <p><a class="emoji" href="#"onclick="editReview('${review._id}','${review.review}', '${review.user}')">✏️</a> <a class="emoji" href="#" onclick="deleteReview('${review._id}')">🗑</a></p>
              </div>
            </div>
          </div>
        `
      main.appendChild(div_card);
    });
  });
}

function editReview(id, review, user) { 

  const element = document.getElementById(id); //getting access to the HTML element with id: id, i.e, one created above - <div class="card" id="${review._id}">
  const reviewInputId = "review" + id //creating separate ids for review & user.
  const userInputId = "user" + id

  element.innerHTML = `
              <p><strong>Review: </strong>
                <input class="inputs" type="text" id="${reviewInputId}" value="${review}">
              </p>
              <p><strong>User: </strong>
                <input class="inputs" type="text" id="${userInputId}" value="${user}">
              </p>
              <p><a class="emoji" href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">💾</a>
              </p>

  `
}

function saveReview(reviewInputId, userInputId, id="") { //id="", for new review not already present in the DB, when only 1st two parameters are passed {line no.: 24}
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  if (id) { //checking if id exists & not an empty string
    fetch(APILINK + id, { //fetch() - requests access to an url & gets back info
      method: 'PUT', //http method to perform the required saving function
      headers: { //creating key-value pairs for header obj
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json' //similar to curl commands
      },
      body: JSON.stringify({"user": user, "review": review}) //converting object to string
    }).then(res => res.json()) //converting result to .json file
      .then(res => {
        console.log(res)
        location.reload(); //js command to reload the website, with new edited data
      });        
  } else {
    fetch(APILINK + "new", { //new location for posting new reviews
      method: 'POST', //http method to add a review
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  }
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });    
}