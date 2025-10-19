$(document).ready(function() {
    // Obter parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const cpfParam = urlParams.get('cpf');
    const nameParam = urlParams.get('name');
    
    // Preencher campos se houver parâmetros
    if (cpfParam) {
        $('#cpf').val(cpfParam);
    }
    
    if (nameParam) {
        $('#fullname').val(nameParam);
    }
    
    // Inicializar o banco de dados simulado se não existir
    if (!localStorage.getItem('patients')) {
        localStorage.setItem('patients', JSON.stringify([]));
    }
    
    // Carregar dados do arquivo JSON se existir
    $.ajax({
        url: '/data/patients.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Mesclar dados do arquivo com localStorage
            const localPatients = JSON.parse(localStorage.getItem('patients') || '[]');
            const mergedPatients = [...localPatients];
            
            // Adicionar pacientes do arquivo que não existem no localStorage
            data.forEach(patient => {
                if (!mergedPatients.some(p => p.cpf === patient.cpf)) {
                    mergedPatients.push(patient);
                }
            });
            
            localStorage.setItem('patients', JSON.stringify(mergedPatients));
        },
        error: function() {
            console.log('Arquivo JSON ainda não existe ou está vazio. Usando apenas localStorage.');
        }
    });

    // Formatação de CPF
    $('#cpf').on('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        if (value.length > 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
        }
        
        e.target.value = value;
    });

    // Formatação de telefone
    $('#phone').on('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        }
        
        e.target.value = value;
    });
    
    // Formatação de contato de emergência
    $('#emergencyContact').on('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        }
        
        e.target.value = value;
    });

    // Função para mostrar mensagem de erro moderna
    function showError(field, message) {
        // Remover mensagem de erro anterior se existir
        $(field).parent().find('.error-message').remove();
        
        // Adicionar nova mensagem de erro
        const errorDiv = $('<div class="error-message" style="color: #ff3860; font-size: 14px; margin-top: 5px;"></div>').text(message);
        $(field).parent().append(errorDiv);
        $(field).css('border-color', '#ff3860');
        
        // Remover mensagem após 5 segundos
        setTimeout(() => {
            errorDiv.fadeOut(500, function() {
                $(this).remove();
            });
            $(field).css('border-color', '');
        }, 5000);
    }
    
    // Submissão do formulário de cadastro
    $('#registrationForm').on('submit', function(e) {
        e.preventDefault();
        
        // Remover mensagens de erro anteriores
        $('.error-message').remove();
        $('input').css('border-color', '');
        
        let hasErrors = false;
        
        const cpf = $('#cpf').val();
        const fullname = $('#fullname').val();
        const birthdate = $('#birthdate').val();
        const phone = $('#phone').val();
        const email = $('#email').val();
        const address = $('#address').val();
        const healthInsurance = $('#healthInsurance').val();
        const emergencyContact = $('#emergencyContact').val();
        
        // Validar campos obrigatórios
        if (!cpf || cpf.replace(/\D/g, '').length !== 11) {
            showError('#cpf', 'Por favor, insira um CPF válido com 11 dígitos.');
            hasErrors = true;
        }
        
        if (!fullname || fullname.trim().length < 3) {
            showError('#fullname', 'Por favor, insira um nome completo válido.');
            hasErrors = true;
        }
        
        if (!birthdate) {
            showError('#birthdate', 'Por favor, selecione uma data de nascimento.');
            hasErrors = true;
        }
        
        if (!phone || phone.replace(/\D/g, '').length < 10) {
            showError('#phone', 'Por favor, insira um telefone válido.');
            hasErrors = true;
        }
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            showError('#email', 'Por favor, insira um email válido.');
            hasErrors = true;
        }
        
        if (!address || address.trim().length < 5) {
            showError('#address', 'Por favor, insira um endereço válido.');
            hasErrors = true;
        }
        
        if (hasErrors) {
            return;
        }
        
        // Obter pacientes existentes
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        
        // Verificar se o paciente já existe
        const existingPatientIndex = patients.findIndex(p => p.cpf === cpf);
        
        if (existingPatientIndex !== -1) {
            // Atualizar paciente existente
            patients[existingPatientIndex] = {
                cpf,
                fullname,
                birthdate,
                phone,
                email,
                address,
                healthInsurance,
                emergencyContact,
                status: patients[existingPatientIndex].status || 'active'
            };
            
            // Usar SweetAlert2 para mensagem mais moderna
            Swal.fire({
                title: 'Sucesso!',
                text: 'Paciente atualizado com sucesso!',
                icon: 'success',
                confirmButtonColor: '#23518C'
            });
        } else {
            // Adicionar novo paciente
            patients.push({
                cpf,
                fullname,
                birthdate,
                phone,
                email,
                address,
                healthInsurance,
                emergencyContact,
                status: 'active'
            });
            
            // Usar SweetAlert2 para mensagem mais moderna
            Swal.fire({
                title: 'Sucesso!',
                text: 'Paciente cadastrado com sucesso!',
                icon: 'success',
                confirmButtonColor: '#23518C'
            });
        }
        
        // Salvar no localStorage
        localStorage.setItem('patients', JSON.stringify(patients));
        
        // Dados salvos diretamente no localStorage
        console.log('Dados salvos com sucesso no localStorage');
        
        // Limpar formulário
        $('#registrationForm')[0].reset();
        
        // Redirecionar para a página de carteirinha após fechar o alerta
        setTimeout(() => {
            window.location.href = '../carteirinha/index.html?cpf=' + encodeURIComponent(cpf);
        }, 1500);
    });
});