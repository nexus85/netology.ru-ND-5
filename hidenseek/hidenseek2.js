"use strict";

const FS = require('fs');
let {PokemonList} = require('./../init/PokemonList'),
    pokemons = require('./../init/pokemon.json');


const folders = ['01','02','03','04','05','06','07','08','09','10'];

const shuffle = function () {
    return Math.random() - 0.5;
};

const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    max = Math.floor(Math.random() * (max - min + 1));
    return max + min;
};

function makePath(path, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var deleteFolderRecursive = function(target) {
                if (FS.existsSync(target)) {
                    FS.readdirSync(target).forEach(function (file, index) {
                        var curPath = target + "/" + file;
                        if (FS.lstatSync(curPath).isDirectory()) { // recurse
                            deleteFolderRecursive(curPath);
                        } else { // delete file
                            FS.unlinkSync(curPath);
                        }
                    });
                    FS.rmdirSync(target);
                }
            };
            if (FS.existsSync(path)) {
                deleteFolderRecursive(path);
            };
            FS.mkdirSync(path);
            resolve();
        }, 1000);
    });
};

function makeFolders(path) {
    setTimeout(() => {
        for (let folder of folders) {
            let folderName = `${path}/${folder}`;
            FS.mkdirSync(folderName, error => {
                if (error) throw error;
            });
        }
    }, 1000);
}

function hidePokemons(path) {
    setTimeout(() => {
        let lost = new PokemonList;
        pokemons.sort(shuffle);
        folders.sort(shuffle);
        let tiksCount = pokemons.length < 3 ? pokemons.length : 3;
        for (let i = 0; i < tiksCount; i++) {
            let folderName = `${path}/${folders[i]}`;
            console.log(folderName, pokemons[0]);
            let text = `${pokemons[0].name}|${pokemons[0].level}`;
            FS.writeFile(`${folderName}/pokemon.txt`, text);
            lost.push(pokemons.shift());
        };
        return lost;
    }, 1000);
}

exports.hide = function(path, pokemons) {
    return new Promise((resolve, reject) => {
        console.log(pokemons);
        makePath(path)
            .then(() => makeFolders(path))
            .then(() => {
                hidePokemons(path);
                resolve(pokemons);
            });
    });
};


exports.seek = function(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let found = new PokemonList;
            var pokemon;
            for (let folder of folders) {
                let folderName = `${path}/${folder}`;
                pokemon = FS.readFile(`${folderName}/pokemon.txt`, 'utf8', (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        resolve(null);
                    }
                });
            }
        }, 1000);
    }).all()
        .then((result) => {
            console.log(result);
        });
};