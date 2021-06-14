console.log("Hello");
// events?event_category=ALL_EVENTS&event_sub_category=Upcoming&page=1
const mainUrl = `https://www.getpostman.com/collections/9c0340a9587dc4823aa9`;
const url2 = `https://api.codingninjas.com/api/v3/events`;
const eventTags = `https://api.codingninjas.com/api/v3/event_tags`;
window.onload = function () {
  fetch(eventTags)
    .then((res) => res.json())
    .then((data) => {
      let str = ``;
      data.data.tags.forEach((el) => {
        str += `<li class ="list-group-item"><button class="btn btn-light">${el}</button> </li>`;
      });
      document.getElementById("Tags").innerHTML = str;
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
              <p class="card-text col-lg-4">${
                Date(el.event_start_time).split("GMT")[0]
              }</p>
              <p class="card-text col-lg-4">${el.fees}</p>
              <p class="card-text col-lg-4">${el.venue}</p>
        </div>
        <p class="card-text">${el.short_desc}</p>
        <div class ="row">
        <div class="col-lg-8"></div>
        <a href="" class="col-lg-4 btn btn-primary">Register Now</a>
              </div>
        </div>
</div>
            `;
  });
  str += `</div>
      </div>`;
  document.getElementById("main-content").innerHTML = str;
};
