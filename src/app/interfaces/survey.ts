import { enumCustomerServiceQuality } from "../enums/customerServiceQuality";
import { enumFoodTemperature } from "../enums/foodTemperature";
import { enumLikedAspects } from "../enums/likedAspects";

export interface qualitySurvey
{
    customerService : enumCustomerServiceQuality; //Radio
    foodTemperature : enumFoodTemperature; //Select
    mostLikedAspects : Array<enumLikedAspects>; //Check
    overallQuality : number; //Range
    comment : string; //Input
}