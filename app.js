import tabela2024 from './tabela.js';
import express from 'express';
import { modeloTime, modeloAtuaizacaoTime } from './validacao.js';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send(tabela2024);
});

app.get("/:sigla", (req, res) => {
    const siglaInformada = req.params.sigla.toUpperCase();
    const time = tabela2024.find((infoTime) => infoTime.sigla === siglaInformada);

    if(!time){
        res.status(404).send("Não há na séria A do brasileirão um time com a silga " + siglaInformada);
        return;
    }

    res.status(200).send(time);
});

app.put('/:sigla', (req, res) => {
    const siglainformada = req.params.sigla.toUpperCase();
    const time = tabela2024.find((infoTime) => infoTime.sigla === siglainformada);

    if(!time){
        res.status(404).send("Não há na séria A do brasileirão um time com a silga " + siglainformada);
        return;
    }

    const resultadoValidacao = modeloAtuaizacaoTime.validate(req.body).error;

    if(resultadoValidacao){
        res.status(400).send(resultadoValidacao);
        return;
    }

    const campos = Object.keys(req.body);

    for(let campo of campos){
        time[campo] = req.body[campo]
    }

    res.status(200).send(time);

});

app.post('/', (req, res) => {
    const timeNovo = req.body;

    const resultadoValidacao = modeloTime.validate(timeNovo).error;

    if(resultadoValidacao){
        res.status(400).send(resultadoValidacao);
        return;
    }

    tabela2024.push(timeNovo);

    res.status(201).send(timeNovo);
});

app.delete('/:sigla', (req, res) =>{
    const siglainformada = req.params.sigla.toUpperCase();
    const indiceTimeSelecionado = tabela2024.findIndex((infoTime) => infoTime.sigla === siglainformada);

    if(indiceTimeSelecionado === -1){
        res.status(404).send("Não há na séria A do brasileirão um time com a silga " + siglainformada);
        return;
    }

    const timeRemovido = tabela2024.splice(indiceTimeSelecionado, 1);

    res.status(200).send(timeRemovido);
});

app.listen(300, () => console.log("servidor rodando com sucesso!"));