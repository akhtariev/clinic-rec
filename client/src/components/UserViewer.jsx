import React from 'react';
import {Button, Grid, ListItem, List, ListItemText, Divider} from '@material-ui/core';
import TextResponse from './common/TextResponse';
import { TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import LoadingMessage from './common/LoadingMesage';
import { getUsers } from '../redux/actions/userActions';


const UserViewer = () => {
    const usersState = useSelector(state => state.users); 
    const dispatch  = useDispatch();
    const [userid, setUserid] = React.useState('');
    const getUsersOnClick = () => {
        if (!usersState.isFetchingUsers) {
        if (!usersState) {
            return <TextResponse heading='No users found.' body='Please contact administrator' />;
        }
        getUsers(dispatch, userid);
        setUserid('');
        return <LoadingMessage heading='Please wait' body='Loading users...' />;
      }
  }
  const onChangeUserid = (e) => {
      setUserid(e.target.value)
  }

 if (usersState.didInvalidateUsers) {
    return <TextResponse heading='Error getting users info from server' body='Please contact administrator.' />;
  }

  if (usersState.isFetchingUsers) {
    return <LoadingMessage heading='Please wait' body='Loading users...' />;
  }

    return (
        <div>
      <Grid container spacing={3} alignContent='center'>
        <Grid item xs={12} >
          <TextResponse heading="Find user ratings by userid"/>
        </Grid>
      </Grid> 
       <Grid container spacing={3} alignContent='center'>
        <Grid item xs={12}>
          <TextField placeholder='Userid' onChange={onChangeUserid} ></TextField>
          <Button color='primary' onClick={getUsersOnClick}> Search </Button> 
        </Grid>
      </Grid>
      <Grid container spacing={3}> 
       <Grid item xs={12}> 
       { usersState.responseData !== null && 
         <List> 
          {usersState.responseData.map((user) => (
            <>
             <ListItem button key={`${user.bill_id}`}>
                <ListItemText key={`${user.bill_id}`} primary={`${user.bill_id} | Rating: ${user.amount}`} />
             </ListItem>
             <Divider/>
             </>
          ))}
          </List> 
      }
       </Grid>
      </Grid> 
    </div>
    );
}
 
export default UserViewer; 