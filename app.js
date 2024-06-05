import tabela2024 from './tabela.js';
import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.status(200).send(tabela2024);
});

app.get("/:sigla", (req, res) => {
    const siglaInformada = req.params.sigla.toUpperCase();
    const time = tabela2024.find(infoTime => infoTime.sigla === siglaInformada);

    if(!time){
        res.status(404).send("Não há na séria A do brasileirão um time com a silga " + siglaInformada);
        return;
    }

    res.status(200).send(time);
});

app.listen(300, () => console.log("servidor rodando com sucesso!"));