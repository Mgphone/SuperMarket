# Money Exchange Backend System

This repository contains the backend code for a money exchange system. The system provides endpoints for managing transitions, branches, and currency exchange rates.

## Getting Started

To set up and run the backend system locally, follow these instructions:

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/MgPhone/SuperMarketBE.git
   ```

2. Navigate to the project directory:

   ```bash
   cd backend
   ```

3. Create a `.env` file:

   Copy the contents of the `env_sample` folder into a new file named `.env` in the project directory. Update the variables in the `.env` file with your specific configurations, such as database connection strings and API keys.

4. Build the Docker image:

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

2. Access the backend services:

   Once the containers are up and running, you can access the backend services by navigating to `http://localhost:5000` in your web browser or sending requests using Postman.

3. Test the endpoints:

   Use the provided Postman template (`money-exchange.postman_collection.json`) to test the endpoints of the backend. Import the Postman template into Postman and execute the requests to interact with the money exchange system.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

