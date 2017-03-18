import { OpaqueToken } from "@angular/core";

// Although the ApplicationConfig interface plays no role in dependency injection, 
// it supports typing of the configuration object within the class.
export interface ApplicationConfig {
  BASE_API_URL: string;
  TIME_OUT:number;
  SERVER_TIMEOUT: string;
}

// Configuration values for our app
export const MY_CONFIG: ApplicationConfig = {
  //BASE_API_URL:"http://virarchaserver.laurus-it.com/allana/api/json"
  BASE_API_URL:"http://192.168.0.105/totus/api/json",
  //Server Sampark Url
  TIME_OUT: 15000,
  //BASE_API_URL:"http://182.74.54.62/totus/api/json",
  SERVER_TIMEOUT: "{'status':'error','message':'Unable to Connect to server','code':'CREDOPRO_EX_0001'}"
  //BASE_API_URL: "/json"
};

// Create a config token to avoid naming conflicts
export const MY_CONFIG_TOKEN = new OpaqueToken('config');
