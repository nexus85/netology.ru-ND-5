"use strict";
const   expect = require('chai').expect,
        should = require('chai').should(),
        assert = require('chai').assert;

const sinon = require('sinon');

const   {Pokemon, PokemonList}  = require('../../1.1-es2015/PokemonList');

const   pikachu = new Pokemon('Pikachu', 258),
        testlist = new PokemonList(new Pokemon('Psyduck', 125), new Pokemon('Bulbasaur', 255));


describe('Unit test', () => {
    describe('Pokemon class', () => {
        it('тест на метод show класса Pokemon', () => {
            let spy = sinon.spy(console, 'log');
            pikachu.show();
            assert(spy.calledWith('Pikachu: 258lvl'));
            spy.restore();
        });
    });
    describe('PokemonList class', () => {
        it('тест на метод add класса PokemonList', () => {
            testlist.add('Charmander', 288);
            expect(testlist[testlist.length-1].name).to.eql('Charmander');
            assert.deepEqual(testlist[testlist.length-1].level, 288);
        });
        it('тест на метод show класса PokemonList', () => {
            let spy = sinon.spy(console, 'log');
            testlist.show();
            assert(spy.calledWith('Pokemons in list: 3'));
            assert(spy.calledWith('name: Psyduck, level: 125'));
            assert(spy.calledWith('name: Bulbasaur, level: 255'));
            assert(spy.calledWith('name: Charmander, level: 288'));
            spy.restore();
        });
        it('тест на метод max класса PokemonList', () => {
            (testlist.max().level).should.equal(288);
        });
    });
});

const supertest = require('supertest');

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

describe('REST API', () => {
    let server;
    before((done) => {
        require('../../2.2-api');
        setTimeout(() => {
            server = supertest.agent('http://localhost:1080');
            done();
        }, 1000);
    });
    it('тест на создание пользователя по REST протоколу', (done) => {
        server
            .post('/api/v0/users')
            .field('id', '1234')
            .field('name', 'Anonimous')
            .field('score', 264)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.status.should.equal(200);
                done();
            });
    });
    it('тест на удаление пользователя по REST протоколу', () => {
        server
            .del('/api/v0/users/1234')
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.status.should.equal(200);
            });
    });
});