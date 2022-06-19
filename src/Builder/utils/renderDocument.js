export const renderDocument = ({
  components,
  designMode,
  handleClick,
  item,
} = {}) => {
  const Component = components[item.label];

  if (!Component) {
    return null;
  }

  return (
    <Component
      designMode={designMode}
      item={item}
      key={item.id}
      onClick={() => handleClick(item)}
    >
      {item?.children?.length > 0
        ? item.children.map((child) =>
            renderDocument({
              components,
              designMode,
              handleClick,
              item: child,
            }),
          )
        : null}
    </Component>
  );
};
