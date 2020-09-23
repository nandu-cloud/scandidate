let fs = require("fs");
var path = require("path");
const { exec } = require("child_process");
// const port = process.env.PORT || 4200;
const server_url = process.env.PROD_SERVER_URL;
const version = process.env.UI_VERSION || "1.0.0";

const data = new Uint8Array(
  Buffer.from(`
export const environment = {
  production:true,
  baseUrl:'${server_url}',
  version:'${version}'
};
`)
);
const filePath = path.join(__dirname, "./src/environments/environment.prod.ts");

var codeBuildProcess = function () {
  fs.open(filePath, "w", (err, fd) => {
    fs.writeFile(fd, data, (err) => {
      if (err) throw err;
      fs.close(fd, (err) => {
        if (err) throw err;
      });
      console.log("Production ENV has been saved!");
      console.log("building...");
      exec("ng build --prod", (err, stdout, stderr) => {
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
