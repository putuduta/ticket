/* Rest full API */

/*
    variabel di Js ada Var let const
*/

/*segala fungsi yg ada di object express bisa dipake */
const express = require('express');
const app = express();
const bp = require('body-parser');


/*conneect to mysql*/
const mysql = require('mysql');
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ticket'
});

app.use(bp.json())

/*mendengarkan port, function call back/return di c, function anonymous */
/*listen adalah sebuah function*/
app.listen('8000', (err)=>{
    if(err){
        console.log("Error");
    }else{
        con.connect((err)=>{
            if(err){
                console.log("Connect to database error");
            }else{
                console.log("Connect to database succeed");
            }
        })
        console.log("Server running in port 8000");
    }
});

/*  con.query("Select username,password from penumpang", (err,row)=>{
        untuk mengambil satu satu kalau ada tanda * artinya seluruh
    con.query("Select * from penumpang where id_penumpang = 1", (err,row)=>{
        untuk mengambil data dari salah satu primary key
*/

/*mengambil data dari database*/
app.get('/getdataPenumpang/:parameter', (req,res)=>{
    let param = req.params.parameter;
    con.query("SELECT * FROM penumpang WHERE id_penumpang = "+ param, (err,row)=>{
        if(err){
            res.send(
                {
                    result:"error"
                }
            );

        }else if(row == ""){
            res.send(
                {
                    result:"null"
                }
            );
        }else{
            res.send(
                {
                    result:"good",
                    data: row
                }
            );
        }
    });
})

app.get('/getdataPemesanan/:parameter', (req,res)=>{
    let pemesan = req.params.parameter;
    con.query("SELECT * FROM pemesanan WHERE id_pemesanan = "+ pemesan, (err,row)=>{
        if(err){
            res.send(
                {
                    result: "good"
                }
            );
        }else if(row == ""){
            res.send(
                {
                    result: "null"
                }
            );
        }else{
            res.send(
                {
                    result: "good"
                }
            );
        }
    });
})

/*untuk menginsert data ke database*/
app.post('/insertData', (req,res)=>{
    let data = {
        id_penumpang:"",
        username: req.body.user,
        password: req.body.pass,
        nama_penumpang: req.body.nama,
        alamat_penumpang: req.body.alamat,
        tanggal_lahir: Date.now(),
        jenis_kelamin: req.body.jk,
        telephone: req.body.telp
    }
    con.query("INSERT INTO penumpang SET ? ",data, (err)=>{
        if(err){
            res.send(
                {
                    result:"error"
                }
            )
        }else{
            res.send(
                {
                    result:"good"
                }
            )
        }
    });
});

/*penulisan function row
() => {};
*/

/*
1. request
2. respond
urutannya
*alert untuk pop up kotak
*/


/*get di browser bisa diakses
app.get('/hello', (req,res)=>{
    res.send(
            {
                result:"Berhasil",
                type:"Get",
            }
        );
});
*/

/*when you want to add a child resource under resources collection
app.post('/', (req,res)=>{
    res.send(
            {
                result:"Berhasil",
                type:"Post",
            }
        );
});
*/

/*when you want to modify a singular resource which is already a part of resources collection
app.put('/', (req, res)=>{
    res.send(
        {
            result:"Berhasil",
            type:"Put",
        }
    )
})
*/

/*The DELETE method deletes the specified resource
app.delete('/', (req, res)=>{
    res.send(
        {
            result:"Berhasil",
            type:"Delete",
        }
    )
})
*/