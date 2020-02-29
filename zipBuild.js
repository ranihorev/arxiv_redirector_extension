const admZip = require("adm-zip");
const zip = new admZip();
zip.addLocalFolder(`${__dirname}/build`);
zip.writeZip("./output.zip");
