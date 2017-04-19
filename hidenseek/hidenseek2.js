"use strict";

const FS = require('fs');
let {PokemonList} = require('./../init/PokemonList'),
    pokemons = require('./../init/pokemon.json');


const folders = ['01','02','03','04','05','06','07','08','09','10'];

const shuffle = function () {
    return Math.random() - 0.5;
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
        }, 0);
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
    }, 0);
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
    }, 0);
}

exports.hide = function(path, pokemons) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(pokemons);
            makePath(path)
                .then(() => makeFolders(path))
                .then(() => {
                    hidePokemons(path);
                    resolve(pokemons);
                });
        });
    });
};


exports.seek = function(path) {
    let found = new PokemonList;
    var pokemon;
    Promise.all(folders.map(function(el) {
        let folderName = `${path}/${el}`;
        console.log(folderName);
        FS.readFile(`${folderName}/pokemon.txt`, 'utf8', (err, data) => {
            if (!err) {
                return data;
            } else {
                return false;
            }
        });
    }))
        .then((data) => {
            for (let item of data) {
                if (item) {
                    found.add(item.split('|')[0],item.split('|')[1]);
                }
            }
            console.log(found);
        });
};