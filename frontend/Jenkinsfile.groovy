pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub
                git 'https://github.com/TheManMtl/friendy.git'
            }
        }
        stage('Build') {
            steps {
                // Run npm run build
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Deploy to EC2') {
            steps {
                // Use SCP or any other method to copy build artifacts to EC2
                sh 'scp -r ./frontend/build /usr/share/nginx/html'
            }
        }
    }
}