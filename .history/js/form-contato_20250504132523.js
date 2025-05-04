document.getElementById('form-contato').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const formData = {
        nome: document.getElementById('nome').value,
        organizacao: document.getElementById('organizacao').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        tipoEvento: document.getElementById('tipo_evento').value,
        dataEvento: document.getElementById('data').value,
        cidadeEvento: document.getElementById('cidade').value,
        mensagem: document.getElementById('mensagem').value,

    }

    try {
        const response = await emailjs.send("service_mzjtnrf", 
            "template_u109atk", 
            formData
        ); 
    
        if (response.status === 200) {
            alert("Mensagem enviada com sucesso!");
            document.getElementById('form-contato').reset(); // Limpa o formulário após o envio
        }


})
