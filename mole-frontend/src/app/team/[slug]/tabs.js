'use client'
import { useState } from 'react';
import PlayerList from '@/components/playerList';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StandingTable from '@/components/standingTable';

export default function TeamTabs(props){
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <Box sx={{ margin: '10px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="tab squadra" variant="scrollable" scrollButtons="auto">
                <Tab label={"Torneo"} {...a11yProps(0)} />
                <Tab label={"Rosa giocatori"} {...a11yProps(1)} />
                <Tab label="News" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={1}>
                <PlayerList playerList={props.playerList} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={0}>
                <StandingTable title={props.league.name} small/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Typography>News</Typography>
            </CustomTabPanel>
        </Box>
    );
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `pannello tab-${index}`,
    };
  }
  
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };