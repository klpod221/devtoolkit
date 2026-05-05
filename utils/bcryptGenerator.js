import bcrypt from "bcryptjs";

const bcryptGenerator = async (input, salt) => {
  const saltRounds = bcrypt.genSaltSync(Number(salt));
  let hashed = await bcrypt.hash(input, saltRounds);

  hashed = hashed.replace(/^\$2a/, "$2y");

  return hashed;
};

export default bcryptGenerator;
