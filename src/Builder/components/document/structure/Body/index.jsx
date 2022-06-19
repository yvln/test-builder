import styled from 'styled-components';

import Drop from '../../../tools/Drop';

const Body = ({ children, item }) => (
  <Drop body={item}>
    {({ ref }) => (
      <StyleBody ref={ref} $attributes={item.attributes}>
        {children}
      </StyleBody>
    )}
  </Drop>
);

Body.componentLabel = 'Body';
Body.componentType = 'structure';
Body.canBeListed = false;

Body.item = {
  label: Body.componentLabel,
  type: Body.componentType,
};

export default Body;

const StyleBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`;
