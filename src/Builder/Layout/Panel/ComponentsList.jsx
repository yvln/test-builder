import styled from 'styled-components';

import * as components from '../../components/document';
import { HorizontalDivider } from '../../components/ui/HorizontalDivider';
import { Title } from '../../components/ui/Title';
import ComponentsListItem from './ComponentsListItem';

const ComponentsList = () => {
  const componentsMap = Object.keys(components).reduce((result, key) => {
    const component = components[key];

    if (component.canBeListed) {
      result.push(component);
    }

    return result;
  }, []);

  return (
    <Wrapper>
      <Title>Components</Title>
      <HorizontalDivider />
      {componentsMap.map((component) => (
        <ComponentsListItem
          component={component}
          key={component.componentLabel}
        />
      ))}
    </Wrapper>
  );
};

export default ComponentsList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 300px;
  padding: 30px 20px;
`;
