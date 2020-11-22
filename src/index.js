document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector("#table-body")
    const form = document.querySelector("#dog-form")
    
    tableBody.addEventListener("click", event => {
        const dogInfo = event.target.parentElement.children
        if (event.target.tagName === "BUTTON") {
            form.name.value = dogInfo[0].textContent
            form.breed.value = dogInfo[1].textContent
            form.sex.value = dogInfo[2].textContent
            form.dataset.id = event.target.parentElement.dataset.id 
        }
    })

    form.addEventListener("submit", event => {
        event.preventDefault()
        const dogObj = {
            name: event.target.name.value,  
            breed: event.target.breed.value,
            sex: event.target.sex.value 
        }
        const dogId = event.target.dataset.id 
        updateDogFetchPatch(dogObj, dogId)
    })

    const dogsFetchGet = () => {
        tableBody.innerHTML = ""
        return fetch('http://localhost:3000/dogs')
            .then(resp => resp.json())
            .then(allDogs => renderAllDogs(allDogs))
    }

    const updateDogFetchPatch = (dog, id) => {
        return fetch(`http://localhost:3000/dogs/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dog)
        })
        .then(resp => resp.json())
        .then(updatedDog => dogsFetchGet())
    }
    // const dogTr = document.querySelector(`tr[data-id='${id}']`)
    // dogTr.children[0].textContent = updatedDog.name 
    // dogTr.children[1].textContent = updatedDog.breed 
    // dogTr.children[2].textContent = updatedDog.sex 

    const renderAllDogs = dogs => {
        dogs.forEach(dog => {
            renderOneDog(dog)
        })
    }
    const renderOneDog = dog => {
        const trDog = document.createElement("tr")
        trDog.dataset.id = dog.id 
        const tdName = document.createElement("td")
        tdName.textContent = dog.name 
        const tdBreed = document.createElement("td")
        tdBreed.textContent = dog.breed
        const tdSex = document.createElement("td")
        tdSex.textContent = dog.sex 
        const dogEditButton = document.createElement("button")
        dogEditButton.textContent = "Edit Dog"
        trDog.append(tdName, tdBreed, tdSex, dogEditButton)
        tableBody.append(trDog) 
    }

    const initialize = () => {
        dogsFetchGet()
    }
    initialize()
})