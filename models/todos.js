const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var todoSchema = new Schema({
    task:  {
        type: String,
        required: true
    },
    status:  {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

var Todos = mongoose.model('Todo', todoSchema);

module.exports = Todos;