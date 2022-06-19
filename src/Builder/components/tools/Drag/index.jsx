import { useDrag } from 'react-dnd';

const Drag = ({ component, children }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      item: component.item,
      label: component.componentLabel,
      type: component.componentType,
    },
    type: component.componentType,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return children({ ref: dragRef, isDragging });
};

export default Drag;
