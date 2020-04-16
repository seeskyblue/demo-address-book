import PropTypes from 'prop-types';

export default function ColumnGroup(props) {
  const { children } = props;
  return children;
}

ColumnGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  title: PropTypes.string,
};
