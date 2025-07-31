FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# Install Nginx and clean up
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends nginx ca-certificates && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Create app directory in nginx root
RUN mkdir -p /var/www/html/game-deals-tracker

# Copy your static frontend files into the container
COPY ./game-deals-tracker/ /var/www/html/game-deals-tracker/

# Configure nginx to serve your app
RUN rm /etc/nginx/sites-enabled/default && \
    echo 'server {\n\
        listen 80;\n\
        server_name localhost;\n\
        root /var/www/html/game-deals-tracker;\n\
        index index.html;\n\
        location / {\n\
            try_files $uri $uri/ =404;\n\
        }\n\
    }' > /etc/nginx/sites-available/game-deals && \
    ln -s /etc/nginx/sites-available/game-deals /etc/nginx/sites-enabled/

EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
