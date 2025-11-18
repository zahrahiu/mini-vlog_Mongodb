pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Spécifier branch main explicitly
                git branch: 'main', url: 'https://github.com/zahrahiu/mini-vlog_Mongodb.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t mini-vlog-backend .'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm install'
                sh 'npx jest'
            }
        }
        stage('Push Docker Image') {
            steps {
                sh 'docker tag mini-vlog-backend yourdockerhub/mini-vlog-backend:latest'
                sh 'docker push yourdockerhub/mini-vlog-backend:latest'
            }
        }
    }
}
