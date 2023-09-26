const url = 'https://api.github.com/users';
const main = document.getElementById('main')
let text = ''

function getUser(user) {
    fetch(`${url}/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            const userImage = document.createElement('img');
            userImage.src = data.avatar_url;
            userImage.alt = 'Foto do usuário';

            const userInfo = document.createElement('p');
            userInfo.textContent = `${data.name} possui ${data.public_repos} repositórios no GitHub como ${data.login}`;

            const userLocation = document.createElement('p');
            userLocation.textContent = `Localização: ${data.location || 'Não especificado'}`;

            text += `<p>${data.name} possui ${data.public_repos} repositórios públicos no GitHub como ${data.login}</p>`;
            main.innerHTML = text;
            main.appendChild(userImage);
            main.appendChild(userInfo);
            main.appendChild(userLocation);
        })
        .catch((error) => console.error('Erro: ', error.message || error))

}

const userInput = document.getElementById('username')

userInput.addEventListener('focusout', function(event){
    getUser(event.target.value)
})
