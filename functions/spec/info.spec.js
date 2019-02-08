const { setup, teardown } = require('./helpers');

describe('Info rules for Anon', () => {
  let db;
  let ref;
  // Applies only to tests in this describe block
  beforeAll(async () => {
    db = await setup();
    // Allow rules in place for this collection
    ref = db.collection('info');
  });

  afterAll(async () => {
    await teardown();
  });

  test('anonymous succeeds when reading the info collection', async () => {
    await expect(ref.get()).toAllow();
  });

  test('anonymous fails when writing the info collection', async () => {
    await expect(ref.add({})).toDeny();
  });
});

describe('Info rules for Comms', () => {
  let db;
  let ref;

  // Applies only to tests in this describe block
  beforeAll(async () => {
    db = await setup({ uid: 'commsPerson', email: 'commsPerson@puzzledpint.org', Comms: true });

    ref = db.collection('info');
  });

  afterAll(async () => {
    await teardown();
  });

  test('Comms succeeds when reading the info collection', async () => {
    await expect(ref.get()).toAllow();
  });

  test('Comms succeeds when writing the info collection', async () => {
    await expect(
      ref.doc('test').set({})
      ).toAllow();
  });
});
