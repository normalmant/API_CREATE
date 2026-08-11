

const express = require("express")
const app = express()
const port = 3000
app.use(express.json()) // configura API para usar JSON.
const fs = require('fs') // importa leitura e escrita de arquivos.








app.get("/aulas/:Dia",(req,res)=>{

    const Dia= req.params.Dia
    
        try{

            const aula= JSON.parse(fs.readFileSync("aulas.json","utf8"))
            res.status(200).json({resposta:aula})
    
            if(indiceAula==-1){
                
                return res.status(404).json({erro: "Aula não existe no Banco de Dados"})
            }
    
    
            fs.writeFileSync("aulas.json",JSON.stringify(bd),"utf8")
            res.status(200).json({resposta:"Aula apagado"})
    
        }catch(erro){
            res.status(500).json({erro:"Deu errado"})
    
    
        }
    
    })








app.post("/aulas",(req,res)=>{

    const aulas=req.body

    try{
       const segunda= JSON.parse(fs.readFileSync("aulas.json","utf8") )

        segunda.push(aulas)

        fs.writeFileSync("aulas.json",JSON.stringify(segunda),"utf8")

        res.status(200).json({resposta:"Famoso Adicionado"})
    }catch{
        res.status(500).json({erro:"Falha ao cadastrar"})
    }
})




// Execução da API:
app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})