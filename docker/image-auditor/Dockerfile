FROM node:4.3.1
MAINTAINER David Jaquet <david.jaquet@heig-vd.ch>

COPY src /opt/app/

WORKDIR /opt/app/
RUN ["npm","install","moment","--save"]

ENTRYPOINT ["node", "/opt/app/Auditor.js"]