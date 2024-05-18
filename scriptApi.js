let apiKey = "64ad459420msh4c2e7251457deddp1f0181jsne6f520562247";
let searchForm = document.getElementById('search-id');
let searchInput = document.getElementById('search-input');


async function handleAPICall(){
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchInput.value}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64ad459420msh4c2e7251457deddp1f0181jsne6f520562247',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

document.getElementById('search-button').addEventListener('click', (e) => {
    e.preventDefault();

    handleAPICall()
})