// 1. DEPLOY_SERVER_NAME: 빌드 서버네임(DEPLOY_SERVER_NAME) 다중 선택(이중화 서버용)
// 2. SERVER_URL: 빌드 서버네임(DEPLOY_SERVER_NAME)에 따른 서버 IP 동적 선택 해당 서버 빌드 완료 후 스키마 로드용
properties([
    parameters([
        [
            $class: 'ExtendedChoiceParameterDefinition',
            type: 'PT_MULTI_SELECT',
            name: 'DEPLOY_SERVER_NAME',
            value: 'devweb01',
            defaultValue: 'devweb01',
            description: '배포할 서버',
            visibleItemCount: '3'
        ]
    ])
])

def CURRENT_BUILD_INFO = currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause')

pipeline {
    agent any
    tools {
        nodejs "NODE_HOME"
    }
    /* Build periodically - 빌드 스케줄러
        (Minute Hour DayOfMonth Month DayOfWeek)
        Minute(0-59) Hour(0-23) DayOfMonth(1-31) Month(1-12) DayOfWeek(0-6, Sunday to Saturday)
        예시: ('00 22 * * 1-5') - 10:00 PM every Monday to Friday
    */
    // triggers {
    //     cron('00 13,22 * * 1-5')
    //   }
    /* To set credential to use on jenkins script
        Credential - GIT_CREDENTIAL, SLACK_TOKEN
            -> set up Http://${JENKINS_HOME}/Credentials
    */
    environment {
        // ICE 설치 홈 디렉토리
        ROOT_PATH = "/app/ice4"
        // 어플리케이션 유형 = CORE/ADMIN/FRONTOFFICE(pc,mobile)
        APPLICAION_TYPE = "pc"
        // [Git] 서버 설정
        GIT_URL = "http://10.39.178.173:8001/zinoct/oct-web-pc.git"
        // [GIT] 계정 인증 -> set up Http://${JENKINS_HOME}/Credentials
        GIT_CREDENTIAL = "lgzingitcredential"
        // [Slack] 빌드 알람 파라미터 설정
        SLACK_TOKEN = "slacktoken"
        SLACK_CHANNEL = "#jenkins"
        RED = "#F25749"
        GREEN = "#50BFA0"
        YELLOW = "#F2C438"
        BLUE = "#34A6BF"
    }
    parameters {
        string(name: 'PROJECT_NAME', defaultValue: 'zinoct', description: 'Backend 스프링 프로파일과 동일하게 설정')
        string(name: 'SERVER_TYPE', defaultValue: 'dev', description: 'Backend 스프링 프로파일과 동일하게 설정')
        // GIT branch 설정
        string(name: 'GIT_BRANCH', defaultValue: 'develop', description: 'GIT branch 설정')
        booleanParam(name: 'ICE4_START', defaultValue: true, description: '서버 START')
        booleanParam(name: 'ICE4_STOP', defaultValue: true, description: '서버 STOP')
        // Option for Offline build - 인터넷 불가능한 환경
        booleanParam(name: 'OFFLINE_BUILD', defaultValue: false, description: 'Yarn 오프라인 빌드(폐쇠망)')
        // Option for Slack Notification
        booleanParam(name: 'SLACK_NOTIFICAION', defaultValue: false, description: '슬랙 알람 사용 여부')
        // 빌드 진행 완료 후 jenkins 서버 내 파이프라인 폴더 소스 모두 삭제
        booleanParam(name: 'DELETE_JENKINS_WORKSPACE', defaultValue: true, description: '빌드 진행 완료 후 Jenkins 서버 내 workspace 폴더 소스 Clean')
        // [Flow Option] Option for Git checkout
        booleanParam(name: 'UES_GIT_CHECKOUT', defaultValue: true, description: '')
        // [Flow Option] Option for Build
        booleanParam(name: 'USE_BUILD', defaultValue: true, description: '')
        // [Flow Option] Option for Publish
        booleanParam(name: 'USE_PUBLISH', defaultValue: true, description: '')
        // [Flow Option] Option for DEPLOY
        booleanParam(name: 'USE_DEPLOY', defaultValue: true, description: '')
        // [Flow Option] Option for TEST
        booleanParam(name: 'USE_TEST', defaultValue: false, description: '')
    }
    stages {
        stage('Flow Check') {
            steps {
                script {
                    // Flow Check
                    echo "Flow Check \nUES_GIT_CHECKOUT = ${UES_GIT_CHECKOUT} \nUSE_BUILD = ${USE_BUILD} \nUSE_PUBLISH = ${USE_PUBLISH} \nUSE_DEPLOY = ${USE_DEPLOY} \nUSE_TEST = ${USE_TEST} \nDELETE_JENKINS_WORKSPACE = ${DELETE_JENKINS_WORKSPACE}"
                }
            }
        }
        stage('Parameter Check') {
            steps {
                script {
                    echo "DEPLOY_SERVER_NAME = ${DEPLOY_SERVER_NAME} \nGIT_BRANCH = ${GIT_BRANCH} \nROOT_PATH= ${ROOT_PATH} \nAPPLICAION_TYPE = ${APPLICAION_TYPE}"
                    // [Slack] Notification: start
                    if(SLACK_NOTIFICAION.equals("true")){
                        slackSend (
                            message: "Build Start ${currentBuild.fullDisplayName} (<${BUILD_URL}|Open>)\nGit Branch: ${GIT_BRANCH} \nBuild Start By `${CURRENT_BUILD_INFO.userName[0]}`",
                            username: "${JOB_NAME}", channel: "${SLACK_CHANNEL}", color: "${GREEN}", tokenCredentialId: "${SLACK_TOKEN}",
                        )
                    }
                }
            }
        }
        /* Git Check out
            UES_GIT_CHECKOUT = Use,
            Must be selected to check out git source
            Git Url : GIT_URL
            Git Branch : GIT_BRANCH or GIT_BRANCH_CUSTOM
            Auth : GIT_CREDENTIAL
        */
        stage('GIT Check Out') {
            steps {
                script {
                    if(UES_GIT_CHECKOUT.equals("true")){
                        echo "Git Check out:::Start: ${GIT_BRANCH}"
                        checkout([
                            $class: 'GitSCM',
                            userRemoteConfigs: [[
                                credentialsId: "${GIT_CREDENTIAL}", url: "${GIT_URL}"
                            ]],
                            branches: [[name: "${GIT_BRANCH}"]],
                            extensions: [[$class: 'CloneOption', timeout: 120]], gitTool: 'Default'
                        ])
                        sh 'rm -rf .git'
                        echo "Git Check out:::Finish: ${GIT_BRANCH}"
                    } else {
                        echo "Git Check out:::Skip"
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script{
                    if(USE_BUILD.equals("true")){
                        echo "Yarn Install and Build:::Start"
                        if(OFFLINE_BUILD.equals("true")){
                            retry(3) {
                                sh 'yarn install --offline'
                            }
                        } else {
                            retry(3) {
                                echo "Yarn Initial install:::Start"
                                sh "yarn install"
                                echo "Yarn Initial install:::Finish"
                            }
                        }
                        retry(3) {
                            echo "Yarn Build:::Start"
                            sh "yarn run build:${SERVER_TYPE}"
                            echo "Yarn Build:::Finish"
                        }
                        retry(3) {
                            echo "Achieve:::start"
                            sh "tar --exclude ${PROJECT_NAME}-${SERVER_TYPE}-${APPLICAION_TYPE}.tar -zcf ${PROJECT_NAME}-${SERVER_TYPE}-${APPLICAION_TYPE}.tar ./"
                            echo "Achieve:::finish"
                        }
                        echo "Yarn Install and Build:::Finish"
                    }else{
                        echo "Yarn Install and Build:::Skip"
                    }
                }
            }
        }
        stage('Deploy') {
            stages{
                stage('DEPLOY PROJECT') {
                    steps{
                        script {
                            echo "DEPLOY PROJECT:::Start"
                            def DEPLOY_SERVER_LIST = DEPLOY_SERVER_NAME.split(",")
                            for (int i = 0; i < DEPLOY_SERVER_LIST.size(); ++i) {
                                echo "Source Publish:::Start - ${DEPLOY_SERVER_LIST[i]}"
                                if(ICE4_STOP.equals("true")){
                                    echo "ICE4 STOP:::Start"
                                    sshPublisher(
                                        publishers: [
                                            sshPublisherDesc(
                                                transfers: [
                                                    sshTransfer(
                                                        execCommand: """
                                                            pm2 stop ecosystem.config.js --env ${SERVER_TYPE} || true
                                                        """,
                                                        remoteDirectory: "",
                                                        execTimeout: 1280000,
                                                        excludes: '', cleanRemote: false, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectorySDF: false,
                                                )],
                                                configName: "${DEPLOY_SERVER_LIST[i]}",
                                                usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true
                                    )])
                                    echo "ICE4 STOP:::Finish"
                                } else {
                                    echo "ICE4 STOP:::Skip"
                                }
                                if(USE_DEPLOY.equals("true")){
                                    echo "deploy start"
                                    if(USE_PUBLISH.equals("true")){
                                        echo "Source Publish:::Start - ${DEPLOY_SERVER_LIST[i]}"
                                        sshPublisher(
                                            publishers: [
                                                sshPublisherDesc(
                                                    transfers: [
                                                        sshTransfer(
                                                            execCommand: """
                                                                pm2 stop ecosystem.config.js --env ${SERVER_TYPE} || true
                                                                rm -rf ${ROOT_PATH}/${PROJECT_NAME}-${SERVER_TYPE}/${APPLICAION_TYPE}
                                                                mkdir -p ${ROOT_PATH}/${PROJECT_NAME}-${SERVER_TYPE}/${APPLICAION_TYPE}
                                                                cd ~/Deploy/publish/${APPLICAION_TYPE}
                                                                tar -zxf ${PROJECT_NAME}-${SERVER_TYPE}-${APPLICAION_TYPE}.tar -C ${ROOT_PATH}/${PROJECT_NAME}-${SERVER_TYPE}/${APPLICAION_TYPE}
                                                            """,
                                                            sourceFiles: "${PROJECT_NAME}-${SERVER_TYPE}-${APPLICAION_TYPE}.tar",
                                                            remoteDirectory: "publish/${APPLICAION_TYPE}",
                                                            execTimeout: 120000,
                                                            flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectorySDF: false, removePrefix: '', usePty: true, cleanRemote: false, excludes: ''
                                                    )],
                                                    configName: "${DEPLOY_SERVER_LIST[i]}",
                                                    usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true
                                        )])
                                        echo "Source Publish:::Finish - ${DEPLOY_SERVER_LIST[i]}"
                                    } else {
                                        echo "Source Publish:::Skip"
                                    }
                                    if(ICE4_START.equals("true")){
                                        echo "Start Project:::Start"
                                        sshPublisher(
                                            publishers: [
                                                sshPublisherDesc(
                                                    configName: "${DEPLOY_SERVER_LIST[i]}",
                                                    transfers: [
                                                        sshTransfer(
                                                            remoteDirectory: "",
                                                            execCommand: """
                                                                cd ${ROOT_PATH}/${PROJECT_NAME}-${SERVER_TYPE}/${APPLICAION_TYPE}
                                                                pm2 start ecosystem.config.js --env ${SERVER_TYPE}
                                                            """,
                                                            sourceFiles: '',
                                                            execTimeout: 2560000,
                                                            excludes: '', cleanRemote: false,  flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectorySDF: false,
                                                    )],
                                                    usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true
                                        )])
                                        echo "Start Project:::Finish"
                                    }else {
                                        echo "Start Project:::Skip"
                                    }
                                } else {
                                    echo "ICE4 Deploy:::Skip"
                                }
                                echo "DEPLOY PROJECT:::Finish"
                            }
                        }
                    }
                }
            }
        }
        stage('Test - Postman') {
            steps {
                script {
                    // if(USE_TEST.equals("true")){
                    //     try{
                    //       echo "Test start"
                    //       // sh "selenium-side-runner --debug --timeout 30000 --config-file selenium/config/chrome-${SERVER_LEVEL}.yml selenium/*.side"
                    //     } catch (Exception error){
                    //       slackSend (
                    //         message: "${SERVER_LEVEL} TEST Failed (<${BUILD_URL}|Open>) : \n${error}. ",
                    //         username: "${JOB_NAME}",
                    //         channel: "${SLACK_CHANNEL}",
                    //         color:"${RED}",
                    //         tokenCredentialId: "${SLACK_TOKEN}",
                    //       )
                    //       echo "${error}"
                    //       // break
                    //     }
                    //     echo "Test end"
                    //   }else{
                    echo "Test skip"
                    //   }
                }
            }
        }
    }
    post('Post') {
        always {
            echo "One way or another, I have finished. Result: ${currentBuild.result}"
            script {
                if(DELETE_JENKINS_WORKSPACE.equals("true")){
                    echo "Delete Jenkins Workspace Start"
                    deleteDir()
                    echo "Delete Jenkins Workspace Finish"
                } else {
                    echo "Delete Jenkins Workspace Skip"
                }
                def DEPLOY_SERVER_LIST = DEPLOY_SERVER_NAME.split(",")
                for (int i = 0; i < DEPLOY_SERVER_LIST.size(); ++i) {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                transfers: [
                                    sshTransfer(
                                        execCommand: """
                                            cd ~/Deploy/publish/${APPLICAION_TYPE}
                                            rm -rf ${PROJECT_NAME}-${SERVER_TYPE}-${APPLICAION_TYPE}.tar
                                        """,
                                        remoteDirectory: '',
                                        sourceFiles: "",
                                        execTimeout: 120000,
                                        flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectorySDF: false, removePrefix: '', usePty: true, cleanRemote: false, excludes: '',
                                )],
                                configName: "${DEPLOY_SERVER_LIST[i]}",
                                usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true
                    )])
                }
            }
        }
        success {
            // send slack message to notify start build process
            script {
                if(SLACK_NOTIFICAION.equals("true")){
                    slackSend (
                        message: "Deploy Success ${JOB_BASE_NAME} (<${BUILD_URL}|Open>)",
                        username: "${JOB_NAME}", channel: "${SLACK_CHANNEL}", color: "${GREEN}", tokenCredentialId: "${SLACK_TOKEN}",
                    )
                }
            }
            echo 'I succeeeded!'
        }
        failure {
            script {
                if(SLACK_NOTIFICAION.equals("true")){
                    slackSend (
                        message: "Deploy Failure ${JOB_BASE_NAME} (<${BUILD_URL}|Open>)",
                        username: "${JOB_NAME}", channel: "${SLACK_CHANNEL}", color:"${RED}", tokenCredentialId: "${SLACK_TOKEN}",
                    )
                }
            }
            echo 'I failed :('
        }
        unstable {
            script {
                if(SLACK_NOTIFICAION.equals("true")){
                    slackSend (
                        message: "Deploy Unstable ${JOB_BASE_NAME} (<${BUILD_URL}|Open>)",
                        username: "${JOB_NAME}", channel: "${SLACK_CHANNEL}", color:"${YELLOW}", tokenCredentialId: "${SLACK_TOKEN}",
                    )
                }
            }
            echo 'I am unstable :/'
        }
        changed {
            echo 'Things were different before...'
        }
    }
}
