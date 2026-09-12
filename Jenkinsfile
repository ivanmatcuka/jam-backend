pipeline {
    agent any

    tools {
      nodejs '22.13'
    }

    environment {
      DEPLOY_USER = credentials('deploy-user')
      DEPLOY_HOST = credentials('deploy-host')

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

      stage('Set Up Docker') {
        steps {
          sh 'chmod +x /usr/local/bin/docker-compose'
          sh '''docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASSWORD}'''
        }
      }

      stage('Build for Development') {
        steps {
          echo 'Building....'
          sh 'docker-compose -f docker-compose.development.yml build'
        }
      }

      stage('Push Development Version') {
        steps {
          echo 'Pushing....'
          sh 'docker-compose -f docker-compose.development.yml push'
        }
      }

      stage('Deploy to Production') {
        steps {
          echo 'Deploying....'
          sh '''DOCKER_HOST=ssh://${DEPLOY_USER}@${DEPLOY_USER} docker-compose -f docker-compose.development.yml down'''
          sh '''DOCKER_HOST=ssh://${DEPLOY_USER}@${DEPLOY_USER} docker-compose -f docker-compose.development.yml up -d'''
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
