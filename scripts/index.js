const apiUrl = 'https://65497589e182221f8d51943b.mockapi.io/users';

const inputGet1Id = document.getElementById('inputGet1Id');
const btnGet1 = document.getElementById('btnGet1');
const btnPost = document.getElementById('btnPost');
const inputPutId = document.getElementById('inputPutId');
const btnPut = document.getElementById('btnPut');
const inputDelete = document.getElementById('inputDelete');
const btnDelete = document.getElementById('btnDelete');
const resultsList = document.getElementById('results');
const alertError = document.getElementById('alert-error');


btnPut.addEventListener('click', () => {
    const userId = inputPutId.value;
    if (userId) {
        fetch(`${apiUrl}/${userId}`)
            .then(response => response.json())
            .then(data => {

                document.getElementById('inputPutNombre').value = data.name;
                document.getElementById('inputPutApellido').value = data.lastname;
                document.getElementById('btnSendChanges').disabled = false;
            })
            .catch(error => {
                alertError.classList.add('show');
                console.error('Error en la solicitud GET:', error);
            });
    }
});

document.getElementById('btnSendChanges').addEventListener('click', () => {
    const userId = inputPutId.value;
    if (userId) {
        const nuevoNombre = document.getElementById('inputPutNombre').value;
        const nuevoApellido = document.getElementById('inputPutApellido').value;

        const userData = {
            name: nuevoNombre,
            lastname: nuevoApellido
        };

        fetch(`${apiUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                alertError.classList.remove('show');
                resultsList.innerHTML = `<li>Usuario actualizado - ID: ${data.id}, Nombre: ${data.name}, Apellido: ${data.lastname}</li>`;
            }).catch(error => {
                alertError.classList.add('show');
                console.error('Error en la solicitud PUT:', error);
            });
    }
});

btnPost.addEventListener('click', () => {
    const inputPostNombre = document.getElementById('inputPostNombre').value;
    const inputPostApellido = document.getElementById('inputPostApellido').value;
    fetch("https://65497589e182221f8d51943b.mockapi.io/users")
        .then(response => response.json())
        .then(data => {
            const ultimoUsuario = data[data.length - 1];

            if (inputPostNombre != "" && inputPostApellido != "") {
                const nuevoUsuario = {
                    id: ultimoUsuario.id + 1,
                    name: inputPostNombre,
                    lastname: inputPostApellido
                };
                console.log(nuevoUsuario);
                fetch("https://65497589e182221f8d51943b.mockapi.io/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevoUsuario)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Nuevo usuario creado:", data);
                    })
                    .catch(error => {
                        console.error("Error al crear el nuevo usuario:", error);
                    });
            } else {
                alertError.classList.add('show');
                console.error("Recuerda escribir un nombre y apellido");
            }
        })
        .catch(error => {
            alertError.classList.add('show');
            console.error("Error en la solicitud GET:", error);
        });
});

btnDelete.addEventListener('click', () => {
    const userId = inputDelete.value;
    if (userId) {
        fetch(`${apiUrl}/${userId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alertError.classList.remove('show');
                    resultsList.innerHTML = `<li>Usuario con ID ${userId} eliminado con éxito.</li>`;
                } else {
                    alertError.classList.add('show');
                    console.error(`Error al eliminar el usuario con ID ${userId}.`);
                }
            })
            .catch(error => {
                alertError.classList.add('show');
                console.error('Error en la solicitud DELETE:', error);
            });
    }
});

btnGet1.addEventListener('click', () => {
    const userId = inputGet1Id.value;
    if (userId) {
        fetch(`${apiUrl}/${userId}`)
            .then(response => response.json())
            .then(data => {
                alertError.classList.remove('show');
                resultsList.innerHTML = `<li>ID: ${data.id}, Nombre: ${data.name}, Apellido: ${data.lastname}</li>`;
            })
            .catch(error => {
                alertError.classList.add('show');
                console.error('Error en la solicitud GET:', error);
            });
    } else {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                alertError.classList.remove('show');
                data.forEach(user => {
                    fetch(`${apiUrl}/${user.id}`)
                        .then(response => response.json())
                        .then(userData => {
                            resultsList.innerHTML += `<li>ID: ${userData.id}, Nombre: ${userData.name}, Apellido: ${userData.lastname}</li>`;
                        })
                        .catch(error => {
                            alertError.classList.add('show');
                            console.error('Error en la solicitud GET:', error);
                        });
                });
            })
            .catch(error => {
                alertError.classList.add('show');
                console.error('Error en la solicitud GET:', error);
            });
    }

});