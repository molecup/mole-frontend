'use client'
import { useState, useEffect } from 'react';
import PlayerList from '@/components/playerList';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StandingTable from '@/components/standingTable';

export default function TabLayout(props){
    const {children, labels} = props;
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <Box sx={{ margin: '10px', display:"flex", flexDirection: 'column', minHeight: '50vh', }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="tab squadra" variant="scrollable" scrollButtons="auto">
                    {labels.map((label, i) => 
                        <Tab key={i} label={label} {...a11yProps(i)} />
                    )}
                </Tabs>
            </Box>
            {children.map((child, i) => 
                <CustomTabPanel key={i} value={value} index={i}>
                    {child}
                </CustomTabPanel>
            )}
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