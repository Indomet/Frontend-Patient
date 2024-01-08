# Frontend Patient

This frontend handles all patient related functions, requesting CRUD operations, and api requests to get map from mapboxgl.

# Setup

## Local install
Clone the latest code

```
git clone git@git.chalmers.se:courses/dit355/2023/student-teams/dit356-2023-04/frontend-patient.git
```

In the repository, create a .env file in the root directory, same directory as .env.dist, and follow the instructions inside .env.dist.


# Run it easily with Docker

In the client directory, run:

```
docker build -t image_name .

docker run -p computer_port:container_port image_name
```
# Run it without Docker
In client directory, run:

```
npm install

npm run dev
```
