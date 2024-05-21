Certainly! Here is the updated README with instructions for setting up both the backend and frontend services, along with usage guidance:

```markdown
# Money Exchange Backend and Frontend System

This repository contains the backend and frontend code for a money exchange system. The backend provides endpoints for managing transactions, branches, and currency exchange rates, while the frontend serves as the user interface for interacting with the system.

## Getting Started

To set up and run the backend and frontend system locally, follow these instructions:

### Prerequisites

- Docker
- Docker Compose
- Node.js and npm (for frontend development)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/MgPhone/SuperMarketBE.git
   ```

2. Navigate to the project directory:

   ```bash
   cd SuperMarketBE
   ```

3. Create a `.env` file:

   Copy the contents of the `env_sample` folder into a new file named `.env` in the project directory. Update the variables in the `.env` file with your specific configurations, such as database connection strings and API keys.

4. Build the Docker images:

   ```bash
   docker-compose build
   ```

### Docker Installation

To run this project, you'll need Docker installed on your system. We recommend using Docker Desktop, which provides an easy-to-use interface for managing Docker containers on both Windows and macOS.

Follow these steps to install Docker Desktop:

- For Windows: [Install Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
- For macOS: [Install Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

If you're using Linux, you can install Docker Engine by following the instructions [here](https://docs.docker.com/engine/install/).

### Usage

1. Start the Docker containers:

   ```bash
   docker-compose up -d
   ```

2. Set up the frontend:

   Navigate to the frontend directory, install the dependencies, and start the development server:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Access the frontend and backend services:

   - Frontend: Navigate to `http://localhost:5173` in your web browser.
   - Backend: Once the containers are up and running, you can access the backend services by navigating to `http://localhost:5000` in your web browser or sending requests using Postman.

4. Test the endpoints:

   Use the provided Postman template (`money-exchange.postman_collection.json`) to test the endpoints of the backend. Import the Postman template into Postman and execute the requests to interact with the money exchange system.
```

This README now includes comprehensive instructions for setting up both the backend and frontend services, along with usage guidance.
