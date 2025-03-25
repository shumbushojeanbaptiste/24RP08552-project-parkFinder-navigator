# ParkFinder Navigator

ParkFinder Navigator is a microservices-based application designed to help users find, book, and manage parking spaces efficiently. The system consists of multiple services that work together to provide a comprehensive parking management solution.

## Project Structure

```
├── backend/              # Main backend service
├── frontend/             # User interface
├── jenkins/              # Jenkins pipeline configuration
├── k8s/                  # Kubernetes deployment manifests
└── microservice/
    ├── park-service/     # Handles park-related operations
    ├── fee-calculator/   # Calculates parking fees
    └── slot-finder/      # Manages parking slot availability
```

## Features

- Park space management and booking
- Real-time slot availability checking
- Dynamic fee calculation
- User-friendly interface
- Automated CI/CD pipeline
- Containerized deployment
- Kubernetes orchestration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)
- Docker and Docker Compose
- Kubernetes cluster (for production deployment)
- Jenkins (for CI/CD)

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/0788644687/24RP08552-project-parkFinder-navigator
   cd 24RP08552-project-parkFinder-navigator
   ```

2. Install dependencies for each service:
   ```bash
   # Install backend dependencies
   cd backend && npm install

   # Install microservice dependencies
   cd ../microservice/park-service && npm install
   cd ../fee-calculator && npm install
   cd ../slot-finder && npm install
   ```


4. Start the services:
   ```bash
   # Start backend service
   cd backend && npm start

   # Start microservices
   cd ../microservice/park-service && npm start
   cd ../fee-calculator && npm start
   cd ../slot-finder && npm start
   ```

### Docker Deployment

1. Build and run using Docker Compose:
   ```bash
   docker-compose up --build
   ```

### Kubernetes Deployment

1. Update Kubernetes manifests in `k8s/` directory with your configuration
2. Apply the manifests:
   ```bash
   kubectl apply -f k8s/
   ```

## Testing

Each service includes its own test suite using Jest. To run tests:

```bash
# Run backend tests
cd backend
npm test

# Run park-service tests
cd ../microservice/park-service
npm test

# Run other service tests similarly
```

## CI/CD Pipeline

The project uses Jenkins for continuous integration and deployment:

1. Automated testing for all services
2. Docker image building and pushing
3. Kubernetes deployment updates

Pipeline stages:
- Code checkout
- Dependencies installation
- Test execution
- Docker image building
- Image pushing to registry
- Kubernetes deployment

## API Documentation

### Backend Service
- `GET /api/parks` - List all parks
- `GET /api/parks/:id` - Get park details
- `POST /api/parks` - Create a new park
- `PUT /api/parks/:id` - Update park information
- `DELETE /api/parks/:id` - Delete a park

### Fee Calculator Service
- `POST /api/calculate-fee` - Calculate parking fee

### Slot Finder Service
- `GET /api/slots` - Get available parking slots
- `GET /api/slots/:id` - Get specific slot details

## Database Configuration

### MongoDB Setup

1. Local Development:
   ```bash
   # Start MongoDB service on your machine
   # Default connection URL: mongodb://localhost:27017
   ```

2. Docker Environment:
   ```yaml
   # In docker-compose.yml
   mongodb:
     image: mongo:4.4
     ports:
       - "27017:27017"
     volumes:
       - mongodb_data:/data/db
   ```

3. Production Environment:
   - Use MongoDB Atlas or self-hosted MongoDB
   - Configure connection string in environment variables
   - Ensure proper authentication and network security

### Data Models

```javascript
// Park Schema
{
  id: String,
  name: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  totalSlots: Number,
  availableSlots: Number,
  ratePerHour: Number
}

// Booking Schema
{
  id: String,
  parkId: String,
  slotNumber: Number,
  startTime: Date,
  endTime: Date,
  status: String
}
```

## Environment Variables

```env
# Backend Service
PORT=3000
MONGO_URI=mongodb://localhost:27017/parkfinder
MONGO_DB_NAME=parkfinder
MONGO_USER=user
MONGO_PASSWORD=password

# Fee Calculator
PORT=3001
BASE_RATE=2.00

# Slot Finder
PORT=3002

# Docker Registry
DOCKER_REGISTRY=your-registry
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request