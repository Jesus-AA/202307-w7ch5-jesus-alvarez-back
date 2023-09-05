describe('Given the function dbConnect', () => {
  jest.mock('mongoose', () => ({
    connect: jest.fn(),
  }));
  const mongoose = require('mongoose');
  const { dbConnect } = require('./db.connect.ts');
  describe('When i instance it', () => {
    process.env.DB_USER = 'testUser';
    process.env.DB_PASSWD = 'testPasswd';
    it('should call mongoose.connect with the correct URI', () => {
      dbConnect();
      expect(mongoose.connect).toHaveBeenCalled();
    });
  });
});
