import axios from 'axios';
import { IFormValues } from '../components/Form/Form'

const postEmail = async (formData: IFormValues) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = {
      "name": formData.fullName,
      "email": formData.email
  }
    // The mock API wasn't working, so i used jsonplaceholder instead
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', body, config);
    return response.status
}

export default postEmail;