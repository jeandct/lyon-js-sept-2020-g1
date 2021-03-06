import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FavoritesContext } from '../contexts/FavoritesContext';

const useStyles = makeStyles({
  root: {
    width: 375,
    overflow: 'hidden',
    margin: '15px',
    '@media screen and (max-width: 340px)': {
      margin: '15px 5px',
    },
    height: '410px',
    justifyContent: 'center',
    opacity: 0.9,
  },

  linkToRecipe: {
    cursor: 'pointer',
    textDecoration: 'none',
  },
  iconList: {
    height: '3em',
    padding: 5,
  },
  iconBtn: {
    cursor: 'pointer',
    borderRadius: 5,
    width: '1em',
    height: '1em',
    lineHeight: '1em',
    textAlign: 'center',
    padding: 3,
    float: 'right',
    color: '#323E40',
    '&:hover': {
      color: '#D97D0D',
    },
  },
  cardContent: {
    height: '55px',
  },
  interactions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    padding: '20px 10px 5px 10px',
  },
  media: {
    minHeight: '200px',
    maxHeight: '250px',
    minWidth: '100%',
    objectFit: 'cover',
    transform: 'scale(1)',
    transition: 'all 200ms ease-in',
    '&:hover': {
      transition: 'all 200ms ease-in',
      transform: 'scale(1.05)',
    },
  },
});

export default function AffichageRecettes({
  image,
  titre,
  id,
  otherIngredients,
}) {
  const classes = useStyles();

  const { favorites, toggleFavorites } = useContext(FavoritesContext);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={`/recipe/${id}`}>
          <CardContent className={classes.cardContent}>
            <Typography
              variant="h5"
              component="h2"
              style={{
                textAlign: 'center',
                fontSize: titre.length < 40 ? '24px' : '20px',
              }}
            >
              {titre}
            </Typography>
          </CardContent>

          <CardMedia
            className={classes.media}
            component="img"
            alt="photo of the recipe"
            image={image}
            objectfit="cover"
            title="photo of recipe"
          />
        </Link>
        <div className={classes.interactions}>
          <div style={{ color: 'black', minWidth: '190px' }}>
            {otherIngredients && `${otherIngredients} other ingredients`}
          </div>
          {favorites[id] ? (
            <FavoriteIcon
              style={{ color: '#D97D0D' }}
              onClick={() => toggleFavorites(id)}
            />
          ) : (
            <FavoriteBorderIcon onClick={() => toggleFavorites(id)} />
          )}
        </div>
      </CardActionArea>
    </Card>
  );
}
