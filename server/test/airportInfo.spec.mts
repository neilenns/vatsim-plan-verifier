import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";
import { describe, it } from "mocha";
import { getAirportInfo } from "../src/controllers/airportInfo.mjs";

import { AirportInfoDocument } from "../src/models/AirportInfo.mjs";
import { SuccessResult } from "../src/types/result.mjs";

describe("Airport info pre-cached data tests", function () {
  let stub: MockAdapter;

  before(() => {
    stub = new MockAdapter(axios);

    // Mock the magnetic declination call
    stub
      .onGet(
        "https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=45.6950953&lon1=-118.8433686&key=zNEw7&resultFormat=json"
      )
      .reply(200, {
        result: [
          {
            date: 2023.6055,
            elevation: 1000,
            declination: 14.06997,
            latitude: 45.6951,
            declnation_sv: -0.0935,
            declination_uncertainty: 0.38785,
            longitude: -118.84337,
          },
        ],
        model: "WMM-2020",
        units: {
          elevation: "km",
          declination: "degrees",
          declination_sv: "degrees",
          latitude: "degrees",
          declination_uncertainty: "degrees",
          longitude: "degrees",
        },
        version: "0.5.1.11",
      });
  });

  after(() => {
    stub.restore();
  });

  it("should return KSEA data", async function () {
    const result = await getAirportInfo("KSEA");
    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<AirportInfoDocument>).data;
    expect(data.airportCode).to.equal("KSEA");

    const magneticDeclination = await data.getMagneticDeclination();
    expect(magneticDeclination).to.not.equal(undefined);
  });

  it("should return KPDX data", async function () {
    const result = await getAirportInfo("KPDX");
    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<AirportInfoDocument>).data;
    expect(data.airportCode).to.equal("KPDX");

    const magneticDeclination = await data.getMagneticDeclination();
    expect(magneticDeclination).to.not.equal(undefined);
  });

  it("should return magnetic declination", async function () {
    let result = await getAirportInfo("KPDT");
    expect(result.success).to.equal(true);

    // Should get a value back from getMagneticDeclination
    const data = (result as SuccessResult<AirportInfoDocument>).data;

    const magneticDeclination = await data.getMagneticDeclination();
    expect(magneticDeclination).to.not.equal(undefined);
  });
});
