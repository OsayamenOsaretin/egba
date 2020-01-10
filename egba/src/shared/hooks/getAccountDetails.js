import { useState, useEffect } from 'react';
import { USER_DETAILS_URL } from 'constants';


const useGetAccountDetails = (number) => {
  const [loading, setLoading] = useState(true);
  const [userAccount, setUserAccount] = useState(null);

  const fetchUserAccountData = async () => {
    try {
      console.log('user details url', USER_DETAILS_URL);
      const data = await fetch(`${USER_DETAILS_URL}${number}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const response = await data.json();
      console.log(JSON.stringify(response), 'user bank info');
      setUserAccount(response);
    } catch (error) {
      console.log(error, 'the fetch error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserAccountData();
  }, [number]);

  return [userAccount, loading];
}

export default useGetAccountDetails;
