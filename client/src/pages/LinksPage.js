import React, { useContext, useState, useCallback, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
  const [links, setLinks] = useState([]);

  const {request, loading} = useHttp();

  const {token} = useContext(AuthContext);

  const getLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link/', 'GET', null, {Authorization: `Bearer ${token}`});
      setLinks(fetched);
    } catch (error) {}
  }, [request, token]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if(loading) {
    return <Loader />
  }


  return (
    <>
    {!loading && <LinksList links={links}/>}
    </>
  );
}