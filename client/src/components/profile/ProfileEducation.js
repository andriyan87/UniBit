import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description }
}) => (
  <div>
    <h3 className="text-dark">{school}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : 'Now'}
    </p>
    <p>
      <strong>Научна степен: </strong> {degree}
    </p>
    <p>
      <strong>Поле на обучение: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Описание: </strong> {description}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
