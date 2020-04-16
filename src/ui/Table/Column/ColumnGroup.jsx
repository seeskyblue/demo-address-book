import React from 'react';
import PropTypes from 'prop-types';

const ColumnContext = React.createContext();

export function useColumnContext() {
  return React.useContext(ColumnContext);
}

export default function ColumnGroup(props) {
  const { title, children } = props;
  const contextValue = useContextValue();
  useParentContext(title, contextValue);

  return (
    <ColumnContext.Provider value={contextValue}>
      {children}
    </ColumnContext.Provider>
  );
}

ColumnGroup.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

function useParentContext(title, currentContext) {
  const parentContext = useColumnContext();

  React.useEffect(() => {
    if (!parentContext) return;

    const { register, unregister } = parentContext;
    const { column, order } = currentContext;

    register(title, { column, order });

    return () => {
      unregister(title);
    };
  }, [currentContext, parentContext, title]);
}

function useContextValue() {
  const [column, setColumn] = React.useState();
  const [order, setOrder] = React.useState([]);

  return React.useMemo(
    () => ({
      column,
      order,
      register: (name, data) => {
        setOrder((prevState) => [...prevState, name]);
        setColumn((prevState) => ({ ...prevState, [name]: data }));
      },
      unregister: (name) => {
        setOrder((prevState) =>
          prevState.filter((registeredName) => registeredName !== name)
        );
        setColumn((prevState) => {
          const registeredNames = Object.keys(prevState);
          return registeredNames.includes(name)
            ? registeredNames.reduce((nextState, registeredName) => {
                if (registeredName !== name)
                  nextState[registeredName] = prevState[registeredName];
                return nextState;
              }, {})
            : prevState;
        });
      },
    }),
    [column, order]
  );
}
