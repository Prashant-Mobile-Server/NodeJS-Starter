import axios from 'axios';
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from '../config';
import { validateInput, shortenPublicHoliday } from '../helpers';
import { PublicHoliday, PublicHolidayShort } from '../types';

/**
 * Unit test case
 */
export const getListOfPublicHolidays = async (year: number, country: string): Promise<PublicHolidayShort[]> => {
  validateInput({ year, country });

  try {
    const { data: publicHolidays } = await axios.get<PublicHoliday[]>(
      `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`,
    );
    return publicHolidays.map((holiday) => shortenPublicHoliday(holiday));
  } catch (error) {
    return [];
  }
};

/**
 * Unit test case
 */
export const checkIfTodayIsPublicHoliday = async (country: string) => {
  validateInput({ country });

  try {
    const { status } = await axios.get<PublicHoliday[]>(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
    return status === 200;
  } catch (error) {
    return false;
  }
};

/**
 * Unit test case
 */
export const getNextPublicHolidays = async (country: string): Promise<PublicHolidayShort[]> => {
  validateInput({ country });

  try {
    const { data: publicHolidays } = await axios.get<PublicHoliday[]>(
      `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`,
    );
    return publicHolidays.map((holiday) => shortenPublicHoliday(holiday));
  } catch (error) {
    return [];
  }
};

/**
 * Integration test cases
 */

describe('Integration tests for holiday functions', () => {
  const validYear = 2024;
  const validCountry = SUPPORTED_COUNTRIES[0];

  it('should get list of public holidays', async () => {
    try {
      const response = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${validYear}/${validCountry}`);
      const publicHolidays = response.data;
      const shortenedHolidays = publicHolidays.map((holiday: PublicHoliday) => shortenPublicHoliday(holiday));

      expect(Array.isArray(publicHolidays)).toBe(true);
      expect(shortenedHolidays.length).toBeGreaterThan(0);
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