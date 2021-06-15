const url2 = `https://api.codingninjas.com/api/v3/events`;
const eventTags = `https://api.codingninjas.com/api/v3/event_tags`;
window.onload = function () {
  fetch(eventTags)
    .then((res) => res.json())
    .then((data) => {
      let currentTags = data.data.tags.slice(0, 10);
      getTags(currentTags);
      document
        .getElementById("showMoreBtn")
        .addEventListener("click", function () {
          getTags(data.data.tags);
          this.classList.add("hide");
        });
    });
  fetch(
    `${url2}/?event_category=ALL_EVENTS&event_sub_category=Upcoming&tag_list=&offset=1`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data.events);
      getCardsArray(data.data.events);
    });
};
getCardsArray = (arr) => {
  let str = `<div class ="card-deck" >
      <div class = "row" >`;
  arr.forEach((el) => {
    var d = new Date();
    d.setUTCSeconds(el.event_start_time);
    console.log(d);
    str += `
            <div class=" p-4 card col-lg-6"> 
    <img class="card-img-top" src="${el.cover_picture}" alt="Card image cap">
     <div class="card-body">
        <h5 class="card-title">${el.name}</h5>
        <div class = "row">
         <p class="col-lg-4 card-text"><small class="text-muted">Starts On </small></p>
         <p class="col-lg-4 card-text"><small class="text-muted">Entry Fee</small></p>
         <p class="col-lg-4 card-text"><small class="text-muted">Venue </small></p>
        </div>
        <div class="row">
              <p class="card-text col-lg-4">${d.toString().split("GMT")[0]}</p>
              <p class="card-text col-lg-4">${el.fees}</p>
              <p class="card-text col-lg-4">${el.venue}</p>
        </div>
        <p class="card-text">${el.short_desc}</p>
        <div class ="row">
        <div class="col-lg-8">
        ${getUserListOnCard(el.registered_users)}
        </div>
        <a href="" class="
         col-lg-4 btn btn-primary">Register Now</a>
              </div>
${el.registered_users.other_users_count}  Registered
        </div>
        <div class = "row "></div>
</div>`;
  });
  str += `</div>
      </div>`;
  document.getElementById("main-content").innerHTML = str;
};
getUserListOnCard = (arr) => {
  let str = ``;
  arr.top_users.forEach((el) => {
    str += `<img class="avatar" src ="${el.image_url}" >`;
  });
  return str;
};
const getTags = (arr) => {
  let str = ``;
  arr.forEach((el) => {
    str += `<li class ="list-group-item"><a class="btn btn-light" value="${el}">${el}</a> </li>`;
  });
  document.getElementById("Tags").innerHTML = str;
};
let currURL = `${url2}/?event_category=ALL_EVENT&event_sub_category=Upcoming&tag_list=&offset=1`;
document.getElementById("EventsDiv").addEventListener("click", (evt) => {
  const clicked = evt.target.getAttribute("value");
  currURL = `${url2}/?event_category=${clicked}&event_sub_category=Upcoming&tag_list=&offset=1`;
  fetch(currURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data.events);
      getCardsArray(data.data.events);
    });
});
document.getElementById("timeframe").addEventListener("click", (evt) => {
  const clicked = evt.target.getAttribute("value");
  console.log(clicked);
  let arr = currURL.split("&");

  console.log(arr);
  let givenUrl = `${arr[0]}&event_sub_category=${clicked}&${arr[2]}&${arr[3]}`;
  currURL = givenUrl;
  fetch(currURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data.events);
      getCardsArray(data.data.events);
    });
});
let selectedCategories = [];
document.getElementById("Tags").addEventListener("click", (evt) => {
  console.log("Tags Pane Clicked");
  let arr = currURL.split("&");
  evt.target.classList.add("btn-dark");
  selectedCategories.push(evt.target.getAttribute("value"));
  let tagsStr = `tag_list=`;
  selectedCategories.forEach((el) => {
    tagsStr += `${el.replace(" ", "%20")},`;
  });
  tagsStr += `&`;
  currURL = `${arr[0]}&${arr[1]}&${tagsStr}${arr[3]}`;
  console.log(tagsStr);
  console.log(currURL);
  fetch(currURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data.events);
      getCardsArray(data.data.events);
    });
});
