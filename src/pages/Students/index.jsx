import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import axios from '../../services/axios';
import { Container } from '../../styles/Global';
import {
  StudentContainer,
  ProfilePicture,
  NewStudent,
  ContainerHeader,
} from './styled';
import * as colors from '../../config/colors';
import Loading from '../../components/Loading';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getStudents() {
      try {
        setIsLoading(true);
        const res = await axios.get('/students');
        setStudents(res.data);
        setIsLoading(false);
      } catch (err) {
        toast.error('Something went wrong while searching students data');
      }
    }

    getStudents();
  }, []);

  function handleDeleteAsk(event) {
    event.preventDefault();
    const exclamationMark = event.currentTarget.nextElementSibling;
    exclamationMark.setAttribute('display', 'block');
    event.currentTarget.remove();
  }

  async function handleDelete(event, studentId) {
    try {
      setIsLoading(true);
      await axios.delete(`/students/${studentId}`);
      event.target.closest('tr').remove();
      setIsLoading(false);
      toast.success('Student deleted successfully');
    } catch (err) {
      const { errors = [] } = err.response.data;
      if (errors.length) {
        errors.forEach((error) => toast.error(error));
      }
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <ContainerHeader>
        <h1>Students</h1>
        <NewStudent to="/student/">New Student</NewStudent>
      </ContainerHeader>
      <StudentContainer>
        <tbody>
          {students.map((student) => (
            <tr key={String(student.id)}>
              <ProfilePicture className="ProfilePic">
                {student.Files.length > 0 ? (
                  <img src={student.Files[0].url} alt={student.name} />
                ) : (
                  <FaUserCircle size={64} />
                )}
              </ProfilePicture>

              <td>{student.name}</td>
              <td>{student.email}</td>

              <td>
                <Link to={`/student/${student.id}/edit`}>
                  <FaEdit color={colors.primaryColor} size={24} />
                </Link>
              </td>
              <td>
                <Link
                  onClick={(event) => handleDeleteAsk(event)}
                  to={`/student/${student.id}/delete`}
                >
                  <FaWindowClose color={colors.primaryColor} size={24} />
                </Link>
                <FaExclamation
                  size={24}
                  display="none"
                  cursor="pointer"
                  onClick={(event) => handleDelete(event, student.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </StudentContainer>
    </Container>
  );
}
