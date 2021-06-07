import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';


const initialState = {
  company: '',
  website: '',
  location: '',
  contacts: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    contacts,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Промяна на профила</h1>
      <p className="lead">
        <i className="fas fa-user" /> Добави промени към профила
      </p>
      
      <small>* = Задължителни полета</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          
          <select name="status" value={status} onChange={onChange}>
            <option>* Избери професионален статус</option>
            <option value="Developer">Разработчик</option>
            <option value="Junior Developer">Junior Разработчик</option>
            <option value="Senior Developer">Senior Разработчик</option>
            <option value="Manager">Мениджър</option>
            <option value="Student or Learning">Студент или учащ</option>
            <option value="Instructor">Преподавател или инструтор</option>
            <option value="Intern">Стажант</option>
            <option value="Other">Друго</option>
          </select>
          <small className="form-text">
            Дайте ни идея къде се намирате в момента в учебния процес
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Компания"
            name="company"
            value={company}
            onChange={onChange}
          />
          <small className="form-text">
            Може да бъде ваша собствена компания или работодател
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Уебсайт"
            name="website"
            value={website}
            onChange={onChange}
          />
          <small className="form-text">
            Може да бъде ваш собствен сайт
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Местоживеене"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            Град & област (eg. гр.София, Софийска област)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Контакти"
            name="contacts"
            value={contacts}
            onChange={onChange}
          />
          <small className="form-text">
            Имейл и/или телефонен номер 
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Умения"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            Моля използвайте запетая (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />
          <small className="form-text">
            Ако имате GitHub профилно име може да го поставите тук
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Кратка биография за себе си"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Кажи нещо за себе си</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Добави социални мрежи
          </button>
          <span>Опционално</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Назад
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
