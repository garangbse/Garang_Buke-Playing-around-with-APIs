# 🎮 Game Deals Tracker

A simple frontend-only web app that fetches game deals using the [CheapShark API](https://apidocs.cheapshark.com/).

## Features

- Select store (e.g., Steam, Epic, etc.)
- Search by game title (with dropdown suggestions)
- Filter by minimum discount
- View real-time game deals with:
  - Game title
  - Original and sale price
  - Store name
  - Discount %
  - Game thumbnail
  - Link to deal

# 🛠️ Technologies Used

This project utilizes the following technologies and tools:

- **HTML/CSS**  
  For structuring and styling the frontend user interface.

- **JavaScript (Frontend-only)**  
  Handles fetching data from the CheapShark API and dynamically updating the UI.

- **Docker**  
  Containerizes the frontend app and other components for consistent deployment environments.

- **Docker Compose**  
  Manages multi-container setups including frontend instances and the HAProxy load balancer.

- **HAProxy**  
  Provides load balancing across multiple frontend containers, improving reliability and scalability.

- **Curl**  
  Used for testing HTTP endpoints both inside containers and from the host machine.

- **CheapShark API**  
  External API providing real-time game deal data, including prices, discounts, and store information.  
  Official docs: [https://apidocs.cheapshark.com/](https://apidocs.cheapshark.com/)


## Deployment (Docker)

1. Create a simple Dockerfile:

```Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html


## 🚀 Running the App Locally

Follow these steps to set up and run the Game Deals Tracker on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/game-deals-tracker.git
   cd game-deals-tracker

2.  **Build and start the Docker containers with Docker Compose:**

  ```bash
  Copy code
  docker compose up --build -d

3.  **Access the application:**

  Open your web browser and visit:
  http://localhost:8080

# 📡 API Used

- **CheapShark API**  
  Used to fetch real-time game deal data including title, price, discount percentage, and store info.  
  [Official Documentation](https://apidocs.cheapshark.com/)

---

## ⚠️ Challenges and How They Were Overcome

- **Docker Configuration:**  
  Ensuring proper installation, assigning of ports, and configuring Docker and Docker Compose correctly to run multiple containers with proper networking.

- **Network Errors Debugging:**  
  Encountered errors like "connection reset by peer" when accessing the load balancer from the local machine. Debugged by verifying container networking, port exposure, and load balancer HAProxy configuration.

- **Load Balancer Setup:**  
  Configured HAProxy with backend servers correctly, tested load balancing inside the container. While requests worked inside the container, there was an unresolved issue with curl requests failing from the host machine.

- **Port Conflicts:**  
  Ensured ports used in Docker Compose were free on the host machine before binding to avoid conflicts.
 

---

## 🙏 Credits

- Thanks to the [CheapShark API developers](https://apidocs.cheapshark.com/) for providing a reliable data source.  
- Open source communities for Docker, HAProxy, and related tools used.  
- Any external libraries or resources referenced in the project code.