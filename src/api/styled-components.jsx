import styled from 'styled-components';

const AppContainer = styled.div`
  background-color: ${(props) => (props.darkMode ? '#2E2E2E' : '#F7F7F7')};
  color: ${(props) => (props.darkMode ? '#FFFFFF' : '#000000')};
  height: 100vh;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  input {
    padding: 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: none;
  }
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const ToggleSwitch = styled.button`
  background-color: ${(props) => (props.darkMode ? '#4CAF50' : '#FF5722')};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
`;

const MainWeatherDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const City = styled.h1`
  font-size: 3rem;
`;

const Temperature = styled.h2`
  font-size: 4rem;
  margin-top: 20px;
`;

const WeatherDetails = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
`;

const Detail = styled.p`
  margin: 5px 0;
`;

const ForecastSection = styled.div`
  margin-top: 40px;
`;

const HourlyForecast = styled.div`
  margin-top: 40px;
`;
