import express from "express"
import {agregarContacto, obtenerContactos,borrarContacto} from "./src/mysql_conector.js"

let todos

const app = express()

app.listen("8000",function(){
    console.log("APP INICIADA EN EL PUERTO 8000")
})

app.set("views","./vistas")
app.set("view engine","pug")

app.use(express.static("./vistas"))
app.use(express.static("./src"))
app.use(express.static("./css"))

app.get("/",function(req,res){
    todos = obtenerContactos()
    res.render("index", {titulo: "Aplicacion de contactos", contactos:todos} )
})

app.get("/agregar/:nombre/:numero", function(req,res){
    let nombre = req.params.nombre
    let numero = req.params.numero
    agregarContacto(numero,nombre)
    res.redirect("/")
})

app.get("/borrar/:id", function(req,res){
    let id = req.params.id
    borrarContacto(id)
    res.redirect("/")
})

