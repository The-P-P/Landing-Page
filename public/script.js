const form = document.getElementById('orcamento-form');
const statusMsg = document.getElementById('status-msg');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    const orcamento = { nome, email, mensagem };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orcamento),
        });

        if (response.ok) {
            statusMsg.textContent = 'Orçamento enviado com sucesso!';
            statusMsg.style.color = 'green';
            form.reset();
        } else {
            throw new Error('Erro ao enviar os dados.');
        }
    } catch (error) {
        statusMsg.textContent = 'Erro: Não foi possível enviar o orçamento.';
        statusMsg.style.color = 'red';
        console.error(error);
    }
});
