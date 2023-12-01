const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "moviesData.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(2372, () =>
      console.log("Server Running at http://localhost:9898/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

const snaketocamel = (obj) => {
  return {
    stateId: obj.state_id,
    stateName: obj.state_name,
    population: obj.population,
  };
};

/*app.get("/state/", async (request, response) => {
  const query = `SELECT*FROMstate;`;
  const res = await db.all(query);
  response.send(
    res.map((each) => {
      return snaketocamel(each);
    })
  );
});*/
app.get("/state/", async (request, response) => {
  const query = `
    SELECT *
    FROM state
    ORDER BY state_id;`;
  const statearray = await db.all(query);
  const responsed = statearray.map((each) => {
    return snaketocamel(each);
  });
  response.send(responsed);
});
