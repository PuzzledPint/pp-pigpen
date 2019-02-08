const { setup, teardown } = require('./helpers');

describe('User profile rules', () => {
  afterEach(async () => {
    await teardown();
  });

  test('fail when not authenticated', async () => {
    const db = await setup();

    const userRef = db.collection('user');

    await expect(userRef.get()).toDeny();
    await expect(userRef.add({})).toDeny();
  });

  const user = {
    uid: 'test',
    email: 'test@test.com'
  };

  test('pass when getting my profile', async () => {
    const db = await setup(user);

    const userRef = db.collection('user');

    await expect(userRef.doc('test').get()).toAllow();
  });

  test('pass when writing my profile', async () => {
    const db = await setup(user);

    const userRef = db.collection('user');

    await expect(userRef.doc('test').set({})).toAllow();
  });

  test('fail when writing someone else\'s profile', async () => {
    const db = await setup(user);

    const userRef = db.collection('user');

    await expect(userRef.doc('other').set({})).toDeny();
  });
});
