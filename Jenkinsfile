pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh '''
                    echo "Simulating build step..."
                    mkdir -p artifact
                    cp -r * artifact/ || true
                    rm -rf artifact/.git
                '''
            }
        }
        stage('Deploy to GitHub Pages') {
            steps {
                withCredentials([string(credentialsId: 'github-token', variable: 'GH_TOKEN')]) {
                    sh '''
                        git config --global user.name "Jenkins"
                        git config --global user.email "jenkins@example.com"

                        rm -rf ghp && mkdir ghp && cd ghp
                        git init
                        git remote add origin https://x-access-token:${GH_TOKEN}@github.com/abbas16/MidTerm.git
                        git checkout -b gh-pages
                        cp -r ../artifact/* .
                        touch .nojekyll
                        git add .
                        git commit -m "Deploy $(date +%F_%T)"
                        git push -f origin gh-pages
                    '''
                }
            }
        }
    }
}
