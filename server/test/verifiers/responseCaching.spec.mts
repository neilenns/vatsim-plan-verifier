import { describe, it } from "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { app } from "../../src/server.mjs";
import {
  addFlightPlans,
  removeFlightPlans,
} from "../setup/manageFlightPlans.mjs";
import { serverSetup, serverTeardown } from "../setup/manageServer.mjs";

chai.use(chaiHttp);

const testData = [
  // Wrong altitude for direction of flight (eastbound)
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5a",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 200,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4c",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "C172",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("verifier: responseCaching tests", function () {
  before("Start server", function () {
    serverSetup();
  });

  before("Add flight plans for tests", async function () {
    await addFlightPlans(testData);
  });

  after("Stop server", async function () {
    await serverTeardown();
  });

  after("Remove flight plans for tests", async function () {
    await removeFlightPlans(testData);
  });

  describe("verifier: one result", async function () {
    it("should not be cached data for one result", () => {
      chai
        .request(app)
        .get("/verify/altitudeForDirectionOfFlight/5f9f7b3b9d3b3c1b1c9b4b5a")
        .then((res) => {
          expect(res).have.status(200);
          expect(res.header).not.have.property("X-Existing-Results");
        })
        .catch((err) => {
          throw err;
        });
    });

    it("should be cached data for one result", async () => {
      chai
        .request(app)
        .get("/verify/altitudeForDirectionOfFlight/5f9f7b3b9d3b3c1b1c9b4b5a")
        .then((res) => {
          expect(res).have.status(200);
          expect(res.header).have.property("X-Existing-Results");
          expect(res.body).to.be.an("array");
          expect(res.body).lengthOf(1);
        })
        .catch((err) => {
          throw err;
        });
    });

    it("should not be cached data for multiple results", async function () {
      chai
        .request(app)
        .get("/verify/all/5f9f7b3b9d3b3c1b1c9b4b4c")
        .then((res) => {
          expect(res).have.status(200);
          expect(res.header).not.have.property("X-Existing-Results");
          expect(res).to.be.json;
        })
        .catch((err) => {
          throw err;
        });
    });

    it("should be cached data for multiple results", async function () {
      chai
        .request(app)
        .get("/verify/all/5f9f7b3b9d3b3c1b1c9b4b4c")
        .then((res) => {
          expect(res).have.status(200);
          expect(res.header).have.property("X-Existing-Results");
          expect(res.body).to.be.an("array");
          expect(res.body).length.greaterThan(1);
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});
