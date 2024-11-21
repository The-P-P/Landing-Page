const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const jsonFilePath = path.join(__dirname, 'data', 'orcamentos.json');

app.post('/api/contact', (req, res) => {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const novoOrcamento = {
        nome,
        email,
        mensagem,
        data_envio: new Date().toISOString(),
    };

    try {
        let orcamentos = [];
        if (fs.existsSync(jsonFilePath) && fs.readFileSync(jsonFilePath, 'utf8').trim() !== '') {
            orcamentos = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
        }

        orcamentos.push(novoOrcamento);

        fs.writeFileSync(jsonFilePath, JSON.stringify(orcamentos, null, 2));
        res.status(201).json({ message: 'Orçamento enviado com sucesso!' });
    } catch (error) {
        console.error("Erro ao salvar orçamento:", error);
        res.status(500).json({ error: 'Erro ao salvar o orçamento.' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
