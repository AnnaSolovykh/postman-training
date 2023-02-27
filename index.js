const express = require ('express');
const app = express();
const bodyParser = require('body-parser');

const items = require('./Items');
app.use(bodyParser.urlencoded( {extened: false} ));
app.use(bodyParser.json())

app.get('/api/items', (req, res) => {
    res.json(items)
})

app.post('/api/items', (req, res) => {
    const newItem = {
        name: req.body.name,
        id: req.body.id,
        price: req.body.price
    }
    items.push(newItem);
    res.json(items);
})

app.delete('/api/items/:id', (req, res) => {
    let { id } = req.params;
    let itemToBeDeleted = items.find(item => item.id === id);

    if (itemToBeDeleted) {
        res.json( {
            message: 'The item is deleted',
            items: items.filter( item => item.id  !== id)
        })
    }
    else {
        res.status(404)
        .json ({
            message: 'The item you are looking for does not exist'
        })
    }
})

app.put('/api/items/:name', (req, res) => {
    let { name } = req.params;
    let itemToBeUpdated = items.find( item => item.name === name );

    if (itemToBeUpdated) {
        const updatedItem = req.body;

        items.forEach( item => {
            if (item.name === req.params.name) {
                item.name = updatedItem ? updatedItem.name : item.name;
                item.id = updatedItem ? updatedItem.id : item.id;
                item.price = updatedItem ? updatedItem.price : item.price;
                res.json( {
                    message: "The item is updated!", item
                })
            }
        } )
    } else {
        res.status(404)
        .json ( {message: `The item you are looking for ${req.params.name} does not exist`})
    }

})

app.listen(4000, () => {
console.log('It is working!')
})