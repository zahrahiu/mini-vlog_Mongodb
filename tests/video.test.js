const request = require('supertest');
const app = require('../server'); // export app dans server.js
const mongoose = require('mongoose'); // <-- ajoute ça

let server;

beforeAll((done) => {
    server = app.listen(5001, done); // démarre un serveur temporaire pour les tests
});

afterAll(async () => {
    await mongoose.connection.close(); // <-- ferme la connexion MongoDB
    server.close(); // <-- ferme le serveur Express
});

describe('GET /videos', () => {
    it('should return all videos', async () => {
        const res = await request(app).get('/videos');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
