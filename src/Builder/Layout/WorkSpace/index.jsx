import styled from 'styled-components';

import * as components from '../../components/document';
import { useBuilderContext } from '../../contexts/BuilderContext';
import { renderDocument } from '../../utils/renderDocument';

const WorkSpace = () => {
  const { fullDocument } = useBuilderContext();
  const { setSelectedItemId } = useBuilderContext();

  const handleClick = (item) => setSelectedItemId(item.id);

  return (
    <Wrapper>
      {renderDocument({
        components,
        designMode: true,
        item: fullDocument,
        handleClick,
      })}
    </Wrapper>
  );
};
export default WorkSpace;

const Wrapper = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  padding: 30px 20px;
`;
