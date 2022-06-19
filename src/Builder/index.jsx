import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { blankDocument } from './helpers/blankDocument';
import { BuilderProvider } from './contexts/BuilderContext';
import Layout from './Layout';

const Builder = ({ components, onChange }) => {
  const handleChange = ({ newDocument }) => {
    onChange?.({ newDocument });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <BuilderProvider
        components={components}
        document={blankDocument}
        onChange={handleChange}
      >
        <Layout />
      </BuilderProvider>
    </DndProvider>
  );
};

export default Builder;
