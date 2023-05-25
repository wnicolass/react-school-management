import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/Global';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Gallery({ match }) {
  const dispatch = useDispatch();
  const { id = '' } = match.params;
  const [isLoading, setIsLoading] = useState(false);
  const [picture, setPicture] = useState('');

  useEffect(() => {
    (async function getData() {
      try {
        setIsLoading(true);
        const { data: student } = await axios.get(`/students/${id}`);
        const userPicture = student.Files[0]?.url || '';
        setPicture(userPicture);
        setIsLoading(false);
      } catch {
        toast.error('Failed to get image');
        setIsLoading(false);
        history.push('/');
      }
    })();
  }, [id]);

  async function handleChange(event) {
    const [pic] = event.target.files;
    const pictureURL = URL.createObjectURL(pic);

    setPicture(pictureURL);

    const formData = new FormData();
    formData.append('student_id', id);
    formData.append('picture', pic);

    try {
      setIsLoading(true);
      await axios.post(`/files/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Student picture changed successfully');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status = 0 } = err.response;
      toast.error('Failed to change picture');

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Student Pictures</Title>
      <Form>
        <label htmlFor="picture">
          {picture ? <img src={picture} alt="Student" /> : 'Select'}
          <input type="file" id="picture" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Gallery.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string || undefined,
    }).isRequired,
  }).isRequired,
};
