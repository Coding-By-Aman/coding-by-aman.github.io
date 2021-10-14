if (localStorage == "NULL") localStorage.setItem("theme", "light");
const theme = document.getElementById('changeTheme')
const app = document.getElementById('root')
const container = document.createElement('div')
container.setAttribute('class', 'container')
container.setAttribute('id', 'countries')
app.appendChild(container)

document.addEventListener("DOMContentLoaded", function (event) {
    fetchAllCountries();
    filterByRegion();
})

function fetchAllCountries() {
    var request = new XMLHttpRequest()
    request.open('GET', 'https://restcountries.com/v2/all', true)
    loadData(request);
    request.send()
}

function searchForCountry() {
    let countryName = document.getElementById("search-input").value
    if (countryName == "" || countryName == null)
        fetchAllCountries();
    else {
        var request = new XMLHttpRequest()
        request.open('GET', 'https://restcountries.com/v2/name/' + countryName, true)
        loadData(request)
        request.send()
    }
}

function loadData(request) {
    request.onload = function () {
        document.getElementById("countries").innerHTML = "";
        // Begin accessing JSON data here
        var response = this.response;
        if (this.response == "" || this.response == null)
            fetchAllCountries();
        else {
            var data = JSON.parse(this.response)
            if (request.status >= 200 && request.status < 400) {
                data.forEach((country) => {
                    const card = document.createElement('div')
                    card.setAttribute('class', 'card')
                    card.onclick = function () {
                        document.getElementById("root").innerHTML = ""
                        countryInfo(country)
                    };
                    const h4 = document.createElement('h4')
                    h4.setAttribute('class', 'about')
                    h4.textContent = country.name
                    const img = document.createElement('img')
                    img.setAttribute('class', 'img')
                    img.src = country.flag
                    const population = document.createElement('h5')
                    population.textContent = `Population: ${country.population}`
                    const region = document.createElement('h5')
                    region.textContent = `Region: ${country.region}`
                    const capital = document.createElement('h5')
                    capital.textContent = `Capital: ${country.capital}`
                    population.setAttribute('class', 'about')
                    region.setAttribute('class', 'about')
                    capital.setAttribute('class', 'about')
                    container.appendChild(card)
                    card.appendChild(img)
                    card.appendChild(h4)
                    card.appendChild(population)
                    card.appendChild(region)
                    card.appendChild(capital)
                })
                if (localStorage.getItem("theme") == "light") {
                    changeTheme("light");
                    theme.setAttribute('onclick', 'changeTheme("dark")')
                } else {
                    changeTheme("dark");
                    theme.setAttribute('onclick', 'changeTheme("light")')
                }
            } else {
                const errorMessage = document.createElement('marquee')
                errorMessage.textContent = `Something's Wrong`
            }
        }
    }
}

function filterByRegion() {
    let regionName = document.getElementById("region").value
    if (regionName == "" || regionName == null || regionName == "filter") {
        fetchAllCountries();
    }
    else {
        var request = new XMLHttpRequest()
        request.open('GET', 'https://restcountries.com/v2/region/' + regionName, true)
        loadData(request)
        request.send()
    }
}

function countryInfo(country) {
    const back = document.getElementById('back')
    back.classList.remove("hidden")
    const countryDiv = document.getElementById('root')
    countryDiv.setAttribute('class', 'marg')
    const img = document.createElement('img')
    img.setAttribute('class', 'img-small')
    img.src = country.flag
    countryDiv.appendChild(img)
    const details = document.createElement('div')
    details.setAttribute('class', 'details')
    details.setAttribute('id', 'details')
    const h3 = document.createElement('h3')
    h3.setAttribute('class', 'about')
    h3.textContent = country.name
    details.appendChild(h3)

    const aboutThis = document.createElement('div')
    aboutThis.setAttribute('class', 'about-this')

    const listLeft = document.createElement("div")
    listLeft.setAttribute('class', 'list-left')
    const listRight = document.createElement("div")
    listRight.setAttribute('class', 'list-right')

    var list = document.createElement('h5')
    list.textContent = `Native Name: ${country.nativeName}`
    listLeft.appendChild(list)

    list = document.createElement('h5')
    list.textcontent = `Population: ${country.population}`
    listLeft.appendChild(list)

    list = document.createElement('h5')
    list.textContent = `Region: ${country.region}`
    listLeft.appendChild(list)

    list = document.createElement('h5')
    list.textContent = `Sub Region: ${country.subregion}`
    listLeft.appendChild(list)

    list = document.createElement('h5')
    list.textContent = `Capital: ${country.capital}`
    listLeft.appendChild(list)

    list = document.createElement('h5')
    list.textContent = `Top Level Domain: ${country.topLevelDomain}`
    listRight.appendChild(list)
    list = document.createElement('h5')
    list.textContent = `Currencies: ${country.currencies[0]["name"]}`
    listRight.appendChild(list)
    list = document.createElement('h5')
    list.textContent = `Languages: ${country.languages[0]["name"]}`
    listRight.appendChild(list)

    aboutThis.appendChild(listLeft)
    aboutThis.appendChild(listRight)

    details.appendChild(aboutThis)
    console.log(country.borders)
    if (typeof country.borders !== "undefined") {
    const borders = document.createElement("h5")
    borders.textContent = `Border Countries: `
    var borderCountries = []
    if (country.borders.length == 0) {
        var noBorders = document.createElement("b")
        noBorders.textContent = `N/A`
        borders.appendChild(noBorders)
    }
    else {
        for (var i = 0; i < country.borders.length; i++) {
            var request = new XMLHttpRequest()
            request.open('GET', 'https://restcountries.com/v2/alpha/' + country.borders[i], true)
            request.onload = function () {
                var country = JSON.parse(this.response);

                var displayBox = document.createElement("button");
                displayBox.setAttribute('class', 'borders')
                displayBox.style.visibility = 'hidden';
                displayBox.innerHTML = country.name + "  "
                displayBox.onclick = function () {
                    document.getElementById("root").innerHTML = ""
                    countryInfo(country)
                };
                borders.appendChild(displayBox)
            }
            request.send()
        }
    }
    details.appendChild(borders);
   }
    countryDiv.appendChild(details);
    if (localStorage.getItem("theme") == "light") {
        changeDetailedTheme("light");
        theme.setAttribute('onclick', 'changeDetailedTheme("dark")')
    } else {
        changeDetailedTheme("dark");
        theme.setAttribute('onclick', 'changeDetailedTheme("light")')
    }
}

