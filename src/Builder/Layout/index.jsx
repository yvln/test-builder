import styled from 'styled-components';

import { VerticalDivider } from '../components/ui/VerticalDivider';
import Panel from './Panel';
import WorkSpace from './WorkSpace';

const Layout = () => (
  <Wrapper>
    <Content>
      <Panel />
      <VerticalDivider />
      <WorkSpace />
    </Content>
  </Wrapper>
);

export default Layout;

const Content = styled.div`
  display: flex;
  height: 100%;
  overflow-y: scroll;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;
