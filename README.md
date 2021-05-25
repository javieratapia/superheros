# SuperHeros

## Notas

Para este proyecto de usó JavaScript Vaninilla, Bootstrap 4.6 para el diseño y CavasJS para los gráficos.

Cuenta con tres vistas, la primera un index explicativo de la página, la segunda con la llamada a [MarvelAPI](https://developer.marvel.com/)donde se despliega la información recibida y la última llamada Dataset, donde con la información recibida de la [SuperheroeAPI](https://superheroapi.com/) se crean gráficos, luego de que el usuario ingresa un numero de superhéroe (1 al 713).

## Para hacer funcionar el llamado a las API 

Se debe crear un archivo config.js, con la siguiente configuración

const marvel={
    apiKeyPrivate: 'tu clave privada',
    apiKeyPublic: 'tu clave pública',
    apiHash:'Hash MD5 creado con 1 + clave privada + clave pública'
}

const superHeroe={
    apiToken: 'tu clave'
}

## Otros Proyectos con Vue.js 

https://github.com/javieratapia/pokeapi

https://github.com/javieratapia/recetas
