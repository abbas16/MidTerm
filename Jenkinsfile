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
                bat '''
                    echo Simulating build step...
                    if not exist artifact mkdir artifact
                    xcopy * artifact /E /I /Y
                    rmdir /S /Q artifact\\.git 2>nul
                '''
            }
        }
        stage('Deploy to GitHub Pages') {
            steps {
                withCredentials([string(credentialsId: 'github-token', variable: 'GH_TOKEN')]) {
                    bat '''
                        git config --global user.name "Jenkins"
                        git config --global user.email "jenkins@example.com"

                        if exist ghp rmdir /S /Q ghp
                        mkdir ghp
                        cd ghp

                        git init
                        git remote add origin https://x-access-token:%GH_TOKEN%@github.com/abbas16/MidTerm.git
                        git checkout -b gh-pages

                        xcopy ..\\artifact\\* . /E /I /Y
                        echo. > .nojekyll

                        git add .
                        git commit -m "Deploy %date%_%time%"
                        git push -f origin gh-pages
                    '''
                }
            }
        }
    }
}
