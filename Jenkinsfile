pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        echo 'Cloning from git'
        git 'https://github.com/sushicircle/reddit_react_fetchapi.git'
      }
    }
        
    stage('Install dependencies') {
      steps {
        echo 'Install dependencies'
        sh 'npm install'
      }
    }
     
    stage('Test') {
      steps {
          echo 'no tests need running'
         //sh 'npm test'
      }
    }      
  }
}
