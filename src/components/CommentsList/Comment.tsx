import moment from 'moment';
import React, { FC, memo } from 'react';

type Props = {
  isRight: boolean;
  content: string;
  email: string;
  date: Date;
};

const Comment: FC<Props> = ({ isRight, content, email, date }) => {
  return (
    <div className={`d-flex flex-column justify-content-${isRight ? 'end' : 'start'}`}>
      <div className={`d-flex justify-content-between flex-row-${!isRight ? 'reverse' : ''}`}>
        <p className="text-primary text-opacity-25 text-sm-end  m-0">
          <small>{moment(date).format('DD/MM hh:mm a')}</small>
        </p>

        <h6 className={`d-flex justify-content-${isRight ? 'end' : 'start'}  m-0`}>{email}</h6>
      </div>

      <mark className="border-1 rounded p-3">
        <p className={`d-flex justify-content-${isRight ? 'end' : 'start'} m-0`}>{content}</p>
      </mark>
    </div>
  );
};

export default memo(Comment);
