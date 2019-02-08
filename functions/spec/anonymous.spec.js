const { setup, teardown } = require('./helpers');
const { assertFails, assertSucceeds } = require('@firebase/testing');

describe('Database rules', () => {
  let db;
  let ref;

  // Applies only to tests in this describe block
  beforeAll(async () => {
    db = await setup();
  });

  afterAll(async () => {
    await teardown();
  });

  test('fail when reading/writing an unauthorized collection', async () => {
    ref = db.collection('some-nonexistent-collection');

    await expect(ref.get()).toDeny();
  });
});
