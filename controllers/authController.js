import { registerUser, loginUser } from "../services/authService.js";

export async function registerController(req, res) {
  try {
    const { username, password, role } = req.body;
    const user = await registerUser(username, password, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function loginController(req, res) {
  try {
    const { username, password } = req.body;
    const { user, token } = await loginUser(username, password);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
