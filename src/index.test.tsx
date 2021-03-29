import axios from 'axios';
import useAxiosHook from './'

jest.mock('axios');


describe('useAxiosHook', () => {
  const { isLoading, isSent, rspData, fetchData } = useAxiosHook()
  console.log(isLoading, isSent, rspData)

  it('fetches successfully data from an API', async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: '1',
            title: 'a',
          },
          {
            objectID: '2',
            title: 'b',
          },
        ],
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(fetchData('react')).resolves.toEqual(data);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(fetchData('react')).rejects.toThrow(errorMessage);
  });
});