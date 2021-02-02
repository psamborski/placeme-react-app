import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useMapPositionUpdate, useMapPolygonCoordsUpdate } from '../../app/MapContext';
import menuIcon from '../../assets/icons/menuIcon.svg';
import closeMenuIcon from '../../assets/icons/closeMenuIcon.svg';

const FormWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  top: 10px;
  right: 10px;
  z-index: 999;
  background: #fff;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 0 20px rgb(0 0 0 / 30%);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  width: 160px;
`;

const Input = styled.input`
  display: flex;
  border: 0;
  border-bottom: 1px solid #000;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 4px;
  -moz-appearance: textfield;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputLabel = styled.label`
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 8px;
`;

const ErrorMessage = styled.span`
  color: #ee4f5d;
`;

const SubmitButton = styled.button`
  font-weight: 700;
  color: #000;
  font-size: 0.9rem;
  letter-spacing: 1px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 30px;
  margin: 30px 0 0 0;
  text-transform: uppercase;
  transition: 0.3s ease;
  background: transparent;
  cursor: pointer;
  width: 100%;
  border-radius: 4px;

  &:hover {
    border-color: #442fad;
    background: #442fad;
    color: #fff;
  }
`;

const IconBox = styled.button`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 2px solid transparent;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.3s ease;

  &:hover {
    border-color: #442fad;
  }

  img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
  }
`;

const MapForm = () => {
  const [showForm, setShowForm] = useState(true);
  const { register, handleSubmit, errors } = useForm();
  const changeMapPosition = useMapPositionUpdate();
  const setPolygonCoordsData = useMapPolygonCoordsUpdate();

  const getCoordinatesData = (lat, lng) => {
    fetch(`https://devcube.placeme.pl/api/getGeoJSON?lat=${lat}&lng=${lng}`)
      .then((response) => response.json())
      .then((response) => {
        const responseCoordsData = response.coordinates[0];
        responseCoordsData.map((apiCord) => apiCord.reverse());

        setPolygonCoordsData(responseCoordsData);
      })
      .catch((error) => console.error(error));
  };

  const onSubmit = (data, e) => {
    const { lat, lng } = data;
    const latNumber = parseFloat(lat);
    const lngNumber = parseFloat(lng);

    getCoordinatesData(latNumber, lngNumber);
    changeMapPosition(latNumber, lngNumber);

    e.target.reset();
  };

  const toggleIcon = () => {
    setShowForm(!showForm);
  };

  return (
    <FormWrapper>
      <IconBox onClick={() => toggleIcon()}>
        {showForm ? (
          <img src={closeMenuIcon} alt="close menu icon" />
        ) : (
          <img src={menuIcon} alt="menu icon" />
        )}
      </IconBox>
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <InputLabel htmlFor="lat">Latitude:</InputLabel>
            <Input
              max="90"
              min="-90"
              name="lat"
              type="number"
              placeholder="0.000000"
              step="0.000001"
              ref={register({ required: true })}
            />
            {errors.lat && <ErrorMessage>This field is required</ErrorMessage>}
          </InputWrapper>

          <InputWrapper>
            <InputLabel htmlFor="lng">Longitude:</InputLabel>
            <Input
              max="180"
              min="-180"
              name="lng"
              type="number"
              placeholder="0.000000"
              step="0.000001"
              ref={register({ required: true })}
            />
            {errors.lng && <ErrorMessage>This field is required</ErrorMessage>}
          </InputWrapper>

          <SubmitButton type="submit">find</SubmitButton>
        </form>
      )}
    </FormWrapper>
  );
};

export default MapForm;
