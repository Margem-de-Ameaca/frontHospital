document.addEventListener('DOMContentLoaded', function() {
    // Banco de dados simulado (JSON)
    let patientsDB = JSON.parse(localStorage.getItem('patients')) || [];
    
    // Inicializar o banco de dados simulado se não existir
    if (!localStorage.getItem('patients')) {
        localStorage.setItem('patients', JSON.stringify([]));
    }
    
    // Elementos do formulário de busca
    const searchSection = document.getElementById('searchSection');
    const searchCpfInput = document.getElementById('searchCpf');
    const searchButton = document.getElementById('searchButton');
    
    // Elementos do resultado da busca
    const searchResultSection = document.getElementById('searchResultSection');
    const patientInfoDiv = document.getElementById('patientInfo');
    const newSearchButton = document.getElementById('newSearchButton');
    
    // Não há mais elementos do formulário de cadastro nesta página
    
    // Formatar CPF
    function formatCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length > 0) {
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        return cpf;
    }
    
    // Formatar telefone automaticamente - removido pois não existe na página de busca
    
    // Formatar CPF automaticamente
    if (searchCpfInput) {
        searchCpfInput.addEventListener('input', function(e) {
            e.target.value = formatCPF(e.target.value);
        });
    }
    
    // Função para mostrar mensagem de erro moderna
    function showError(field, message) {
        // Remover mensagem de erro anterior se existir
        const parent = field.parentElement;
        const existingError = parent.querySelector('.error-message');
        if (existingError) {
            parent.removeChild(existingError);
        }
        
        // Adicionar nova mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff3860';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        parent.appendChild(errorDiv);
        field.style.borderColor = '#ff3860';
        
        // Remover mensagem após 5 segundos
        setTimeout(() => {
            if (parent.contains(errorDiv)) {
                errorDiv.style.opacity = '0';
                errorDiv.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    if (parent.contains(errorDiv)) {
                        parent.removeChild(errorDiv);
                    }
                }, 500);
            }
            field.style.borderColor = '';
        }, 5000);
    }
    
    // Função para buscar paciente
    function searchPatient() {
        // Remover mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('input').forEach(el => el.style.borderColor = '');
        
        const cpf = searchCpfInput.value.replace(/\D/g, '');
        
        if (!cpf) {
            showError(searchCpfInput, 'Por favor, informe o CPF para realizar a busca.');
            return;
        }
        
        let foundPatient = null;
        
        // Busca por CPF
        foundPatient = patientsDB.find(patient => patient.cpf.replace(/\D/g, '') === cpf);
        
        if (foundPatient) {
            // Exibe os dados do paciente encontrado
            displayPatientInfo(foundPatient);
        } else {
            // Mostra mensagem informativa antes de redirecionar
            Swal.fire({
                title: 'Paciente não encontrado',
                text: 'Você será redirecionado para a página de cadastro',
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor: '#2669BF'
            }).then(() => {
                // Redireciona para a página de cadastro
                redirectToCadastro();
            });
        }
    }
    
    // Função para exibir informações do paciente
    function displayPatientInfo(patient) {
        // Redirecionar para a página de carteirinha
        window.location.href = `../carteirinha/index.html?cpf=${encodeURIComponent(patient.cpf)}`;
    }
    
    // Função para formatar data
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }
    
    // Função para redirecionar para a página de cadastro com parâmetros
    function redirectToCadastro() {
        const cpf = searchCpfInput.value;
        window.location.href = `../cadastro/index.html?cpf=${encodeURIComponent(cpf)}`;
    }
    
    // Função para nova busca
    function newSearch() {
        searchResultSection.style.display = 'none';
        searchSection.style.display = 'block';
        searchCpfInput.value = '';
    }
    
    // Event Listeners
    if (searchButton) {
        searchButton.addEventListener('click', searchPatient);
    }
    
    if (newSearchButton) {
        newSearchButton.addEventListener('click', newSearch);
    }
    
    // Não há mais submissão de formulário nesta página
    
    // Funções globais para edição e alteração de status
    window.editPatient = function(cpf) {
        const patient = patientsDB.find(p => p.cpf.replace(/\D/g, '') === cpf.replace(/\D/g, ''));
        if (patient) {
            // Preencher o formulário com os dados do paciente
            cpfInput.value = patient.cpf;
            fullnameInput.value = patient.fullname;
            document.getElementById('birthdate').value = patient.birthdate;
            document.getElementById('phone').value = patient.phone;
            document.getElementById('email').value = patient.email;
            document.getElementById('address').value = patient.address;
            document.getElementById('healthInsurance').value = patient.healthInsurance || '';
            document.getElementById('emergencyContact').value = patient.emergencyContact || '';
            
            // Mostrar o formulário
            searchResultSection.style.display = 'none';
            registrationForm.style.display = 'block';
        }
    };
    
    window.togglePatientStatus = function(cpf) {
         const patientIndex = patientsDB.findIndex(p => p.cpf.replace(/\D/g, '') === cpf.replace(/\D/g, ''));
         if (patientIndex >= 0) {
             // Alternar status
             patientsDB[patientIndex].status = patientsDB[patientIndex].status === 'active' ? 'inactive' : 'active';
             
             // Salvar no localStorage
             localStorage.setItem('patients', JSON.stringify(patientsDB));
             
             // Atualizar a exibição
             displayPatientInfo(patientsDB[patientIndex]);
         }
     };
});