const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('./../src/app');
const User = require('./../src/models/user.model');

const userId = new mongoose.Types.ObjectId();
const user = {
  _id: userId,
  name: 'Mike',
  email: 'mike@gmail.com',
  password: '1111111',
  tokens: [
    {
      token: jwt.sign({ _id: userId }, process.env.TOKEN_SIGNATURE)
    }
  ]
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(user).save();
});

afterEach(() => {});

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/auth/registration')
    .send({
      name: 'Test user',
      email: 'test@gmail.com',
      password: '1111111'
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'Test user',
      email: 'test@gmail.com'
    },
    token: user.tokens[0].token
  });

  expect(user.password).not.toBe('1111111');
});

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/auth/login')
    .send({
      email: user.email,
      password: user.password
    })
    .expect(200);

  // Assertions
  const loginedUser = await User.findById(user._id);
  expect(loginedUser.tokens[0].token).toBe(response.body.token);
});

test('Should not login nonexistent user', async () => {
  await request(app)
    .post('/auth/login')
    .send({
      email: '1' + user.email,
      password: user.password
    })
    .expect(400);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Sholud not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Should delete account for user', async () => {
  await request(app)
    .delete(`/users/${userId}`)
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send()
    .expect(200);

  const deletedUser = await User.findById(user._id);
  expect(deletedUser).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete(`/users/${userId}`)
    .send()
    .expect(401);
});

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200);

  const userOne = await User.findById(userId);
  expect(userOne.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
  await request(app)
    .patch(`/users/${userId}`)
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send({
      name: 'Bearer'
    })
    .expect(200);

  const updatedUser = await User.findById(userId);
  expect(updatedUser.name).toBe('Bearer');
});

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch(`/users/${userId}`)
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send({
      location: 'Kyiv'
    })
    .expect(418);

  const updatedUser = await User.findById(userId);
  expect(updatedUser.location).toBeUndefined();
});
