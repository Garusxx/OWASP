import mysql from "mysql2/promise";

export const db = mysql.createPool({
  uri: "mysql://root:jssMOERLoKfmHpagzgWFCNgxEljYJQPs@shuttle.proxy.rlwy.net:21257/railway",
});
