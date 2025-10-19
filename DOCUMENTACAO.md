# Documentação do Sistema de Gerenciamento de Pacientes - Hospital Santa Helena Norte

## Visão Geral do Projeto

O sistema de gerenciamento de pacientes do Hospital Santa Helena Norte é uma aplicação web front-end que permite o cadastro, busca e visualização de informações de pacientes. O sistema utiliza tecnologias web modernas (HTML, CSS, JavaScript) e armazena os dados localmente no navegador através do `localStorage`, eliminando a necessidade de um servidor back-end.

## Estrutura do Projeto

```
frontHospital/
├── api/
│   └── savePatient.js       # Lógica para salvar dados de pacientes no localStorage
├── data/
│   └── patients.json        # Arquivo JSON com dados iniciais de pacientes (opcional)
├── images/                  # Imagens utilizadas no sistema
└── pages/
    ├── buscaCpf/            # Página de busca de pacientes por CPF
    ├── cadastro/            # Página de cadastro e edição de pacientes
    └── carteirinha/         # Página de visualização da carteirinha do paciente
```

## Principais Funcionalidades

### 1. Busca de Pacientes (buscaCpf)

**Arquivo principal:** `pages/buscaCpf/index.html`

Esta página permite aos usuários:
- Buscar pacientes exclusivamente pelo número de CPF
- Visualizar informações detalhadas do paciente após a busca
- Editar informações do paciente (redirecionando para a página de cadastro)
- Visualizar a carteirinha do paciente (redirecionando para a página de carteirinha)
- Iniciar uma nova busca

**Características técnicas:**
- Zoom da página configurado para 90%
- Validação de formato de CPF (com máscara automática)
- Feedback visual quando paciente não é encontrado
- Armazenamento e recuperação de dados via localStorage

### 2. Cadastro de Pacientes (cadastro)

**Arquivo principal:** `pages/cadastro/index.html`

Esta página permite aos usuários:
- Cadastrar novos pacientes com informações completas
- Editar informações de pacientes existentes
- Validar dados de entrada (CPF, e-mail, telefone, etc.)
- Salvar dados no localStorage do navegador

**Campos do formulário:**
- CPF (com validação e máscara)
- Nome completo
- Data de nascimento
- Telefone (com máscara)
- E-mail (com validação)
- Endereço completo
- Plano de saúde
- Contato de emergência

**Características técnicas:**
- Feedback visual com SweetAlert2 para confirmações e erros
- Validação de campos obrigatórios
- Formatação automática de campos (CPF, telefone, data)
- Integração com a API de armazenamento local (savePatient.js)

### 3. Carteirinha do Paciente (carteirinha)

**Arquivo principal:** `pages/carteirinha/index.html`

Esta página permite aos usuários:
- Visualizar a carteirinha digital do paciente
- Imprimir a carteirinha para uso físico
- Retornar à página de busca

**Informações exibidas:**
- Nome completo do paciente
- CPF
- Data de nascimento
- Telefone
- E-mail
- Endereço
- Plano de saúde
- Contato de emergência
- ID único do paciente

**Características técnicas:**
- Zoom da página configurado para 75%
- Layout responsivo adaptado para impressão
- Design visual com a identidade do hospital (cor primária: #23518C)

### 4. Sistema de Armazenamento (api/savePatient.js)

O sistema utiliza exclusivamente o `localStorage` do navegador para armazenar e recuperar dados dos pacientes em formato JSON, eliminando a necessidade de um servidor back-end. Principais características:

- Persistência de dados entre sessões do navegador
- Estrutura de dados padronizada em formato JSON
- Geração automática de IDs únicos para pacientes
- Manipulação eficiente de dados (adição, edição, busca)

## Fluxo de Trabalho do Sistema

1. **Busca de paciente:** O usuário inicia pela página de busca, inserindo o CPF do paciente
2. **Visualização/Edição:** Após encontrar o paciente, o usuário pode:
   - Visualizar os dados na própria página de busca
   - Editar os dados (redirecionando para a página de cadastro)
   - Visualizar a carteirinha (redirecionando para a página de carteirinha)
3. **Cadastro de novo paciente:** A partir da página de busca, o usuário pode acessar o formulário de cadastro para adicionar um novo paciente
4. **Impressão da carteirinha:** Na página da carteirinha, o usuário pode imprimir o documento para uso físico

## Considerações Técnicas

- **Responsividade:** O sistema é adaptado para diferentes tamanhos de tela
- **Acessibilidade:** Elementos de interface seguem boas práticas de acessibilidade
- **Performance:** Armazenamento local garante operação rápida sem dependência de conexão com servidor
- **Segurança:** Dados sensíveis são armazenados apenas localmente no navegador do usuário

## Melhorias Recentes

- Atualização da cor primária para #23518C em todas as páginas
- Remoção do campo de busca por nome na página de busca
- Ajuste do zoom para 90% na página de busca
- Remoção do indicador de status (Ativo/Inativo) na carteirinha do paciente
- Ajuste do zoom para 75% na página da carteirinha

## Instruções para Apresentação

Ao apresentar o projeto para o professor, recomenda-se seguir os seguintes passos:

1. **Introdução ao Sistema:**
   - Explicar o propósito do sistema (gerenciamento de pacientes)
   - Destacar o uso de tecnologias web modernas e armazenamento local

2. **Demonstração do Fluxo Principal:**
   - Iniciar pela página de busca de pacientes
   - Cadastrar um novo paciente
   - Buscar o paciente cadastrado pelo CPF
   - Visualizar e editar informações
   - Gerar e imprimir a carteirinha

3. **Destaque das Características Técnicas:**
   - Mostrar a validação de campos
   - Explicar o funcionamento do localStorage
   - Demonstrar a responsividade das páginas
   - Apontar as melhorias recentes implementadas

4. **Conclusão:**
   - Resumir os benefícios do sistema para o hospital
   - Mencionar possíveis melhorias futuras
   - Abrir espaço para perguntas

## Requisitos para Execução

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Servidor web local para servir os arquivos (pode ser um simples servidor HTTP)
- Não requer banco de dados ou servidor back-end

---

*Documentação elaborada para apresentação do projeto ao professor.*
*Hospital Santa Helena Norte - Sistema de Gerenciamento de Pacientes*
*Data: Maio de 2024*