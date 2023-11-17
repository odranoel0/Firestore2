dadosUser = document.querySelector("#dadosUser")

// Função para recuperar arquivos do Firebase Storage
function displayAllFiles() {
  var fileList = document.getElementById('fileList');
  fileList.innerHTML = ''; // Limpar a lista de arquivos

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var filesRef = storage.ref('users/');
      filesRef.listAll().then(result => {
        result.items.forEach(item => {
          item.getDownloadURL().then(url => {
            item.getMetadata().then(metadata => {
              var fileContainer = document.createElement('div');
              fileContainer.classList.add('file-container'); // Adicionar a classe

              if ( item.name.toLowerCase().endsWith('.jpg') || item.name.toLowerCase().endsWith('.jpeg') 
                || item.name.toLowerCase().endsWith('.png') || item.name.toLowerCase().endsWith('.gif')) {
                // Se for uma imagem, exibir miniatura
                var img = document.createElement('img');
                img.src = url; // Usar a variável url diretamente
                img.alt = metadata.name; // Adicione o nome do arquivo como texto alternativo
                img.classList.add('file-image'); // Adicionar a classe
                fileContainer.appendChild(img);
              } else {
                // Se for outro tipo de arquivo, exibir um link direto para o download
                var link = document.createElement('a');
                link.href = url; // Usar a variável url diretamente
                link.innerHTML = metadata.name; // Use metadata.name para exibir o nome do arquivo
                fileContainer.appendChild(link);
              }

              // Adicione o nome do arquivo abaixo da miniatura ou link
              var fileNameElement = document.createElement('p');
              fileNameElement.textContent = metadata.name;
              fileContainer.appendChild(fileNameElement);

              fileList.appendChild(fileContainer);
            });
          }).catch(error => {
            console.error('Erro ao recuperar metadados:', error);
          });
        });
      }).catch(error => {
        console.error('Erro ao recuperar arquivos:', error);
      });
    } else {
      console.error('Usuário não autenticado.');
    }
  });
}

// Função para remover um arquivo do Firebase Storage
function removeFile(userId, fileName) {
  var fileRef = storage.ref('users/' + userId + '/files/' + fileName);

  fileRef.delete().then(() => {
    console.log('Arquivo removido com sucesso.');
    displayFiles(); // Atualizar a exibição após a remoção
  }).catch(error => {
    console.error('Erro ao remover arquivo:', error);
  });
}

// Chamar a função de exibição ao carregar a página
document.addEventListener('DOMContentLoaded', displayAllFiles);

