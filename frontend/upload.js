const API_URL = 'http://localhost:5000/videos';

document.getElementById('videoForm').addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('author', document.getElementById('author').value || 'Anonymous');
    formData.append('video', document.getElementById('videoFile').files[0]);

    await fetch(API_URL, { method: 'POST', body: formData });
    alert("Vidéo uploadée avec succès !");
    document.getElementById('videoForm').reset();
});
