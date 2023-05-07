import React, { memo, useEffect, useMemo, useState } from 'react';
import { useTickets } from '../../context/ticket';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';
import { STATUS_SELECT_OPTIONS, TicketStatus } from '../../constants/ticket';
import StatusSelect from './StatusSelect';
import UpdateTicketFormModal from './UpdateTicketFormModal';
import { useModal } from '../../context/modal';
import { StatusSelectOption } from '../../types/inputs';
import { MDBTextArea } from 'mdb-react-ui-kit';
import { useUser } from '../../context/user';
import CommentsList from '../CommentsList/CommentsList';

const getCurrentValue = (ticketStatus: TicketStatus = TicketStatus.OPEN) =>
  STATUS_SELECT_OPTIONS.find(({ name }) => name === ticketStatus) || STATUS_SELECT_OPTIONS[0];

const UpdateTicketSideView = () => {
  const { user } = useUser();
  const { fetchTicket, currentTicket, updateTicket, addCommentToTicket } = useTickets();
  const { setIsUpdateTicketModalOpened } = useModal();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [content, setContent] = useState('');

  const { projectId, ticketId } = useParams();
  const navigate = useNavigate();

  const selectedStatus = useMemo(() => getCurrentValue(currentTicket?.status), [currentTicket]);

  const handleUpdateStatus = async (option: StatusSelectOption) => {
    try {
      setIsUpdating(true);

      await updateTicket({ status: option.name }, projectId);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCommentTicket = async () => {
    if (!user || !content) return;

    setIsCommenting(true);

    try {
      await addCommentToTicket({ content, user: user._id }, projectId);

      setContent('');
    } finally {
      setIsCommenting(false);
    }
  };

  const navigateToTicket = () => {
    navigate(`/projects/${projectId}/${ticketId}`);
  };

  useEffect(() => {
    if (!projectId || !ticketId) return;

    fetchTicket(projectId, ticketId);
  }, []);

  return !!currentTicket ? (
    <>
      <div className="w-50">
        <Card>
          <Card.Body>
            <div>
              {`Go to ticket - `}

              <Link to={`/projects/${projectId}/${currentTicket._id}`} className="list-unstyled text-primary">
                {currentTicket.name}
              </Link>
            </div>

            <Badge bg="" text="dark">
              Status
            </Badge>

            <div className="d-flex gap-1">
              <StatusSelect value={selectedStatus} options={STATUS_SELECT_OPTIONS} onSelect={handleUpdateStatus} disabled={isUpdating} />
            </div>

            <hr />

            <Badge bg="" text="dark">
              {`Assignee : ${currentTicket.assignee?.email ?? 'No assignee'}`}
            </Badge>

            <hr />

            <Badge bg="" text="dark">
              Name
            </Badge>

            <h2>
              <Badge bg="light" text="dark" className="w-100 text-start">
                {currentTicket.name}
              </Badge>
            </h2>

            <hr />

            <Badge bg="" text="dark">
              Description
            </Badge>

            <Badge bg="light" text="dark" className="w-100 text-start fw-normal hover-shadow">
              {currentTicket.description}
            </Badge>

            <hr />

            <Button variant="primary" size="sm" onClick={() => setIsUpdateTicketModalOpened(true)}>
              Update ticket
            </Button>

            <hr />

            <div>Comment</div>

            <MDBTextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              wrapperClass="mb-1 w-100"
              className="orm-control form-control-sm"
              id="formControlLg"
            />

            <div className="d-flex justify-content-end mb-2">
              <Button variant="primary" size="sm" onClick={handleCommentTicket} disabled={isCommenting}>
                Comment
              </Button>
            </div>

            <CommentsList comments={currentTicket.comments} />
          </Card.Body>
        </Card>
      </div>

      <UpdateTicketFormModal />
    </>
  ) : null;
};

export default memo(UpdateTicketSideView);
