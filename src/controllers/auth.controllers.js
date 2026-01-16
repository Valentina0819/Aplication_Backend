export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({
      username,
      password,
    });

    const userSaved = await newUser.save();
    res.json(userSaved);
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {
  res.send("User logged in");
};
