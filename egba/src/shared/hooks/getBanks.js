import { useState, useEffect } from 'react';
import { BANKS_URL } from 'constants';
import { request } from 'shared/api/utils';

const useGetBanks = () => {
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState(null);

  const getBanks = async () => {
    try {
      const data = await request('get', BANKS_URL);
      const response = await data.json();
      setBanks(response);
    } catch (error) {
      console.log(error, 'Error fetching banks: ');
    }
    setLoading(false)
  }

  useEffect(() => {
    getBanks();
    return () => getBanks;
  }, []);

  return [banks, loading];
}

export default useGetBanks;
