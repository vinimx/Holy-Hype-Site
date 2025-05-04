document.getElementById('form-contato').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Desabilita o botão durante o envio
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Verifica campos obrigatórios
    const camposObrigatorios = ['nome', 'organizacao', 'email', 'telefone', 'tipo_evento', 'data', 'cidade', 'mensagem'];
    const camposFaltando = [];

    camposObrigatorios.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (!elemento.value.trim()) {
            camposFaltando.push(elemento.previousElementSibling.textContent);
            elemento.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
        } else {
            elemento.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
        }
    });

    if (camposFaltando.length > 0) {
        Swal.fire({
            title: 'Campos Obrigatórios!',
            html: `Por favor, preencha os seguintes campos:<br><br>${camposFaltando.join('<br>')}`,
            icon: 'warning',
            confirmButtonColor: '#D2993D'
        });
        return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="relative z-10">Enviando...</span>';

    const formData = {
        nome: document.getElementById('nome').value.trim(),
        organizacao: document.getElementById('organizacao').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        tipoEvento: document.getElementById('tipo_evento').value,
        dataEvento: document.getElementById('data').value,
        cidadeEvento: document.getElementById('cidade').value.trim(),
        mensagem: document.getElementById('mensagem').value.trim(),
    };

    try {
        // Validação do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            throw new Error('Por favor, insira um email válido');
        }

        // Validação do telefone (aceita formatos: (99) 99999-9999 ou 99999999999)
        const telefoneRegex = /^(\(\d{2}\) ?\d{5}-\d{4}|\d{11})$/;
        if (!telefoneRegex.test(formData.telefone.replace(/\D/g, ''))) {
            throw new Error('Por favor, insira um telefone válido');
        }

        const response = await emailjs.send(
            "service_mzjtnrf", 
            "template_u109atk", 
            formData,
            'R8kggG7WITLEwcvkW'
        );

        if (response.status === 200) {
            // Mostra mensagem de sucesso mais elegante
            Swal.fire({
                title: 'Sucesso!',
                text: 'Sua mensagem foi enviada com sucesso. Em breve entraremos em contato!',
                icon: 'success',
                confirmButtonColor: '#D2993D'
            });
            this.reset();
        }
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        // Mostra erro mais elegante
        Swal.fire({
            title: 'Ops!',
            text: error.message || 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.',
            icon: 'error',
            confirmButtonColor: '#D2993D'
        });
    } finally {
        // Reativa o botão e restaura o texto original
        submitButton.disabled = false;
        submitButton.innerHTML = `
            <span class="relative z-10">Enviar Mensagem</span>
            <span class="absolute inset-0 bg-gradient-to-r from-amarelo/20 to-rosa/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></span>
            <span class="absolute inset-0 border-2 border-amarelo rounded-lg"></span>
            <svg class="w-7 h-7 relative z-10 transform transition-all duration-500 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-amarelo transition-all duration-500 group-hover:w-full"></span>
        `;
    }
});

// Adicione este evento para remover a classe de erro quando o usuário começar a digitar
document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('input', function() {
        this.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    });
});