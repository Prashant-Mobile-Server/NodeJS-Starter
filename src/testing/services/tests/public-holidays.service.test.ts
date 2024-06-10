import axios from 'axios';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from '../public-holidays.service';
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from '../../config';

jest.mock('axios');

describe('getListOfPublicHolidays function', () => {
  test('should return list of public holidays for a specific year and country', async () => {
    const year = 2024;
    const country = SUPPORTED_COUNTRIES[0];
    const publicHolidays = [{ name: 'New Year', date: '2024-01-01' }, { name: 'Christmas', date: '2024-12-25' }];
    const mockedAxiosGet = jest.spyOn(axios, 'get').mockResolvedValue({ data: publicHolidays });

    const result = await getListOfPublicHolidays(year, country);

    expect(mockedAxiosGet).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
    expect(result).toEqual([
      { name: 'New Year', date: '2024-01-01' },
      { name: 'Christmas', date: '2024-12-25' }
    ]);
  });
});

describe('checkIfTodayIsPublicHoliday function', () => {
  test('should return true if today is a public holiday in a specific country', async () => {
    const country = SUPPORTED_COUNTRIES[0];
    const mockedAxiosGet = jest.spyOn(axios, 'get').mockResolvedValue({ status: 200 });

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(mockedAxiosGet).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
    expect(result).toBe(true);
  });
});

describe('getNextPublicHolidays function', () => {
  test('should return next public holidays for a specific country', async () => {
    const country = SUPPORTED_COUNTRIES[0];
    const publicHolidays = [{ name: 'New Year', date: '2025-01-01' }, { name: 'Christmas', date: '2025-12-25' }];
    const mockedAxiosGet = jest.spyOn(axios, 'get').mockResolvedValue({ data: publicHolidays });

    const result = await getNextPublicHolidays(country);

    expect(mockedAxiosGet).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`);
    expect(result).toEqual([
      { name: 'New Year', date: '2025-01-01' },
      { name: 'Christmas', date: '2025-12-25' }
    ]);
  });
});
