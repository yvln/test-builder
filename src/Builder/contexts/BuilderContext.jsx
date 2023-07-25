import { debounce, get, set, update } from 'lodash';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { assignPath, createNewItem } from '../utils/item';

const BuilderContext = createContext({});

export const BuilderProvider = ({ children, document, onChange }) => {
  const [fullDocument, setFullDocument] = useState(createNewItem(document));
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [paths, setPaths] = useState(assignPath(fullDocument));

  const queuesRef = useRef([]);

  const getPath = useCallback((id) => paths[id], [paths]);

  const treatQueue = debounce(() => {
    const newFullDocument = queuesRef.current.reduce(
      (result, { path, updater }) => update(result, path, updater),
      fullDocument,
    );

    queuesRef.current = [];

    handleSetFullDocument(newFullDocument);
  }, 10);

  const handleUpdateItem = useCallback(
    ({ path, updater }) => {
      queuesRef.current.push({
        path,
        updater,
      });

      treatQueue();
    },
    [treatQueue],
  );

  const handleAddItem = useCallback(
    ({ parentId, item }) =>
      handleUpdateItem({
        path: getPath(parentId),
        updater: (parentItem) => {
          parentItem.children = [...parentItem.children, item];

          return parentItem;
        },
      }),
    [getPath, handleUpdateItem],
  );

  const handleDeleteItem = useCallback(
    ({ parentId, item }) =>
      handleUpdateItem({
        path: getPath(parentId),
        updater: (parentItem) => {
          parentItem.children = parentItem.children.filter(childItem => childItem.id !== item.id)

          return parentItem;
        },
      }),
    [getPath, handleUpdateItem],
  );

  const handleUpdateSetting = useCallback(
    ({ id, settingKey, value }) => {
      handleUpdateItem({
        path: getPath(id),
        updater: (item) => {
          if (value === undefined) {
            delete item?.[settingKey];
          } else {
            set(item, settingKey, value);
          }

          return item;
        },
      });
    },
    [getPath, handleUpdateItem],
  );

  const getItem = useCallback(
    (id) => get(fullDocument, getPath(id)),
    [fullDocument, getPath],
  );

  const handleSetFullDocument = useCallback((newFullDocument) => {
    setPaths(assignPath(newFullDocument));

    setFullDocument({ ...newFullDocument });
  }, []);

  const handleSetSelectedItemId = useCallback(
    (itemId) => setSelectedItemId(itemId),
    [],
  );

  const selectedItem = useCallback(
    () => (selectedItemId ? getItem(selectedItemId) : null),
    [getItem, selectedItemId],
  );

  useEffect(() => {
    // Reset selectedItemId if the item don't exist anymore (only when we update fullDocument)
    if (selectedItemId) {
      const selectedItemPath = paths[selectedItemId];

      if (!selectedItemPath) {
        setSelectedItemId(null);
      }
    }
  }, [fullDocument, paths, selectedItemId]);

  useEffect(() => {
    onChange(fullDocument);
  }, [onChange, fullDocument]);

  const value = useMemo(
    () => ({
      fullDocument,
      setFullDocument: handleSetFullDocument,

      getItem,
      getPath,

      selectedItem,
      setSelectedItemId: handleSetSelectedItemId,
      selectedItemId,

      addItem: handleAddItem,
      deleteItem: handleDeleteItem,
      updateSetting: handleUpdateSetting,
    }),
    [
      fullDocument,
      handleSetFullDocument,

      getItem,
      getPath,

      selectedItem,

      handleSetSelectedItemId,
      selectedItemId,

      handleAddItem,
      handleDeleteItem,
      handleUpdateSetting,
    ],
  );

  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
};

export const useBuilderContext = () => useContext(BuilderContext);

export default BuilderContext;
