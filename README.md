## Setup & Use

### Project Initialization

- Clone this repo, enter it
- Run command `npm install`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

### Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _Nodemon_ : Allows to restart the server everytime a .js file is udated
