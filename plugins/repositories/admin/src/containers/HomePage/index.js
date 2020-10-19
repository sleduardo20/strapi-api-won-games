import React, {useState,useEffect, memo } from 'react';
import axios from 'axios';
import { Header } from '@buffetjs/custom';
import { Table } from '@buffetjs/core';

import styled from 'styled-components';

const HomePage = () => {
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    axios.get('https://api.github.com/users/sleduardo20/repos').
    then(resposne =>{ setRows(resposne.data)}).catch(error => strapi.notification.error("Aconteceu algum problema com a solicitação, aguarde 2 minutos e tente novmaente."))
  },[]);

  return (
    <Wrapper>
      <Header
        title={{ label: "React Avançado Repositories" }}
        content="A list of our repositories in React Avançado course."
      />
      <Table headers={headers} rows={rows.filter(row =>
        row.name === 'strapi-api-won-games'
      )}/>
    </Wrapper>
  );
};

export default memo(HomePage);

const Wrapper = styled.div`
  padding: 18px 30px;
  p{
    margin-top: 1rem;
  }
`;

const headers = [
  {
    name: 'Name',
    value: 'name',
  },
  {
    name: 'Description',
    value: 'description',
  },
  {
    name: 'Url',
    value: 'html_url',
  },
];