function changeTheme(to_theme) {
    if (to_theme == "dark") {
        document.getElementById("body").style.background = "hsl(207, 26%, 17%)";
        document.getElementById("head-content").style.background = "hsl(209, 23%, 22%)";
        document.getElementById("search-icon").style.background = "hsl(209, 23%, 22%)";
        document.getElementById("search-text").style.background = "hsl(209, 23%, 22%)";
        document.getElementById("region").style.background = "hsl(209, 23%, 22%)";
        var ele = document.getElementsByClassName("card")
        for (var i = 0; i < ele.length; i++) {
            ele[i].style.background = "hsl(209, 23%, 22%)";
        }
        var ele = document.getElementsByClassName("about")
        for (var i = 0; i < ele.length; i++) {
            ele[i].style.color = "hsl(0, 0%, 100%)";
        }
        var ele = document.getElementsByClassName('text');
        for (var i = 0; i < ele.length; i++) {
            ele[i].style.color = "hsl(0, 0%, 100%)";
        }
        document.getElementById("moon").classList.remove('far');
        document.getElementById("moon").classList.add('fas');
        localStorage.setItem("theme", "dark");
        theme.setAttribute('onclick', 'changeTheme("light")');
    }
    else {
        document.getElementById("body").style.background = "hsl(0, 0%, 98%)";
        document.getElementById("head-content").style.background = "hsl(0, 0%, 100%)";
        document.getElementById("search-icon").style.background = "hsl(0, 0%, 100%)";
        document.getElementById("search-text").style.background = "hsl(0, 0%, 100%)";
        document.getElementById("region").style.background = "hsl(0, 0%, 100%)";
        var ele = document.getElementsByClassName("card")
        for (var i = 0; i < ele.length; i++) {
            ele[i].style.background = "hsl(0, 0%, 100%)";
        }
        var ele = document.getElementsByClassName("about")
        for (var i = 0; i < ele.length; i++) {
            ele[i].style.color = "hsl(200, 15%, 8%)";
        }
        var ele = document.getElementsByClassName('text');
        for (var i = 0; i < ele.length; i++) {
            ele[i].style.color = "hsl(200, 15%, 8%)";
        }
        document.getElementById("moon").classList.remove('fas');
        document.getElementById("moon").classList.add('far');
        localStorage.setItem("theme", "light");
        theme.setAttribute('onclick', 'changeTheme("dark")');
    }
}

function changeDetailedTheme(to_theme) {
    if (to_theme == "dark") {
        document.getElementById("body").style.background = "hsl(207, 26%, 17%)";
        document.getElementById("head-content").style.background = "hsl(209, 23%, 22%)";
        document.getElementById("root").style.color = "hsl(0, 0%, 100%)";
        document.getElementById("go-back").style.background = "hsl(209, 23%, 22%)";
        document.getElementById("go-back").style.color = "hsl(0, 0%, 100%)";
        document.getElementById("moon").classList.remove('far');
        document.getElementById("moon").classList.add('fas');
        var ele = document.getElementsByClassName('text');
        for (var i = 0; i < ele.length; i++) {
            ele[i].style.color = "hsl(0, 0%, 100%)";
        }
        var ele = document.getElementsByClassName('borders');
        setTimeout(function () {
            for (var i = 0; i < ele.length; i++) {
                ele[i].style.background = "hsl(209, 23%, 22%)";
                ele[i].style.color = "hsl(0, 0%, 100%)";
                ele[i].style.visibility = 'visible';
            }
        }, 500)
        localStorage.setItem("theme", "dark");
        theme.setAttribute('onclick', 'changeDetailedTheme("light")');
    }
    else {
        document.getElementById("body").style.background = "hsl(0, 0%, 98%)";
        document.getElementById("head-content").style.background = "hsl(0, 0%, 100%)";
        document.getElementById("root").style.color = "hsl(200, 15%, 8%)";
        document.getElementById("go-back").style.background = "hsl(0, 0%, 98%)";
        document.getElementById("go-back").style.color = "hsl(209, 23%, 22%)";
        document.getElementById("moon").classList.remove('fas');
        document.getElementById("moon").classList.add('far');
        var ele = document.getElementsByClassName('text');
        for (var i = 0; i < ele.length; i++) {
            ele[i].style.color = "hsl(200, 15%, 8%)";
        }
        var ele = document.getElementsByClassName('borders');
        setTimeout(function () {
            for (var i = 0; i < ele.length; i++) {
                ele[i].style.background = "hsl(0, 0%, 98%)";
                ele[i].style.color = "hsl(200, 15%, 8%)";
                ele[i].style.visibility = 'visible';
            }
        }, 500)
        localStorage.setItem("theme", "light");
        theme.setAttribute('onclick', 'changeDetailedTheme("dark")');
    }
}