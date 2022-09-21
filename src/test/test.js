const mongoose = require("mongoose");

async function loadMongo() {
  let db = await mongoose.connect(global.__MONGO_URI__ + global.mongoDBName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  global.db = db;
}

describe("Form controller and service file", () => {
  beforeAll(async () => {
    await loadMongo();

    return;
  });

  test("just sample test", async () => {
    expect("").toEqual("");
  });
  afterAll(async () => {
    try {
      mongoose.connection.close();
    } catch (error) {
      console.log(`
            You did something wrong
            ${error}
          `);
      throw error;
    }
  });
});
