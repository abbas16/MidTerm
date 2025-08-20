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
                    echo Building static site...
                    if exist artifact rmdir /S /Q artifact
                    mkdir artifact

                    rem Copy everything into artifact except these folders
                    rem robocopy returns 0-7 for success, 8+ for failure
                    robocopy . artifact /E /XD artifact .git ghp .github
                    if %ERRORLEVEL% LSS 8 ( exit /b 0 ) else ( exit /b %ERRORLEVEL% )
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
                        git checkout -B gh-pages

                        xcopy ..\\artifact\\* . /E /I /Y >NUL
                        rem create empty .nojekyll file
                        type NUL > .nojekyll

                        git add .
                        git commit -m "Deploy build #%BUILD_NUMBER% on %DATE% %TIME%" || echo Nothing to commit
                        git push -f origin gh-pages
                    '''
                }
            }
        }
    }

    post {
        success { echo '✅ Deployment successful.' }
        failure { echo '❌ Deployment failed — check Console Output.' }
    }
}
