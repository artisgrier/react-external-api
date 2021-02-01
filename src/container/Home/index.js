import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Grid,
  Card,
  CardContent,
  Container,
} from '@material-ui/core';
import InfoBox from '../../components/InfoBox';
import Table from '../../components/Table';
import LineGraph from '../../components/LineGraph';
import Map from '../../components/Map';
import { sortData, prettyPrintStat } from '../../utils';
import './index.css';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldWide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 28.7041, lng: 77.1025 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] = useState('cases');

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountries();
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url =
      countryCode === 'worldWide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        console.log(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid container item lg={8} md={12} sm={12} /*Margin left for bottom */>
          <Grid
            container
            item
            lg={12}
            justify='space-evenly'
            alignItems='center'
          >
            <h1>Corona virus tracker</h1>
            <FormControl className='app_dropdown'>
              <Select
                variant='outlined'
                onChange={onCountryChange}
                value={country}
              >
                <MenuItem value='worldWide'>WorldWide</MenuItem>
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid container item lg={12} justify='space-around' spacing={1}>
            <InfoBox
              onClick={() => setCaseType('cases')}
              title='Coronavirus Cases'
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />
            <InfoBox
              onClick={() => setCaseType('recovered')}
              title='Recovered'
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />
            <InfoBox
              onClick={() => setCaseType('deaths')}
              title='Deaths'
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </Grid>
          <Grid
            lg={12}
            md={12}
            sm={12}
            item
            className='map'
            // alignItems='center'
            // justify='center'
          >
            <Map
              caseType={caseType}
              countries={mapCountries}
              center={mapCenter}
              zoom={mapZoom}
            />
          </Grid>
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <Card>
            <CardContent>
              <h3>Live Cases By Country</h3>
              <Table countries={tableData} />
              <h3>World Wide {caseType}</h3>
              <LineGraph caseType={caseType} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
