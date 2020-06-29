const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Todos = require('../models/todos');

const todoRouter = express.Router();

todoRouter.use(bodyParser.json());

todoRouter.route('/')
.get((req,res,next) => {
    Todos.find({})
    .then((todos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(todos);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Todos.create(req.body)
    .then((todo) => {
        console.log('Todo Created ', todo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(todo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Todos');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /Todos');
});

todoRouter.route('/:todoId')
.get((req,res,next) => {
    Todos.findById(req.params.todoId)
    .then((todo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(todo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /todo/'+ req.params.todoId);
})
.put((req, res, next) => {
    console.log("here");
    Todos.findByIdAndUpdate(req.params.todoId, {
        $set: req.body
    }, { new: true })
    .then((todo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(todo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Todos.findByIdAndRemove(req.params.todoId)
    .then((resp) => {
        console.log("Deleted");
        console.log(resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = todoRouter;