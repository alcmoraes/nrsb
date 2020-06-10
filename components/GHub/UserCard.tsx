import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GHUser } from '../../models';
import { Root, Media } from './UserCard.style';
import { WithTranslation } from 'next-i18next';
import { withTranslation } from '../../i18n'

interface Props extends WithTranslation {
  user:GHUser
}

class MediaCard extends React.Component<Props, {}> {

  render() {

    const { user, t } = this.props;

    return (
      user.id ? (
        <Card css={Root}>
          <CardActionArea>
            <CardMedia
              css={Media}
              image={user.avatar_url}
              title={user.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {user.location}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button target="_blank" href={user.html_url} size="small" color="primary">
              {t('go_to_github')}
            </Button>
          </CardActions>
        </Card>
      ) : null
    );
  }
}

export default withTranslation('c/ghub/user-card')(MediaCard)