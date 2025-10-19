document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const strengthProgress = document.getElementById('strength-progress');
    const strengthText = document.getElementById('strength-text');
    const passwordMatch = document.getElementById('password-match');
    
    // Elementos de validação
    const uppercaseElement = document.getElementById('uppercase');
    const specialElement = document.getElementById('special');
    const numberElement = document.getElementById('number');
    const lengthElement = document.getElementById('length');
    
    // Verificar força da senha
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        let strength = 0;
        let feedback = '';
        
        // Verificar comprimento
        if (password.length >= 8) {
            strength += 25;
            lengthElement.classList.add('valid');
        } else {
            lengthElement.classList.remove('valid');
        }
        
        // Verificar letra maiúscula
        if (/[A-Z]/.test(password)) {
            strength += 25;
            uppercaseElement.classList.add('valid');
        } else {
            uppercaseElement.classList.remove('valid');
        }
        
        // Verificar caractere especial
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            strength += 25;
            specialElement.classList.add('valid');
        } else {
            specialElement.classList.remove('valid');
        }
        
        // Verificar número
        if (/[0-9]/.test(password)) {
            strength += 25;
            numberElement.classList.add('valid');
        } else {
            numberElement.classList.remove('valid');
        }
        
        // Atualizar barra de progresso
        strengthProgress.style.width = strength + '%';
        
        // Definir cor e texto baseado na força
        if (strength < 25) {
            strengthProgress.style.backgroundColor = '#ff4d4d'; // Vermelho
            feedback = 'Muito fraca';
        } else if (strength < 50) {
            strengthProgress.style.backgroundColor = '#ffa64d'; // Laranja
            feedback = 'Fraca';
        } else if (strength < 75) {
            strengthProgress.style.backgroundColor = '#ffff4d'; // Amarelo
            feedback = 'Média';
        } else if (strength < 100) {
            strengthProgress.style.backgroundColor = '#4dff4d'; // Verde claro
            feedback = 'Forte';
        } else {
            strengthProgress.style.backgroundColor = '#26e626'; // Verde
            feedback = 'Muito forte';
        }
        
        strengthText.textContent = 'Força da senha: ' + feedback;
    });
    
    // Verificar se as senhas coincidem
    confirmPasswordInput.addEventListener('input', function() {
        if (passwordInput.value === confirmPasswordInput.value) {
            passwordMatch.textContent = 'Senhas coincidem';
            passwordMatch.style.color = '#26e626';
        } else {
            passwordMatch.textContent = 'Senhas não coincidem';
            passwordMatch.style.color = '#ff4d4d';
        }
    });
    
    // Formatar telefone automaticamente
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            // Formatar como (XX) XXXXX-XXXX
            if (value.length <= 2) {
                value = `(${value}`;
            } else if (value.length <= 7) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            } else {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
            }
        }
        e.target.value = value;
    });
    
    // Validação do formulário antes de enviar
    const form = document.getElementById('accountForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Verificar se as senhas coincidem
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('As senhas não coincidem!');
            return;
        }
        
        // Verificar força da senha
        let strength = 0;
        if (passwordInput.value.length >= 8) strength += 25;
        if (/[A-Z]/.test(passwordInput.value)) strength += 25;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordInput.value)) strength += 25;
        if (/[0-9]/.test(passwordInput.value)) strength += 25;
        
        if (strength < 75) {
            alert('Por favor, crie uma senha mais forte!');
            return;
        }
        
        // Se tudo estiver correto, o formulário seria enviado
        alert('Conta criada com sucesso!');
        form.reset();
        
        // Resetar os indicadores visuais
        strengthProgress.style.width = '0%';
        strengthText.textContent = 'Força da senha';
        passwordMatch.textContent = '';
        uppercaseElement.classList.remove('valid');
        specialElement.classList.remove('valid');
        numberElement.classList.remove('valid');
        lengthElement.classList.remove('valid');
    });
});