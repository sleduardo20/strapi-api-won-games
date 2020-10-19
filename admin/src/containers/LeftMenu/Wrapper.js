import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  float: left;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({theme}) => theme.main.sizes.leftMenu.width};
  background: ${({theme}) => theme.main.colors.won.blueLight};

  /* scrollbar overrides */
  * {
    ::-webkit-scrollbar {
      width: 7px;
    }

    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-track:hover {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({theme}) => theme.main.colors.leftMenu['title-color']};
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: ${({theme}) => theme.main.colors.leftMenu['link-color']};
    }

    /* firefox */
    scrollbar-color: ${({theme}) => theme.main.colors.leftMenu['title-color']} transparent;
  }
`;

export default Wrapper;
