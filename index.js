

const express = require("express")
const app = express()
const port = 3000
app.use(express.json()) // configura API para usar JSON.
const fs = require('fs') // importa leitura e escrita de arquivos.




app.get("/aulas/:Dia",(req,res)=>{
    const Dia=req.params.Dia

    try{
         const aula= JSON.parse(fs.readFileSync("aulas.json","utf8"))

         const aula_dia= aula.filter((aula)=>aula.Dia.toLowerCase()===Dia.toLowerCase())

         if(aula_dia.length===0){
            res.status(400).json({resposta:"Não existe aulas existentes neste dia"})
         }

         res.status(200).json({resposta: aula_dia})

    }catch(erro){
    res.status(500).json({erro:"Erro interno do servidor"})
    }
})





app.put("/aulas/:id",(req,res)=>{
    const id= Number(req.params.id)


    try{
        const aulas= JSON.parse(fs.readFileSync("aulas.json","utf8"))

        const indiceAula=aulas.findIndex((aula)=>aula.id===id)

        if(indiceAula===-1){
            res.status(404).json({erro:"Aula não foi encontrada"})
        }
        
        aulas[indiceAula]={
            ...req.body,
            id:id
        }

        console.log(indiceAula)
        res.status(200).json({resposta:"Aula foi Alterada"})

        fs.writeFileSync("aulas.json",JSON.stringify(aulas),"utf8")

    }catch(erro){
        res.status(500).json({erro:"Erro interno do servidor"})
    }


})











//Visualizar todas as aulas
app.get("/aulas",(req,res)=>{

    const Dia= req.params.Dia
    
        try{
            const aula= JSON.parse(fs.readFileSync("aulas.json","utf8"))
            
            if(aula===0){
               res.status(400).json({resposta:"Não existe nada para ser mostrado"})
            }else{
             res.status(200).json({resposta:aula})
            }
    
        }catch(erro){
            res.status(500).json({erro:"Deu errado"})
    
    
        }
    
    })







app.post("/aulas",(req,res)=>{

    const aulas=req.body

    try{
       const bd= JSON.parse(fs.readFileSync("aulas.json","utf8") )


       //Adicionar ID automaticamente
       const contador=JSON.parse(fs.readFileSync("id.json","utf8"))

       contador.id=contador.id +1
       fs.writeFileSync("id.json",JSON.stringify(contador),"utf8")



        aulas.id=contador.id




        bd.push(aulas)
        fs.writeFileSync("aulas.json",JSON.stringify(bd),"utf8")

        res.status(200).json({resposta:"Aula adicionada"})
    }catch{
        res.status(500).json({erro:"Falha ao cadastrar"})
    }
    
})




// Execução da API:
app.listen(port, ()=>{
    console.log("API rodando na porta " + port)

        const contador=JSON.parse(fs.readFileSync("id.json","utf8"))
        contador.id=contador.id 
        console.log(contador)
})
