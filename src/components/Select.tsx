import React, { FC, memo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { SelectOption } from '../types/inputs';

type Props = {
  options: SelectOption[];
  value: SelectOption;
  onSelect?: (value: SelectOption) => void;
  disabled?: boolean;
};

const Select: FC<Props> = ({ options, value, onSelect }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle className="border-0" variant="" id="dropdown-basic" size="sm">
        {value.name}
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-0 border-0">
        {options.map(
          (option) =>
            option.name !== value.name && (
              <Dropdown.Item onClick={() => !!onSelect && onSelect(option)} className="p-0">
                {option.name}
              </Dropdown.Item>
            )
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default memo(Select);
