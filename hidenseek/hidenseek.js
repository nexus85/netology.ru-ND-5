"use strict";

const FS = require('fs');
let {PokemonList} = require('./../init/PokemonList'),
    pokemons = require('./../init/pokemon.json');


const folders = ['01','02','03','04','05','06','07','08','09','10'];

const shuffle = function () {
    return Math.random() - 0.5;
};

function makePath(path) {
    return new Promise((resolve, reject) => {
        const deleteFolderRecursive = function(target) {
            if (FS.existsSync(target)) {
                FS.readdirSync(target).forEach(function (file) {
                    const curPath = target + "/" + file;
                    if (FS.lstatSync(curPath).isDirectory()) {
                        deleteFolderRecursive(curPath);
                    } else {
                        FS.unlinkSync(curPath);
                    }
                });
                FS.rmdirSync(target);
            }
        };
        if (FS.existsSync(path)) {
            deleteFolderRecursive(path);
        }
        FS.mkdir(path);
        resolve();
    });
}

function makeFolders(path) {
    for (let folder of folders) {
        let folderName = `${path}/${folder}`;
        FS.mkdir(folderName, error => {
            if (error) throw error;
        });
    }
}

function hidePokemons(path) {
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
    }
    return lost;
}

exports.hide = function(path, pokemons) {
    return new Promise((resolve, reject) => {
        makePath(path)
            .then(() => makeFolders(path))
            .then(() => {
                hidePokemons(path);
                resolve(pokemons);
            });
    });
};


exports.seek = function(path) {
    const   found = new PokemonList,
            options = {encoding: 'utf-8'};
    Promise.all(folders.map(function(el) {
        let folderName = `${path}/${el}`;
        return new Promise((resolve, reject) => {
            FS.readFile(`${folderName}/pokemon.txt`, options, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    resolve(null);
                }
            });
        });
    })).then(result => {
        for (let data of result) {
            if (data) {
                found.add(data.split('|')[0], data.split('|')[1]);
            }
        }
        found.show();
    });
};