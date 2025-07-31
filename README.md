# Docker Project Documentation

## 🐳 Image Details

- **Docker Hub Repository:**  
  `https://hub.docker.com/repository/docker/<your-dockerhub-username>/<image-name>`

- **Image Name:**  
  `<your-dockerhub-username>/<image-name>`

- **Tags:**  
  - `latest`  
  - `v1` (or other version tags as applicable)

---

## 🏗️ Build Instructions

To build the Docker image locally, run:

```bash
docker build -t <your-dockerhub-username>/<image-name>:v1 .



-  **Run Instructions (Web01 / Web02):**
docker run -d --name web01 -p 8080:80 <your-dockerhub-username>/<image-name>:v1
docker run -d --name web02 -p 8081:80 <your-dockerhub-username>/<image-name>:v1


- ** Load Balancer Configuration (HAProxy)**  
- ## Example HAProxy snippet (/etc/haproxy/haproxy.cfg):

global
    daemon
    maxconn 256
    log stdout format raw local0

defaults
    mode http
    log global
    option httplog
    option dontlognull
    timeout connect 5s
    timeout client 50s
    timeout server 50s

frontend http-in
    bind *:8082
    default_backend servers

backend servers
    balance roundrobin
    http-response set-header X-Served-By %[srv_name]
    server web01 172.20.0.11:80 check
    server web02 172.20.0.12:80 check

-  **Testing Steps & Evidence**
   curl -I http://localhost:8080

- **Hardening Steps (Handling Secrets)**
services:
  web-01:
    environment:
      - API_KEY=${API_KEY}
