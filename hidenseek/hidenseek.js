const FS = require('fs');
var {Pokemon, PokemonList} = require('./../init/PokemonList'),
    pokemons = require('./../init/pokemon.json');

//перемешиваие массива для .sort()
var shuffle = function () {
    return Math.random() - 0.5;
}

//создаем структуру каталогов
function makePath(path) {
    return new Promise((resolve, reject) => {
        FS.mkdir(path, error => {
            if (error) throw error;
            resolve();
        });
    });
}
function folderNames(path) {
    let folders = [];
    for (let i = 0; i < 11; i++) {
        let n = i < 10 ? path+`/0${i}` : path+`/${i}`;
        folders.push(n);
    }
    return folders;
}
function createFolders(path) {
    return new Promise((resolve, reject) => {
        let folders = folderNames(path);
        Promise.all(folders.map(makePath)).then(() => {
            resolve();
        });
    });
}

//перемешиваем массив с покемонами и оставляем нужное количество
function randomPokemons(pokemons) {
    pokemons.sort(shuffle);
    let n = pokemons.length < 3 ? pokemons.length : 3;
    pokemons.splice(0, pokemons.length - n);
    return pokemons;
}

//таким же образом определяем случайные папки
function randomFolders(pokemons) {
    let arr = [];
    for (let i = 1; i < 11; i++) {
        arr.push(i);
    }
    arr.sort(shuffle);
    let n = pokemons.length < 3 ? pokemons.length : 3;
    arr.splice(0, arr.length - n);
    return arr;
}

//прячем покемонов
function hidePokemons(path, folders, pokemons) {
    return new Promise((resolve, reject) => {
        for (let i of folders) {
            i = i < 10 ? `/0${i}` : i = `/${i}`;
            let text = `${pokemons[0].name}|${pokemons[0].level}`;
            FS.writeFile(`${path}${i}/pokemon.txt`, text);
            pokemons.shift();
        }
        resolve();
    });
}

exports.hide = function (path, pokemons) {
    return new Promise((resolve, reject) => {
        let lost = randomPokemons(pokemons);
        let folders = randomFolders(pokemons);
        makePath(path)
            .then(createFolders(path))
            .then(hidePokemons(path, folders, lost))
            .then(resolve());
    });
};

//собираем покемонов
function findPokemon(path) {
    return new Promise((resolve, reject) => {
        FS.readFile(`${path}/pokemon.txt`, 'utf8', (err, data) => {
            if (!err) {
                resolve(data);
            }
            else {
                resolve(null);
            }
        });
    });
}

exports.seek = function (path) {
    return new Promise((resolve, reject) => {
        let folders = folderNames(path);
        Promise.all(folders.map(findPokemon))
            .then(function (data) {
                let found = new PokemonList();
                for (let item of data) {
                    if (item) {
                        found.add(item.split('|')[0],item.split('|')[1]);
                    }
                }
                console.log(`Hidden pokemons:\r\t`);
                found.show();
                resolve(found);
            });
    });
};
