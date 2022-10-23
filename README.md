## Machado Lab Programming Challenge
Challenge Link : (https://github.com/machado-lab/programming-challenge)

Hi! This is a single-page Web Application developed to view the population and movement of animal species.

**Technologies Used :** 
- Backend: Flask
- SPA Web Client Framework: Reactjs
- Frontend: HTML, CSS, Javascript, JavaScript XML
- Relational database: PostgreSQL

## About the Application
The Application is a single-page web application and all activities are asynchronously performed, ie. the whole page is not refreshed/reloaded. Following are the main activities:
1. Population
- List of all premises is loaded in a table which shows all details about the Premise.
- Details include: Name, Address, City, State, Postal Code, Latitude & Longitude.
- The grid also contains the current total count of animals present at the premise.
2. Movements
- List of all movement records is loaded in a table which shows all movement related details.
- Details include: Company Name, Species, Reason, Moved Count, Start Date, Origin Premise Id & Destination Premise Id.
- A provision to add a movement record is provided within the component, which adds a row within the grid (without reloading the webpage or the whole grid).
- Upon adding a new movement record, the population data also gets updated accordingly.

## Pre-Requisites
1. **Python**:
- For the backend, Python is required to be installed on the system.
- Installation link is available [here](https://www.python.org/downloads/)<br />
- To check if Python has been installed correctly on the system, run the following command on cmd. <br />
    ```console
    python --version
    ```

2. **PostgreSQL**:
- PostgreSQL needs to be installed on the system to run the script file provided [here](https://github.com/nehakale8/RABapp_Task/blob/master/db-scripts.psql). <br />
- Installation link is available [here](https://www.postgresql.org/download/). <br />
- Additionally, add the path of bin folder to the ```PATH``` environment variable. <br />
- To check if PostgreSQL has been installed correctly on the system, run the following command on cmd. <br />
    ```console
    psql --version
    ```
- After successful installation of PostgreSQL, execute the following script in cmd. <br />
    ```console
    psql -h localhost -d postgres -U postgres -p 5432 -a -q -f <Local_Repo_Location>/ProgrammingChallenge/db-scripts.psql
    ```
> **Please note**: You might be prompted to provide the password for postgres user in cmd to execute the script.

> **Please note**: Replace <Local_Repo_Location> with the file path at which this GitHub repository has been cloned.


## Run the application
To run the application, following commands are required to be executed
```console
cd <Local_Repo_Location>/RABapp_Task/backend
flask run
```
After the backend is up and running
```console
cd <Local_Repo_Location>/RABapp_Task/frontend
npm install
npm i axios
npm start
```
> **Please note**: Replace <Local_Repo_Location> with the file path at which this GitHub repository has been cloned.



## Application Demo
[This drive link](https://drive.google.com/drive/folders/1x5R5eo9i3RUS2Q1oJZIcWsvJhy67WxFa?usp=sharing) contains the screen recording of the application to demonstrate the various features of the application.
