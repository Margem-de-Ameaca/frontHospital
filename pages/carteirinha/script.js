$(document).ready(function() {
    // Obter parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const cpfParam = urlParams.get('cpf');
    
    if (!cpfParam) {
        alert('CPF não fornecido. Redirecionando para a página de busca.');
        window.location.href = '../buscaCpf/index.html';
        return;
    }
    
    // Inicializar o banco de dados de pacientes se não existir
if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify([]));
}

// Carregar os dados do paciente
const patients = JSON.parse(localStorage.getItem('patients') || '[]');
const patient = patients.find(p => p.cpf.replace(/\D/g, '') === cpfParam.replace(/\D/g, ''));

if (!patient) {
    alert('Paciente não encontrado. Redirecionando para a página de busca.');
    window.location.href = '../buscaCpf/index.html';
    return;
}
    
    // Preencher dados na carteirinha
    $('#patientName').text(patient.fullname);
    $('#patientCpf').text(patient.cpf);
    $('#patientBirthdate').text(formatDate(patient.birthdate));
    $('#patientPhone').text(patient.phone);
    $('#patientEmail').text(patient.email);
    $('#patientAddress').text(patient.address);
    
    // Gerar ID único para o paciente baseado no CPF
    const patientId = generatePatientId(patient.cpf);
    $('#patientId').text(patientId);
    
    // Verificar se tem convênio
    if (patient.healthInsurance && patient.healthInsurance.trim() !== '') {
        $('#patientInsurance').text(patient.healthInsurance);
    } else {
        $('#insuranceRow').hide();
    }
    
    // Verificar se tem contato de emergência
    if (patient.emergencyContact && patient.emergencyContact.trim() !== '') {
        $('#patientEmergency').text(patient.emergencyContact);
    } else {
        $('#emergencyRow').hide();
    }
    
    // Verificar status do paciente
    if (patient.status === 'inactive') {
        $('#patientStatus').text('Inativo').addClass('inactive');
    }
    
    // Botão de impressão
    $('#printCard').on('click', function() {
        window.print();
    });
    
    // Função para formatar data
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }
    
    // Função para gerar ID do paciente
    function generatePatientId(cpf) {
        const cleanCpf = cpf.replace(/\D/g, '');
        const lastFour = cleanCpf.slice(-4);
        const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `HSH-${randomChars}${lastFour}`;
    }
});