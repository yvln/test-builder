import styled from 'styled-components';

import * as components from '../../components/document';
import { Title } from '../../components/ui/Title';
import { useBuilderContext } from '../../contexts/BuilderContext';

const ComponentSettings = ({ item }) => {
  const { setSelectedItemId, updateSetting } = useBuilderContext();

  const onChange = ({ settingKey, value }) =>
    updateSetting({ id: item.id, settingKey, value });

  const Component = components[item.label];

  return (
    <Wrapper>
      <CursorTitle onClick={() => setSelectedItemId(null)}>
        ⬅️ {item.label}
      </CursorTitle>
      <Component.Settings item={item} onChange={onChange} />
    </Wrapper>
  );
};

export default ComponentSettings;

const CursorTitle = styled(Title)`
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 300px;
  padding: 30px 20px;
`;
