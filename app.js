// creating our house class 
class House {
    constructor(name) {
        this.name = name;
        this.rooms = [];
    }
    // method to add room
    addRoom(name, area) {
        this.rooms.push(new Room(name,area));
    }
}
// creating room
class Room {
    constructor(name, area) {
        this.name = name;
        this.area = area;
    }
}

// creating how were sending our HTTP request
class HouseService {
    static url = 'https://ancient-taiga-31359.herokuapp.com/api/houses';
    // getting all the houses from our url
    static getAllHouses() {
        return $.get(this.url);
    }
    // specific house from the api
    static getHouse(id) {
        return $.get(this.url + `/${id}`);
    }
    // will take the house from our class House with name and rooms and post it to the API
    static createHouse(house){
        return $.post(this.url, house);
    }
    // update method that will take house from the API with certain id
    static updateHouse(house) {
        return $.ajax({
            url: this.url + `/${house._id}`, 
            dataTYpe: 'json',
            data: JSON.stringify(house),
            contentType: 'application/json',
            type: 'PUT'
        });
    }
    // deleting a house
    static deleteHouse(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}
// Render a DOM each time we create a new class
class DOMManager {
    // all the houses represented in the class
    static houses;

    static getAllHouses() {
        HouseService.getAllHouses()
        .then(houses => this.render(houses));
    }
    // creating a house
    static createHouse(name) {
        HouseService.createHouse(new House(name)) 
        .then(() => {
            return HouseService.getAllHouses();
        })
        .then((houses) => this.render(houses));
    }
    // deleting a house
    static deleteHouse(id) {
        HouseService.deleteHouse(id)
        .then(() => {
            return HouseService.getAllHouses();
        })
        .then((houses) => this.render(houses));
    }
    static addRoom(id) {
        for(let house of this.houses) {
            if(house._id == id) {
                house.rooms.push(new Room($(`#${house._id}-room-name`).val(),$(`#${house._id}-room-area`).val()));
                HouseService.updateHouse(house)
                .then(() => {
                    return HouseService.getAllHouses();
                })
                .then((houses) => this.render(houses));
            }
        }
    }


    // houses is passed in and that will be render to the page
    static render(houses) {
        this.houses = houses;
        $('#app').empty();
        for (let house of houses) {
            $('#app').prepend(
                `
                <div id="${house._id}" class="card">
                    <div class="card-header">
                        <h2>${house.name}</h2>
                        <button class="btn btn-danger" onclick="DOMManager.deleteHouse('${house._id}')">Delete</button>
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                    <input type="text" id="${house._id}-room-name" class="form-control" placeholder="Room Name">
                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${house._id}-room-area" class="form-control" placeholder="Room Area">
                                </div>
                            </div>
                            <button id="${house._id}-new-room" onclick="DOMManager.addRoom('${house._id}')" class="btn btn-primary form-control">Add</button>
                        </div>
                    </div>
                </div><br>`  ,
            );
            for(let room of house.rooms) {
                $(`#${house._id}`)
                .find('.card-body')
                .append(
                `<p>
                    <span id="name-${room._id}"><strong>Name: </strong> ${room.name}</span
                    <span id="name-${room._id}"><strong>Name: </strong> ${room.area}</span
                    <button class="btn btn-danger" onclick="DOMManager.deleteRoom('${house._id}', '${room._id}')">Delete Room</button>
                </p>`
                );
            }
        }
    }
    
}

//Creating a new house on click
$('#create-new-house').click(() => {
    DOMManager.createHouse($('#new-house-name').val());
    $('#new-house-name').val('');
});
// Test to get all the houses
DOMManager.getAllHouses();

