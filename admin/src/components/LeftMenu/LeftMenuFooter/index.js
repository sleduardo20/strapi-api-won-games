import React from 'react';
import Wrapper from './Wrapper';

function LeftMenuFooter() {
  return (
    <Wrapper>
      <div className="poweredBy">
        Powered by
        <a key="website" href="https://reactavancado.com.br/" target="_blank" rel="noopener noreferrer">
          React Avançado
        </a>

      </div>
    </Wrapper>
  );
}

export default LeftMenuFooter;
