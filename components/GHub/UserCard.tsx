import React, { useEffect, useReducer } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GHUser } from '../../models';
import styles from './UserCard.style';
import { WithTranslation } from 'next-i18next';
import { withTranslation } from '../../i18n';
import { CircularProgress, Box } from '@material-ui/core';
import UserCardServices from './UserCard.services';

export interface UserCardProps extends WithTranslation {
  username: string;
}

interface State {
  user?: GHUser | null;
  error?: Error | null;
}

const UserCard: React.FC<UserCardProps> = ({ t, username }: UserCardProps) => {
  const UserCardService = new UserCardServices();
  const [state, setState] = useReducer((state: State, newState: State) => ({ ...state, ...newState }), {
    error: null,
    user: null,
  });

  useEffect(() => {
    UserCardService.getGithubUserByUsername(username)
      .then(user => setState({ user, error: null }))
      .catch(error => setState({ user: null, error }));
  }, [username]);

  return (
    <Card css={styles.Root}>
      <CardActionArea>
        {state.user?.id ? <CardMedia css={styles.Media} image={state.user.avatar_url} title={state.user.name} /> : null}
        <CardContent>
          {!state.error && state.user?.id ? (
            <>
              <Typography gutterBottom variant='h5' component='h2'>
                {state.user.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {state.user.location}
              </Typography>
            </>
          ) : (
            <Box textAlign='center'>{state.error?.message || <CircularProgress />}</Box>
          )}
        </CardContent>
      </CardActionArea>
      {state.user?.id ? (
        <CardActions>
          <Button target='_blank' href={state.user.html_url} size='small' color='primary'>
            {t('go_to_github')}
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default withTranslation('components/ghub/user-card')(UserCard);
