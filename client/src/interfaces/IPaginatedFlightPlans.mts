import IFlightPlan from "./IFlightPlan.mts";

export default interface IPaginatedFlightPlans {
  pages: number;
  flightPlans: IFlightPlan[];
}
