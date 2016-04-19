#! /usr/bin/env node

import 'source-map-support/register';
import './build/buildMain';

function readConfigFile () {
  var filePath = path.join(home, '/.nativefier.json');

  if (!fileExists(filePath)) {
    console.log("No " + filePath + " found. Exiting");

    return;
  } else {
    try {
      apps = JSON.parse(fs.readFileSync(filePath));
    } catch (e) {
      console.error(filePath + " could not be parsed as json");

      return;
    }

    apps.forEach(function(app) {
      buildMain(app, (error, appPath) => {
          if (error) {
              console.error(error);
              return;
          }

          if (!appPath) {
              // app exists and --overwrite is not passed
              return;
          }
          console.log(`App built to ${appPath}`);
      });
    });
  }
}
