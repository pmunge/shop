## Running the Project with Docker

This project provides a Docker setup for building and running the application using Node.js version `22.13.1` (as specified in the Dockerfile). The application exposes port `4000` for access, which is mapped in the Docker Compose configuration.

### Build and Run Instructions

1. **Build and start the application:**

   ```bash
   docker compose up --build
   ```

   This command builds the Docker image and starts the container. The application will be available on port `4000`.

2. **Access the application:**

   Open your browser and navigate to:

   ```
   http://localhost:4000
   ```

### Project-Specific Details

- **Node Version:** The Dockerfile uses Node.js `22.13.1-slim`.
- **Dependencies:** Production dependencies are installed after the build step for a lean final image.
- **User:** The container runs as a non-root user (`appuser`) for security.
- **Ports:**
  - `4000` is exposed by the application and mapped in Docker Compose.
- **Environment Variables:**
  - `NODE_ENV=production` and `NODE_OPTIONS="--max-old-space-size=4096"` are set in the container.
  - No additional environment variables are required unless you add a `.env` file (see `docker-compose.yml`).

### Special Configuration

- No external services (such as databases) are required for this setup.
- No persistent volumes or custom networks are defined.
- If you need to add environment variables, uncomment the `env_file` line in `docker-compose.yml` and provide a `.env` file.

---

_These instructions are up to date with the current Docker setup. If you add new services or environment variables, update this section accordingly._
