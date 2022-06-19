import styled from 'styled-components';

import Drag from '../../components/tools/Drag';

const ComponentsListItem = ({ component: Component }) => (
  <Drag component={Component}>
    {({ ref }) => (
      <Wrapper ref={ref}>
        <Component item={Component.item} />
      </Wrapper>
    )}
  </Drag>
);

export default ComponentsListItem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0.7;
  padding: 20px 0;

  :hover {
    cursor: grab;
    opacity: 1;
  }
`;
