// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'https://api-football-v1.p.rapidapi.com',
  apiFixtureUrl: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  apiFootballKey: 'e1b78c6d0cmsh6d18875822c8685p1e86e0jsn73d5eaeaf629',
  apiFootballHost: 'api-football-v1.p.rapidapi.com',
  firebaseConfig: {
    apiKey: "AIzaSyCDDpphrxPonBetBRinheA63IoLcE2O1Ig",
    authDomain: "project-backend-frameworks.firebaseapp.com",
    projectId: "project-backend-frameworks",
    storageBucket: "project-backend-frameworks.appspot.com",
    messagingSenderId: "295838732722",
    appId: "1:295838732722:web:2d2c2e132e73268f3094ab"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
