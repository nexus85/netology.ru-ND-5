"use strict";

const fs = require('fs');
let {PokemonList} = require('./../1.1-es2015/PokemonList'),
    pokemons = require('./../1.1-es2015/pokemon.json');


const folders = ['01','02','03','04','05','06','07','08','09','10'];

const shuffle = function () {
    return Math.random() - 0.5;
};

function makePath(path) {
    return new Promise((resolve, reject) => {
        const deleteFolderRecursive = function(target) {
            if (fs.existsSync(target)) {
                fs.readdirSync(target).forEach(function (file) {
                    const curPath = target + "/" + file;
                    if (fs.lstatSync(curPath).isDirectory()) {
                        deleteFolderRecursive(curPath);
                    } else {
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(target);
            }
        };

        fs.mkdir(path, err => {
            if (err) {
                if (err.code === 'EEXIST') {
                    deleteFolderRecursive(path);
                    fs.mkdirSync(path);
                    resolve(path);
                } else {
                    console.log(err);
                    reject(err);
                }
            } else {
                resolve(path);
            }
        });
    });
}

function makeFolders(path) {
    for (let folder of folders) {
        let folderName = `${path}/${folder}`;
        fs.mkdir(folderName, error => {
            if (error) throw error;
        });
    }
}

function hidePokemons(path) {
    let lost = new PokemonList;
    pokemons.sort(shuffle);
    folders.sort(shuffle);
    let tiksCount = pokemons.length < 3  ? pokemons.length : 3;
    for (let i = 0; i < tiksCount; i++) {
        let folderName = `${path}/${folders[i]}`;
        console.log(folderName, pokemons[0]);
        let text = `${pokemons[0].name}|${pokemons[0].level}`;
        fs.writeFile(`${folderName}/pokemon.txt`, text);
        lost.push(pokemons.shift());
    }
    return lost;
}

exports.hide = function(path, pokemons) {
        makePath(path)
            .then((path) => makeFolders(path))
            .then(() => {
                hidePokemons(path);
            });

};


exports.seek = function(path) {
    const   found = new PokemonList,
            options = {encoding: 'utf-8'};
    Promise.all(folders.map(function(el) {
        return new Promise((resolve, reject) => {
            let folderName = `${path}/${el}`;
            fs.readFile(`${folderName}/pokemon.txt`, options, (err, data) => {
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