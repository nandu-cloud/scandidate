let fs = require("fs");
var path = require("path");
const { exec } = require("child_process");
// const port = process.env.PORT || 4200;
const server_url = process.env.UAT_SERVER_URL;
const version = process.env.UI_VERSION || "1.0.0";

const data = new Uint8Array(
  Buffer.from(`
export const environment = {
  production:true,
  apiUrl:'${server_url}',
  version:'${version}'
};
`)
);
const filePath = path.join(__dirname, "./src/environments/environment.uat.ts");

var codeBuildProcess = function () {
  fs.open(filePath, "w", (err, fd) => {
    fs.writeFile(fd, data, (err) => {
      if (err) throw err;
      fs.close(fd, (err) => {
        if (err) throw err;
      });
      console.log("UAT ENV has been saved!");
      console.log("building...");
      exec("ng build --configuration uat", (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err);
        } else {
          // the *entire* stdout and stderr (buffered)
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        }
      });
    });
  });
};

codeBuildProcess();
