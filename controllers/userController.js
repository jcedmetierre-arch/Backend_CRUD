//SQL
const connection = require('../config/db');

//Get all users
exports.getAllUsers=(req,res)=>{
    connection.query('SELECT * FROM userdata', (err,rows,fields)=>{
        if(err) throw err;
            res.json(rows);
    });
};

//Search a user by ID
exports.getUsersById=(req,res)=>{
    const id=req.params.id;
    connection.query('SELECT * FROM userdata WHERE id=?',[id,id],(err,rows,fields)=>{
        if(err) throw err;
        if(rows.length>0)
            res.json(rows);
        else
            res.status(404).json({message: 'User not found'});
    });
};

//Create a new user
//CRUD - Create
exports.createUser=(req,res)=>{
    const {itemName,itemCode,originalPrice,discountPrice}=req.body;
    const itemImage = req.file ? req.file.filename : 'default.jpg';
    connection.query('INSERT INTO userdata (itemName, itemCode, originalPrice, discountPrice, itemImage) VALUES (?,?,?,?,?)',[itemName,itemCode,originalPrice,discountPrice,itemImage],(err,results)=>{
        if(err) throw err;
            res.json({message: 'User created succesfully', userId:results.insertId});
    });
};

exports.updateUser=(req,res)=>{
    const {id,itemName,itemCode,originalPrice,discountPrice,itemImage,}=req.body;
    connection.query('UPDATE userdata SET itemName=?, itemCode=?, originalPrice=?, discountPrice=?, itemImage=? WHERE id=?',[itemName,itemCode,originalPrice,discountPrice,itemImage,id],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows > 0)
            res.json({message:`User updated succesfully`});
        else
            res.status(404).json({message:'User not found'});
    }); 
}

exports.deleteUser=(req,res)=>{
    const id=req.body.id;
    connection.query('DELETE FROM userdata WHERE id=?',[id],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows > 0)
            res.json({message:`User deleted succesfully`});
        else
            res.status(404).json({message:'User not found'});
    }); 
}