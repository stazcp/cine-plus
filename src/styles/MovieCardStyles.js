import { makeStyles } from '@material-ui/core/styles';

export const useStylesSm = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    borderRadius: '5px',
    marginTop: '20px',
  },
  cardMedia: {
    width: '150px',
    height: '225px',
  },
  cardContent: {
    flexGrow: 1,
  },
  link: {
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '1',
  },
  caption: {
    fontSize: '16px',
    fontWeight: '400',
    color: 'rgba(0,0,0,0.6)',
  },
}));

export const useStylesMd = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    borderRadius: '5px',
    marginTop: '20px',
  },
  cardMedia: {
    width: '206px',
    height: '312px',
  },
  cardContent: {
    flexGrow: 1,
  },
  link: {
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '1',
  },
  caption: {
    fontSize: '16px',
    fontWeight: '400',
    color: 'rgba(0,0,0,0.6)',
  },
}));

