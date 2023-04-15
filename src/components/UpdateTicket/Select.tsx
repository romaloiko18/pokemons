import React, { FC, memo } from 'react';
import { Badge, Dropdown } from 'react-bootstrap';
import { StatusSelectOption } from '../../types/inputs';

type Props = {
  options: StatusSelectOption[];
  value: StatusSelectOption;
  onSelect: (value: StatusSelectOption) => Promise<void>;
  disabled?: boolean;
};

const StatusSelect: FC<Props> = ({ options, value, onSelect }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle className="border-0" variant="" id="dropdown-basic" size="sm">
        <Badge bg={value.bg} text={value?.text}>
          {value.name.split('_').join(' ').toLowerCase()}
        </Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-0 border-0">
        {options.map(
          (option) =>
            option.name !== value.name && (
              <Dropdown.Item onClick={() => onSelect(option)} className="p-0">
                <Badge bg={option.bg} text={option?.text}>
                  {option.name.split('_').join(' ').toLowerCase()}
                </Badge>
              </Dropdown.Item>
            )
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default memo(StatusSelect);
