import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [link, setLink] = useState('');

  const pressHandler = async event => {
    if(event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`});
        navigate(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  }

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input 
            placeholder="Input link"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Input link</label>
        </div>
      </div>
    </div>
  );
}