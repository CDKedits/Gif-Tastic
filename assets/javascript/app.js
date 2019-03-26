// fetch(`http://api.giphy.com/v1/gifs/search?q=${animal}&limit=10&api_key=1oPtyo1in1NJiOUg24HKdYV5BMO9lJ5q`)

let toggle = false

const animalArr = [`cat`, `rabbit`, `turtle`, `dog`]

document.querySelector(`#submit`).addEventListener(`click`, function (event) {
  event.preventDefault()
  let search = document.querySelector(`#search-term`).value
  if (search.length > 0) {
    let newBtn = `${search}`
    console.log(newBtn)
    animalArr.push(newBtn)
    console.log(animalArr)
    addBtn()
    document.querySelector(`#search-term`).value = ``
    document.querySelector(`#error`).innerHTML = ``
  } else {
    document.querySelector(`#error`).innerHTML = ``
    let error = document.createElement(`p`)
    error.textContent = "Please enter a valid search term"
    document.querySelector(`#error`).append(error)
  }
})

const addBtn = () => {
  document.querySelector(`#buttons`).innerHTML = ``
  for (let i = 0; i < animalArr.length; i++) {
    let animalbtn = document.createElement(`button`);
    animalbtn.textContent = animalArr[i];
    animalbtn.className = `animal`;
    animalbtn.setAttribute(`data-animal`, `${animalArr[i]}`);
    document.querySelector(`#buttons`).append(animalbtn);
  }
}

addBtn()

document.addEventListener('click', e => {
  if (e.target.className === `animal`) {
    document.querySelector(`#gifDiv`).innerHTML = ``
    let animal = e.target.dataset.animal
    fetch(`http://api.giphy.com/v1/gifs/search?q=${animal}&limit=10&rating=g&api_key=1oPtyo1in1NJiOUg24HKdYV5BMO9lJ5q`)
      .then(r => r.json())
      .then(({ data }) => {
        data.forEach(gif => {
          let stop = gif.images.fixed_height_still.url
          let start = gif.images.fixed_height.url
          let gifImage = document.createElement(`img`)
          gifImage.setAttribute(`src`, stop)
          gifImage.setAttribute(`data-stop`, stop)
          gifImage.setAttribute(`data-start`, start)
          gifImage.className = `gif`
          let gifRating = document.createElement(`div`)
          gifRating.innerHTML = `Rating: ${gif.rating}`
          gifRating.className = `rating`
          document.querySelector(`#gifDiv`).append(gifImage)
          document.querySelector(`#gifDiv`).append(gifRating)
        })
      })
      .catch(e => console.error(e))
  } else if (e.target.className === `gif`) {
    toggle = !toggle
    let stop = e.target.dataset.stop
    let start = e.target.dataset.start
    if (toggle) {
      e.target.setAttribute(`src`, start)
    } else {
      e.target.setAttribute(`src`, stop)
    }
  }

})