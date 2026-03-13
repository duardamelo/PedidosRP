// Navegação entre páginas
const menuItems = document.querySelectorAll('.menu-item');
const paginas = document.querySelectorAll('.pagina');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-page');
        paginas.forEach(p => {
            p.classList.remove('ativa');
        });
        document.getElementById(target).classList.add('ativa');
    });
});

// Funções do formulário de senha
const btnAlterar = document.getElementById('btnAlterarSenha');
const formSenha = document.getElementById('formSenha');
const btnCancelar = document.getElementById('btnCancelar');

btnAlterar.addEventListener('click', () => {
    formSenha.style.display = 'flex';
    btnAlterar.style.display = 'none';
});

btnCancelar.addEventListener('click', () => {
    formSenha.style.display = 'none';
    btnAlterar.style.display = 'inline-block';
});

formSenha.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Senha alterada com sucesso!');
    formSenha.reset();
    formSenha.style.display = 'none';
    btnAlterar.style.display = 'inline-block';
});
