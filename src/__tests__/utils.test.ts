import * as utils from '../utils';

describe('utils', () => {
  describe('utils#modThree()', () => {
    it('should return a correct value', () => {
      const result = utils.modThree('1101');
      expect(result).toEqual(1);
    });
  });
});
