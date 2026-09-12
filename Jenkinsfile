pipeline {
    agent any

    tools {
      nodejs '22.13'
    }

    environment {
      // DEPLOY_USER = credentials('deploy-user')
      // DEPLOY_HOST = credentials('deploy-host')

      DOCKERHUB_PASSWORD = credentials('dockerhub-password')
      DOCKERHUB_USER = credentials('dockerhub-username')
    }

    stages {
      stage('Lint') {
        steps {
          echo 'Linting....'
          sh 'npm i'
          sh 'npm run lint'
        }
      }

      stage('Build for Development') {
        steps {
          echo 'Building....'
          sh "docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASSWORD}"
          sh 'docker compose -f docker-compose-.development.yml build'
        }
      }

      stage('Push Development Version') {
        steps {
          echo 'Pushin....'
          sh "docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASSWORD}"
          sh 'docker compose -f docker-compose-.development.yml push'
        }
      }

      // stage('Deploy') {
      //   steps {
      //     echo 'Deploying...'
      //     sh '''
      //       ssh ${DEPLOY_USER}@${DEPLOY_HOST} "
      //         cd ./${PROJECT_SLUG} ;

      //         git reset --hard ;
      //         git checkout development ;
      //         git pull ;

      //         ./scripts/deploy.sh ;
      //       "
      //     '''
      //   }
      // }
    }
}
