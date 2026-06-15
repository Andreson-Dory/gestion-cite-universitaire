import bcrypt from "bcrypt";

const password = "";

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log("HASHED PASSWORD:");
  console.log(hash);
});
