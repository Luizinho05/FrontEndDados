const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'locadora'
})

app.post('/cadastroClientes', (req, res) => {
    const cod_cliente = req.body.codCliente
    const nome = req.body.nome
    const TelFixo = req.body.telFixo
    const TelCel = req.body.telCel
    const estado = req.body.estado
    const cidade = req.body.cidade
    const rua = req.body.rua
    const bairro = req.body.bairro
    const numero = req.body.numero
    const complemento = req.body.complemento
    const cep = req.body.cep


    db.query(
        'INSERT INTO clientes (cod_cliente, nome_completo, tel_fixo, tel_celular, estado, cidade, rua, bairro, numero, complemento, cep) VALUE(?,?,?,?,?,?,?,?,?,?,?)',
        [cod_cliente, nome, TelFixo, TelCel, estado, cidade, rua, bairro, numero, complemento, cep],
        (err) => {
            if (err){
                res.send(err)
            }
            res.send({msg: 'Registro Cadastrado com Sucesso' })
        }
    )
})

app.get('/visualizaDados', (req,res) => {
    db.query(
     'SELECT * FROM clientes',
     (err, result) => {
        if (err){
            res.send ({ msg: 'Dados Não Encontrados' })
        }
        res.send(result)
     }
   )

})

app.get('/visualizaDadosUnico/:id', (req, res) => {
    const {id} = req.params
    db.query(
        'SELECT * FROM clientes WHERE cod_cliente = ?',
        [id],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            res.send(result)
        }
    )
})

app.put('/alteraDados/:id', (req, res) => {
    const {id} = req.params
    const nome = req.body.nome
    db.query(
        'UPDATE clientes SET nome_completo = ? WHERE cod_cliente = ?', 
        [id, nome],
        (err) => {
            if(err){
                res.send(err)
            }
            res.send({ msg: 'Alteração Feita com Sucesso'})
    })

})

app.delete('/deleteUser/:id', (req, res) => {
    const {id} = req.params
    db.query(
        'DELETE from clientes WHERE id_cliente = ?',
        [id],
        (err) => {
            if(err){
                res.send(err)
            }
            res.send ({ msg: 'Apagado com sucesso' })
        }
    )
})

app.listen(3333, () => {
 console.log('Servidor Rodando na porta 3333')
})