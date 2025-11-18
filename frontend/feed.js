const API_URL = 'http://localhost:5000/videos';

async function loadFeed() {
    const res = await fetch(API_URL);
    const videos = await res.json();
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    videos.reverse().forEach(video => {
        const div = document.createElement('div');
        div.className = 'post mb-4 p-3 border rounded';
        div.innerHTML = `
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <video width="100%" controls>
                <source src="http://localhost:5000/uploads/${video.videoUrl}" type="video/mp4">
            </video>
            <p>Auteur: ${video.author} | Date: ${new Date(video.date).toLocaleString()}</p>
            <p>Likes: <span id="likes-${video._id}">${video.likes}</span>
                <button onclick="likeVideo('${video._id}')" class="btn btn-sm btn-outline-primary">👍</button>
            </p>
        `;
        feed.appendChild(div);
    });
}

// Likes
async function likeVideo(id) {
    const res = await fetch(`${API_URL}/${id}/like`, { method: 'POST' });
    const video = await res.json();
    document.getElementById(`likes-${id}`).textContent = video.likes;
}

loadFeed();
