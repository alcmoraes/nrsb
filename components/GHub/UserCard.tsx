import React, { useEffect, useState } from 'react';
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

const UserCard: React.FC<UserCardProps> = ({ t, username }: UserCardProps) => {
  const UserCardService = new UserCardServices();
  const [user, setUser] = useState(new GHUser());
  const [error, setError] = useState(null);

  useEffect(() => {
    UserCardService.getGithubUserByUsername(username).then(setUser).catch(setError);
  }, [username]);

  return (
    <Card css={styles.Root}>
      <CardActionArea>
        {user.id ? <CardMedia css={styles.Media} image={user.avatar_url} title={user.name} /> : null}
        <CardContent>
          {user.id ? (
            <>
              <Typography gutterBottom variant='h5' component='h2'>
                {user.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {user.location}
              </Typography>
            </>
          ) : error ? (
            <Box textAlign='center'>{error.message}</Box>
          ) : (
            <Box textAlign='center'>
              <CircularProgress />
            </Box>
          )}
        </CardContent>
      </CardActionArea>
      {user.id ? (
        <CardActions>
          <Button target='_blank' href={user.html_url} size='small' color='primary'>
            {t('go_to_github')}
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default withTranslation('components/ghub/user-card')(UserCard);
