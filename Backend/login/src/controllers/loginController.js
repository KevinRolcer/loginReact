const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findUserByEmail(email); 

  if (!user) return res.status(400).json({ error: 'Correo incorrecto' });

  const match = await bcrypt.compare(password, user.passw); 
  if (!match) return res.status(400).json({ error: 'Contraseña inválida' });

  res.json({ message: 'Login exitoso', name: user.name });
};