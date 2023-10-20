var pages = {
    "pages": [
        {
            "title": "Bartholomew Bartholomore IV",
            "link": "/bartholomew-wiki/bartholomew"
        },
	{
            "title": "Peepur Rat Clan",
            "link": "/bartholomew-wiki/peepur-rat-clan"
        }
    ]
}

function search() {
    var input, filter, ul, li, a
    input = document.getElementById('searchBar')
    output = document.getElementById("searchBarOutput")
    output.innerHTML = '' // Clear the list
    for (i = 0; i < pages.pages.length; i++) {
        filter = input.value.toUpperCase()
        if (pages.pages[i].title.toUpperCase().indexOf(filter) > -1 && filter != "") {
            li = document.createElement("li")
            a = document.createElement('a')
            a.textContent = pages.pages[i].title
            a.href = pages.pages[i].link
            li.appendChild(a)
            output.appendChild(li)
        }
    }
}