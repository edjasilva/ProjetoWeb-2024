document.getElementById('addButton').addEventListener('click', function() {
    Swal.fire({
        title: 'Adicionar novo post',
        html: `
            <input type="file" id="fileInput" class="swal2-file" />
            <label for="fileInput" class="swal2-file-label">Carregue uma imagem</label>
            <input type="text" id="textInput" class="swal2-input" placeholder="Insire o texto">
        `,
        
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        preConfirm: () => {
            const file = document.getElementById('fileInput').files[0];
            const text = document.getElementById('textInput').value;
            if (!file || !text) {
                Swal.showValidationMessage('Por favor carregue uma imagem e insira o texto');
                return false;
            }
            return { file, text };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { file, text } = result.value;
            console.log(file, text);
            // const formData = new FormData();
            // formData.append('file', file);
            // formData.append('text', text);
            // fetch('your-upload-url', {
            //     method: 'POST',
            //     body: formData
            // });
        }
    });
});