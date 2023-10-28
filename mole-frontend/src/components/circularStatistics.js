/*
    source: https://mui.com/material-ui/react-progress/
*/

'use client'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {useState, useEffect} from 'react';

/*
    @params: 
        sx -> object: style apllied to the main container "Paper"
        statistics -> list: list of objects, each object reperesents a statistic and should define:
            value -> int: value to displat
            tot -> int: tot value to will the percentage progress will be calculated
            title -> string: title for the statistic
            hideTot -> bool: hide the total value from the statistic label. Default false
            ...otherProps -> will be applied to the CirculaProgress element
        ...otherProps -> any: other props applied to the main container "Paper"
    @render:
        An horizontal collection of circular statistics
*/
export default function CircularStatistics(props){
    const {statistics, sx, ...otherProps} = props;
    return(
        <Paper sx={{ width:"100%", padding:"10px", ...sx }} {...otherProps}>
            <Stack direction="row" spacing={5} sx={{justifyContent:"center"}}>
                {statistics.map((stat, i) => {
                    const {value, tot, title, ...otherProps} = stat;
                    return(
                        <CircularStatistic key={i} value={value} tot={tot} title={title} {...otherProps}/>
                    );
                }
                )}
            </Stack>
        </Paper>
    );
}

/*
    @params:
        value -> int: value to displat
        tot -> int: tot value to will the percentage progress will be calculated
        title -> string: title for the statistic
        hideTot -> bool: hide the total value from the statistic label. Default false
        ...otherProps -> will be applied to the CirculaProgress element
    @render: a signular circular statistic
*/
function CircularStatistic(props){
    const {value, tot, title, hideTot=false, sx, ...otherProps} = props;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        
        const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= value ? prevProgress : prevProgress + (value / 25 )));
        }, 20);
        return () => {
          clearInterval(timer);
        };
      }, []);

    const style = { 
        [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        ...sx
    }
    return(
        <Stack spacing={2} sx={{alignItems:"center"}}> 
            <Box sx={{ position: 'relative', display: 'inline-flex'}}>
                <CircularProgress variant="determinate" value={progress/tot * 100} size={70} thickness={4} sx={style} {...otherProps}/>
                <Box
                    sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                >
                    <Typography variant="button" component="div" color="text.secondary">
                    {Math.round(progress) + (hideTot? "" : `/${tot}`)}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="h5" align="center" textTransform="uppercase" >{title}</Typography>
        </Stack>
        
        
    );
}