import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container } from '../../styles/Global';
import { Form } from '../SignUp/styled';
import { ProfilePicture } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Student({ match }) {
  const dispatch = useDispatch();
  const { id = null } = match.params;
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [picture, setPicture] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }
    (async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        const studentPicture = data.Files.length > 0 ? data.Files[0].url : '';

        setPicture(studentPicture);
        setName(data.name);
        setSurname(data.surname);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const { status = 0 } = err.response;
        const { errors = [] } = err.response.data;

        if (status === 404) {
          errors.forEach((error) => toast.error(error));
        }
        history.push('/');
      }
    })();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    let formHasError = false;

    if (name.length < 2 || name.length > 255) {
      formHasError = true;
      toast.error('Name must be between 2 and 255 characters');
    }

    if (surname.length < 2 || surname.length > 255) {
      formHasError = true;
      toast.error('Name must be between 2 and 255 characters');
    }

    if (!isEmail(email)) {
      formHasError = true;
      toast.error('Invalid email');
    }

    if (!isInt(String(age))) {
      formHasError = true;
      toast.error('Age must be a number');
    }

    if (!isFloat(String(weight))) {
      formHasError = true;
      toast.error('Invalid weight');
    }

    if (!isFloat(String(height))) {
      formHasError = true;
      toast.error('Invalid height');
    }

    if (formHasError) {
      return;
    }

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/students/${id}`, {
          name,
          surname,
          email,
          age,
          height,
          weight,
        });
        toast.success('Student updated successfully');
        setIsLoading(false);
        return;
      }
      const { data: student } = await axios.post(`/students/`, {
        name,
        surname,
        email,
        age,
        height,
        weight,
      });
      toast.success('Student created successfully');
      setIsLoading(false);
      history.push(`/student/${student.id}/edit`);
      return;
    } catch (err) {
      const { status = 0 } = err.response;
      const { data = {} } = err.response;
      const { errors = [] } = data;

      if (errors.length) {
        errors.forEach((error) => toast.error(error));
      } else {
        toast.error('Unknown error');
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1 style={{ textAlign: 'center', marginBottom: '.5rem' }}>
        {id ? 'Edit Student' : 'Add Student'}
      </h1>
      {id && (
        <ProfilePicture>
          {picture ? (
            <img src={picture} alt={name} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/files/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student name"
            id="name"
          />
        </label>
        <label htmlFor="surname">
          Surname
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Student surname"
            id="surname"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Student email"
            id="email"
          />
        </label>
        <label htmlFor="age">
          Age
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Student age"
            id="age"
          />
        </label>
        <label htmlFor="weight">
          Weight
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Student weight"
            id="weight"
          />
        </label>
        <label htmlFor="height">
          Height
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Student height"
            id="height"
          />
        </label>
        <button type="submit">{id ? 'Edit' : 'Create'}</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string || undefined,
    }).isRequired,
  }).isRequired,
};
