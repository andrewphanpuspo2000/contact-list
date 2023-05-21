// work flwo
// 1. fetch user from API
//2. store those user in global array
//3. display user in the UI
//promise is order wait and take
//await is order directly making and take the order
let userList = [];
const apiEP = "https://randomuser.me/api?";

const fetchUsers = async (path = "results=20") => {
  //promise
  //   const user = fetch(apiEP)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       userList = data.results;
  //       console.log(data);
  //     });
  //  async/await

  const response = await fetch(apiEP + path);
  const data = await response.json();
  userList = data.results;
  displayUser(userList);
  console.log(data.results);
};

fetchUsers();

const displayUser = (displaArg) => {
  let idCard = document.getElementById("cardList");
  let str = "";
  let numberDisplay = document.getElementById("count");
  displaArg.forEach((user, i) => {
    str += `
       <div class="card" style="width: 18rem;">
      <img src="${user.picture.large}" class="card-img-top" alt="myPicture">
      <div class="card-body">
        <h5 class="card-title">${user.name.title} ${user.name.first} ${user.name.last}</h5>
        <div><i class="fa-solid fa-envelope"></i> ${user.email}</div>       
        <div><i class="fa-solid fa-house"></i> ${user.location.city} ${user.location.country} ${user.location.street.number} ${user.location.street.name}</div>       
      </div>
      <a class="d-grid">
      <button class="btn btn-primary">
      <i class="fa-solid fa-phone"></i> ${user.phone}
      </button>
      </a>
    </div>`;
  });
  idCard.innerHTML = str;
  numberDisplay.innerText = displaArg.length;
};

document.getElementById("select").addEventListener("change", (e) => {
  const { value } = e.target;
  let path = `results=20&gender=${value}`;
  //   const getInputFl = document.getElementById("search-input");
  //   getInputFl.target.value = "";
  fetchUsers(path);
});

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const { value } = e.target;
  const filterKey = userList.filter((item) => {
    const first = item.name.first;
    const last = item.name.last;
    const fullName = first + " " + last;

    return fullName.toLowerCase().includes(value);
  });

  displayUser(filterKey);
});
