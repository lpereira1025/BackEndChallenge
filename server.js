const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./database.json');
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789';
const expiresIn = '1h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

function emailExists(email) {
  return userdb.users.some((user) => user.email === email);
}

function isAuthenticated({ email, password }) {
  return userdb.users.findIndex((user) => user.email === email && user.password === password) !== -1;
}

server.post('/auth/register', (req, res) => {
  console.log('register endpoint called; request body:');
  console.log(req.body);
  const { name, email, password } = req.body;


  if (emailExists(email)) {
    const status = 401;
    const message = 'Email already exists';
    res.status(status).json({ status, message });
    return;
  }


  const newId = userdb.users.length > 0 ? userdb.users[userdb.users.length - 1].id + 1 : 1;


  const newUser = { id: newId, name, email, password };
  userdb.users.push(newUser);


  fs.writeFile('./users.json', JSON.stringify(userdb), (err) => {
    if (err) {
      const status = 500;
      const message = 'Failed to write user data';
      res.status(status).json({ status, message });
      return;
    }

  
    const access_token = createToken({ email, password });
    console.log('Access Token:' + access_token);
    res.status(200).json({ name, access_token });
  });
});

server.post('/auth/login', (req, res) => {
  console.log('login endpoint called; request body:');
  console.log(req.body);
  const { email, password } = req.body;


  const user = userdb.users.find((user) => user.email === email && user.password === password);
  if (!user) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }


  const access_token = createToken({ email, password });
  console.log('Access Token:' + access_token);


  res.status(200).json({ name: user.name, access_token });
});

server.get('/events', (req, res) => {

  const events = router.db.get('events').value();
  res.status(200).json(events);
});

server.get('/events/:id', (req, res) => {
  const eventId = req.params.id;


  const event = router.db.get('events').find({ id: eventId }).value();

  if (!event) {
    const status = 404;
    const message = 'Evento não encontrado';
    res.status(status).json({ status, message });
    return;
  }


  res.status(200).json(event);
});

server.patch('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const updatedEvent = req.body;

  if (!Object.keys(updatedEvent).length) {
    return res.status(400).json({ message: "Nenhum dado fornecido para atualização" });
  }

  const event = router.db.get('events').find({ id: eventId }).value();
  if (!event) {
    return res.status(404).json({ message: "Evento não encontrado" });
  }

  router.db.get('events')
    .find({ id: eventId })
    .assign(updatedEvent)
    .write();

  const updatedData = router.db.get('events').find({ id: eventId }).value(); // Recupera os dados após a atualização
  res.status(200).json(updatedData);
});

server.delete('/events/:id', (req, res) => {
  const eventId = req.params.id;

  const event = router.db.get('events').find({ id: eventId }).value();
  if (!event) {
    const status = 404;
    const message = 'Evento não encontrado';
    res.status(status).json({ status, message });
    return;
  }

  router.db.get('events').remove({ id: eventId }).write();

  res.status(200).json({ message: 'Evento excluído com sucesso' });
});
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({ status, message });
    return;
  }
  try {
    const verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = 'Access token not provided';
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access_token is revoked';
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(8000, () => {
  console.log('Run Auth API Server');
});