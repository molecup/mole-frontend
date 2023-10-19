/*
    source: https://mui.com/material-ui/react-tabs/
*/

'use client'
import { useState } from 'react';
import PlayerList from '@/components/playerList';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StandingTable from '@/components/standingTable';



export default function MatchTabs(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: '10px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tab rose" variant="scrollable" scrollButtons="auto">
          <Tab label={"Rosa " + props.teamA.name} {...a11yProps(0)} />
          <Tab label={"Rosa " + props.teamB.name} {...a11yProps(1)} />
          <Tab label={props.league.name} {...a11yProps(2)} />
          <Tab label="News" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PlayerList playerList={props.teamA.playerList} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PlayerList playerList={props.teamB.playerList} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <StandingTable title={props.league.name} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
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
