const dataList = [];
let cardList = "";
let modalList = "";
let listGroup = "";
let elementsList = "";

fetch(
  `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${marvel.apiKeyPublic}&hash=${marvel.apiHash}`
)
  .then((response) => response.json())
  .then((json) => {
    for (let item of json.data.results) {
      let data = {
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.thumbnail.path + "." + item.thumbnail.extension,
        comics: item.comics.items,
      };
      dataList.push(data);
      createCard(data.id, data.name, data.description, data.image);
      createModal(data.id, data.name, data.comics);
    }
  });

let createCard = (id, name, description, image) => {
  let card = `
        <div class="col"> 
          <div class="card h-75">
            <img src="${image}" class="card-img-top h-50" alt="${name}" style="object-fit: cover;">
            <div class="card-body overflow-auto">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${description}</p>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#id${id}">
              Comics
              </button>
            </div>
          </div>
        </div>
        `;
  cardList = document.getElementById("card-list");
  cardList.innerHTML += card;
};

let createModal = (id, name, comics) => {
  let modal = `
        <div class="modal fade" id="id${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <ul class="list-group" id="list-group${id}">           
                  </ul>
                  </div>
              </div>
          </div>
        </div>
        `;
  modalList = document.getElementById("container");
  modalList.innerHTML += modal;

  for (let element of comics) {
    elementsList = "";
    elementsList = `<li class="list-group-item">${element.name}</li>`;
    listGroup = document.getElementById(`list-group${id}`);
    listGroup.innerHTML += elementsList;
  }
};
