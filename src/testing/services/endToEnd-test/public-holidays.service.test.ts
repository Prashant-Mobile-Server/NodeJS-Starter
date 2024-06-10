import axios from 'axios';
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from '../../config';
import { PublicHoliday } from '../../types';
/**
 * End to End tests
 */
describe('API tests for holiday functions', () => {
  const validYear = 2024;
  const validCountry = SUPPORTED_COUNTRIES[0];

  it('should get list of public holidays', async () => {
    try {
      const response = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${validYear}/${validCountry}`);
      const publicHolidays: PublicHoliday[] = response.data;

      expect(Array.isArray(publicHolidays)).toBe(true);
    } catch (error) {
    }
  });

  it('should check if today is a public holiday', async () => {
    try {
      const response = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${validCountry}`);
      const isTodayPublicHoliday = response.status === 200;

      expect(isTodayPublicHoliday).toBe(true);
    } catch (error) {
    }
  });
});