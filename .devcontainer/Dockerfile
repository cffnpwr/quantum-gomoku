FROM node:lts

ARG UID=1000
ARG GID=1000
ARG USERNAME=node

WORKDIR /workspace

RUN apt-get update && \
  apt-get install -y --no-install-recommends sudo curl gpg openssh-client ca-certificates && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  corepack enable && \
  echo "${USERNAME}   ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER ${USERNAME}
