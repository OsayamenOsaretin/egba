import { REGISTER_URL } from 'constants'
import { request, formatUserDetails } from 'shared/api/utils';


const useRegisteration = () => {
  const registerUser = async (userDetails) => {
    const newUserDetails = formatUserDetails(userDetails);
    try {
      const data = await request('post', REGISTER_URL, newUserDetails);
      const response = await data.json();
      return response;
    } catch (error) {
      console.log(error, 'User registeration details');
    }
    setLoading(false);
  }

  return { registerUser };
}

export default useRegisteration;
