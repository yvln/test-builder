import styled from 'styled-components';

const Root = ({ children }) => <ResetStyledRoot>{children}</ResetStyledRoot>;

Root.componentLabel = 'Root';
Root.componentType = 'structure';
Root.canBeListed = false;

export default Root;

const ResetStyledRoot = styled.div`
  display: flex;
  color: black;
  flex-direction: column;
  font-size: 14px;
  height: 100vh;
  width: 100%;

  *::selection {
    // selection color has to be transparent to display underline/strikethrough style on Chrome.
    background: rgba(81, 134, 236, 0.4) !important;
    color: initial !important;
  }

  a {
    // Front-Office primary color
    text-decoration: underline;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  s {
    text-decoration: line-through;
  }

  u {
    text-decoration: underline;
  }
`;
