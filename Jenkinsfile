pipeline {
  agent any
    /*
  tools {nodejs "node"}
    */
  stages {
        /*
    stage('Cloning Git') {
      steps {
        echo 'Cloning from git'
        git 'https://github.com/sushicircle/reddit_react_fetchapi.git'
        sh 'sudo yum install java-1.8.0-openjdk'
      }
    }
    */
    
    stage('Build') {
      steps {
        echo 'Build'
        sh './gradlew build --no-daemon'
        archiveArtifacts artifacts: 'dist/fetchapi.zip'
      }
    }
    stage('DeployToStaging') {
        when {
            branch 'master'
        }
        steps {
            withCredentials([usernamePassword(credentialsId: 'webserver_login', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                sshPublisher(
                    failOnError: true,
                    continueOnError: false,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'staging',
                            sshCredentials: [
                                username: "$USERNAME",
                                encryptedPassphrase: "$USERPASS"
                            ], 
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'dist/fetchapi.zip',
                                    removePrefix: 'dist/',
                                    remoteDirectory: '/tmp',
                                    execCommand: 'sudo /usr/bin/systemctl stop fetchapi && rm -rf /opt/fetchapi/* && unzip /tmp/fetchapi.zip -d /opt/fetchapi'
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }   
    
    stage('DeployProduction') {
      when {
        branch 'master'
      }
        steps {
          input 'Ok with stage?'
          milestone(1)
            withCredentials([usernamePassword(credentialsId: 'webserver_login', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                sshPublisher(
                    failOnError: true,
                    continueOnError: false,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'staging',
                            sshCredentials: [
                                username: "$USERNAME",
                                encryptedPassphrase: "$USERPASS"
                            ], 
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'dist/fetchapi.zip',
                                    removePrefix: 'dist/',
                                    remoteDirectory: '/tmp',
                                    execCommand: 'sudo /usr/bin/systemctl stop fetchapi && rm -rf /opt/fetchapi/* && unzip /tmp/fetchapi.zip -d /opt/fetchapi'
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
    
    /* using gradle now
    stage('Install dependencies') {
      steps {
        echo 'Install dependencies ...'
        sh 'npm install'
      }
    }
     
    stage('Test') {
      steps {
          echo 'no tests need running'
         //sh 'npm test'
      }
    }
    */
  }
}
