// Este arquivo substitui a funcionalidade do savePatient.php
// usando localStorage para armazenar os dados em formato JSON

// Função para salvar pacientes
function savePatients(patients) {
  try {
    // Salvar no localStorage
    localStorage.setItem('patients', JSON.stringify(patients));
    return { success: true };
  } catch (error) {
    console.error('Erro ao salvar pacientes:', error);
    return { success: false, error: error.message };
  }
}

// Exportar a função para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { savePatients };
}