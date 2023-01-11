(function () {

    var endPoint = "http://api.petfinder.com/";
    var options = "?key=374d96c4bbfa5df0916981a931411369&format=json&output=basic"
    var apiCall = (method, callback) => {
        fetch(endPoint + method + options).then(response => response.json())
            .then(data => {
                callback(data);
            });
    }

    var allPetData = {};

    var modal = document.getElementById('myModal');

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    var createPetRecord = (petData, iter) => {
        allPetData[petData.petfinder.pet.id.$t] = petData;
        var card = document.createElement('div');
        card.className = "card column";
        card.id = petData.petfinder.pet.id.$t;
        card.onclick = function () {
            modal.style.display = "block";
            document.getElementById('age').innerHTML = "Age : " + petData.petfinder.pet.age.$t;
            document.getElementById('animal').innerHTML = "Animal : " + petData.petfinder.pet.animal.$t;
            document.getElementById('breeds').innerHTML = "Breeds : " + petData.petfinder.pet.breeds.breed.$t;
            document.getElementById('contact_information').innerHTML = "Contact Information : " + petData.petfinder.pet.contact.email.$t;
            document.getElementById('sex').innerHTML = "Sex : " + petData.petfinder.pet.sex.$t;
            document.getElementById('size').innerHTML = "Size : " + petData.petfinder.pet.size.$t;
        }

        var image = document.createElement('img');
        image.alt = "Pet Image";
        image.className = "image";
        image.src = petData.petfinder.pet.media.photos.photo[2].$t;

        var containerDiv = document.createElement('div');
        containerDiv.className = "container";

        var heading = document.createElement('h4');
        if (petData.petfinder.pet.name.$t !== undefined) {
            heading.appendChild(document.createTextNode(petData.petfinder.pet.name.$t));
        }
        else {
            heading.appendChild(document.createTextNode("Name Not Found"));
        }

        var description = document.createElement('p');
        if (petData.petfinder.pet.description.$t !== undefined) {
            description.appendChild(document.createTextNode(petData.petfinder.pet.description.$t));
        }
        else {
            description.appendChild(document.createTextNode("No Description Found"));

        }

        containerDiv.appendChild(heading);
        containerDiv.appendChild(description);
        card.appendChild(image);
        card.appendChild(containerDiv);
        document.getElementById("app").appendChild(card);
    }

    var loopCount = 12;
    var iter = 0;
    for (iter = 0; iter < loopCount; iter++) {
        apiCall("pet.getRandom", function (data) {
            createPetRecord(data, iter);
        });
    }

    document.getElementById('openNav').addEventListener('click', function () {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementsByClassName("app").style.marginLeft = "250px";
    })

    document.getElementById('closeNav').addEventListener('click', function () {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("app").style.marginLeft = "0";
    })

    document.getElementById('applyFilters').addEventListener('click', function () {
        var selectedAge = document.getElementById('ageFilter').value;
        var pets = document.getElementsByClassName('card');
        for (var i = 0; i < pets.length; i++) {
            pets.item(i).style.display = "block";
            if ((allPetData[pets.item(i).id].petfinder.pet.age.$t).toLowerCase() !== selectedAge.toLowerCase()) {
                console.log(pets.item(i));
                pets.item(i).style.display = "none";
            }
        }
    })

    document.getElementById('removeFilters').addEventListener('click', function () {
        var pets = document.getElementsByClassName('card');
        for (var i = 0; i < pets.length; i++) {
            pets.item(i).style.display = "block";
        }
    })

    //Change currency

})();