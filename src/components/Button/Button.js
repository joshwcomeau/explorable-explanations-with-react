import styled from 'styled-components';

import { COLORS } from '../../constants';

export default styled.button`
  font-family: inherit;
  width: calc(50% - 5px);
  border-radius: 4px;
  border: none;
  border-bottom: 3px solid rgba(0, 0, 0, 0.25);
  margin-bottom: 5px;
  margin-right: 5px;
  font-size: 21px;
  padding: 8px;
  outline: none;
  color: ${props => (props.isSelected ? COLORS.white : COLORS.gray[700])};
  background: ${props =>
    props.isSelected
      ? `linear-gradient(${COLORS.blue[500]}, ${COLORS.blue[700]})`
      : COLORS.gray[200]};
`;
