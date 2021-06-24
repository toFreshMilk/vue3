FROM node:13

USER root

LABEL maintainer="I-ON DXP"

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

ARG SERVER_LEVEL
ENV SERVER_LEVEL=$SERVER_LEVEL

ARG JENKINS_WORKSPACE
ENV JENKINS_WORKSPACE=$JENKINS_WORKSPACE

ARG DOCKER_PORT
ENV DOCKER_PORT=$DOCKER_PORT

# Time Zone config
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ARG WORKSPACE=/root/${JENKINS_WORKSPACE}

WORKDIR ${WORKSPACE}

VOLUME home/ec2-user/${JENKINS_WORKSPACE}

RUN chmod 775 -R ${WORKSPACE}

COPY package.json package.json

# RUN yarn install

COPY . ${WORKSPACE}

EXPOSE ${DOCKER_PORT}

ENTRYPOINT yarn run start:$SERVER_LEVEL
