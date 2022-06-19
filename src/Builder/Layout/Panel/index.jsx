import { useBuilderContext } from '../../contexts/BuilderContext';
import ComponentsList from './ComponentsList';
import ComponentSettings from './ComponentSettings';

const Panel = () => {
  const { getItem, selectedItemId } = useBuilderContext();
  const item = selectedItemId ? getItem(selectedItemId) : null;

  if (!item) {
    return <ComponentsList />;
  }

  return <ComponentSettings item={item} />;
};

export default Panel;
