import { useEffect } from 'react';
import { useDrop } from 'react-dnd';

import { useBuilderContext } from '../../../contexts/BuilderContext';
import { createNewItem, findItem } from '../../../utils/item';

const Drop = ({ body, children }) => {
  const { addItem, setSelectedItemId } = useBuilderContext();
  const [{ canDrop, dropResult, item }, drop] = useDrop({
    accept: ['single'],
    drop: ({ item: component }, monitor) => {
      if (monitor.didDrop() || !monitor.canDrop()) {
        return undefined;
      }

      const newItem = createNewItem(component);

      addItem({
        item: newItem,
        parentId: body.id,
      });

      setSelectedItemId(newItem.id);

      return findItem(newItem, (child) => child.type === item.type);
    },
    hover: (_, monitor) => {
      const monitorOffset = monitor.getClientOffset();

      if (!monitorOffset) {
        return undefined;
      }

      return undefined;
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      dropResult: monitor.getDropResult(),
      item: monitor.getItem()?.item,
    }),
  });

  useEffect(() => {
    if (dropResult?.id) {
      setSelectedItemId(dropResult.id);
    }
  }, [dropResult]);

  return children({
    item,
    canDrop,
    ref: drop,
  });
};

export default Drop;

Drop.defaultProps = {
  placeholderPositions: ['bottom', 'top'],
  noPlaceholder: false,
};
