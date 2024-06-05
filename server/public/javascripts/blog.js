document.getElementById('addButton').addEventListener('click', function() {
    console.log('Pop-up opened in the same page.');
    Swal.fire({
        title: 'Adicionar novo post',
        html: `
            <input type="file" id="fileInput" class="swal2-file" />
            <label for="fileInput" class="swal2-file-label">Carregue uma imagem</label>
            <input type="text" id="textInput" class="swal2-input" placeholder="Insira o texto">
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
            const formData = new FormData();
            formData.append('file', file);
            formData.append('text', text);

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire('Sucesso!', 'Post adicionado com sucesso.', 'success');
                    // Reload the posts
                    loadPosts();
                } else {
                    Swal.fire('Erro!', 'Houve um problema ao adicionar o post.', 'error');
                }
            })
            .catch(error => {
                Swal.fire('Erro!', 'Houve um problema ao adicionar o post.', 'error');
            });
        }
    });
});

function loadPosts() {
    fetch('/posts')
        .then(response => response.json())
        .then(posts => {
            console.log(posts); // to verify data
            const postsContainer = document.getElementById('postsContainer');
            postsContainer.innerHTML = ''; // Clear existing posts
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'card col-md-4 mx-5 my-3';
                postElement.innerHTML = `
                    <img src="${post.image_path}" class="card-img-top" alt="${post.subtitle}">
                    <div class="card-body">
                        <div class="card-title bolder">${post.subtitle}</div>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error loading posts:', error);
        });
}

// Load posts when the page loads
window.onload = loadPosts;
