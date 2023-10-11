const express = require('express');
const toprouter = new express.Router();
const ProductAdd = require('../models/productadd');

toprouter.get('/top', (req, res)=>{
    var search = '';
        if(req.query.search){
            search = req.query.search;
        }
    ProductAdd.find({
        catagories : "Top",
        $or:[
            {product_name: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_discription: {$regex:".*"+search+ ".*", $options: "i"}},
            {catagories: {$regex:".*"+search+ ".*", $options: "i"}},
            {model: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_price: {$regex:".*"+search+ ".*", $options: "i"}},
            
        ]
    
    }).then((x)=>{
        res.render("top", {x})
    })
})
toprouter.get('/body', (req, res)=>{
    var search = '';
        if(req.query.search){
            search = req.query.search;
        }
    ProductAdd.find({
        catagories : "Body",
        $or:[
            {product_name: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_discription: {$regex:".*"+search+ ".*", $options: "i"}},
            {catagories: {$regex:".*"+search+ ".*", $options: "i"}},
            {model: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_price: {$regex:".*"+search+ ".*", $options: "i"}},
            
        ]
    
    }).then((x)=>{
        res.render("body", {x})
    })
})
toprouter.get('/short-dress', (req, res)=>{
    var search = '';
        if(req.query.search){
            search = req.query.search;
        }
    ProductAdd.find({
        catagories : "Short-Dress",
        $or:[
            {product_name: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_discription: {$regex:".*"+search+ ".*", $options: "i"}},
            {catagories: {$regex:".*"+search+ ".*", $options: "i"}},
            {model: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_price: {$regex:".*"+search+ ".*", $options: "i"}},
            
        ]
    
    }).then((x)=>{
        res.render("short-dress", {x})
    })
})
toprouter.get('/long-dress', (req, res)=>{
    var search = '';
        if(req.query.search){
            search = req.query.search;
        }
    ProductAdd.find({
        catagories : "Long-Dress",
        $or:[
            {product_name: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_discription: {$regex:".*"+search+ ".*", $options: "i"}},
            {catagories: {$regex:".*"+search+ ".*", $options: "i"}},
            {model: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_price: {$regex:".*"+search+ ".*", $options: "i"}},
            
        ]
    
    }).then((x)=>{
        res.render("long-dress", {x})
    })
})
toprouter.get('/jump-suit', (req, res)=>{
    var search = '';
        if(req.query.search){
            search = req.query.search;
        }
    ProductAdd.find({
        catagories : "Jump-Suit",
        $or:[
            {product_name: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_discription: {$regex:".*"+search+ ".*", $options: "i"}},
            {catagories: {$regex:".*"+search+ ".*", $options: "i"}},
            {model: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_price: {$regex:".*"+search+ ".*", $options: "i"}},
            
        ]
    
    }).then((x)=>{
        res.render("jump-suit", {x})
    })
})
toprouter.get('/cord-set', (req, res)=>{
    var search = '';
        if(req.query.search){
            search = req.query.search;
        }
    ProductAdd.find({
        catagories : "Cord-Set",
        $or:[
            {product_name: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_discription: {$regex:".*"+search+ ".*", $options: "i"}},
            {catagories: {$regex:".*"+search+ ".*", $options: "i"}},
            {model: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_price: {$regex:".*"+search+ ".*", $options: "i"}},
            
        ]
    
    }).then((x)=>{
        res.render("cord-set", {x})
    })
})
toprouter.get('/short-skirt', (req, res)=>{
    var search = '';
        if(req.query.search){
            search = req.query.search;
        }
    ProductAdd.find({
        catagories : "Short-Skirt",
        $or:[
            {product_name: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_discription: {$regex:".*"+search+ ".*", $options: "i"}},
            {catagories: {$regex:".*"+search+ ".*", $options: "i"}},
            {model: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_price: {$regex:".*"+search+ ".*", $options: "i"}},
            
        ]
    
    }).then((x)=>{
        res.render("short-skirt", {x})
    })
})
toprouter.get('/long-skirt', (req, res)=>{
    var search = '';
        if(req.query.search){
            search = req.query.search;
        }
    ProductAdd.find({
        catagories : "Long-Skirt",
        $or:[
            {product_name: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_discription: {$regex:".*"+search+ ".*", $options: "i"}},
            {catagories: {$regex:".*"+search+ ".*", $options: "i"}},
            {model: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_price: {$regex:".*"+search+ ".*", $options: "i"}},
            
        ]
    
    }).then((x)=>{
        res.render("long-skirt", {x})
    })
})
toprouter.get('/paint-palazzo', (req, res)=>{
    var search = '';
        if(req.query.search){
            search = req.query.search;
        }
    ProductAdd.find({
        catagories : "Paint-Palazzo",
        $or:[
            {product_name: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_discription: {$regex:".*"+search+ ".*", $options: "i"}},
            {catagories: {$regex:".*"+search+ ".*", $options: "i"}},
            {model: {$regex:".*"+search+ ".*", $options: "i"}},
            {product_price: {$regex:".*"+search+ ".*", $options: "i"}},
            
        ]
    
    }).then((x)=>{
        res.render("paintpalazzo", {x})
    })
})



module.exports = toprouter;