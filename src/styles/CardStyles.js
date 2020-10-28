import { makeStyles } from '@material-ui/core/styles'

export const useStylesSm = makeStyles((theme) => ({
  root: {
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
    paddingTop: 0,
    paddingBot: 0,
  },
  caption: {
    fontSize: theme.typography.htmlFontSize, //16
    fontWeight: theme.typography.fontWeightBold, //700
    color: 'rgba(0,0,0,0.6)',
  },
}))

export const useStylesMd = makeStyles((theme) => ({
  root: {
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
  caption: {
    fontSize: theme.typography.htmlFontSize, //16
    color: 'rgba(0,0,0,0.6)',
  },
}))

export const useStylesTrailer = makeStyles((theme) => ({
  root: {
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
    wordWrap: 'break-word',
  },
  caption: {
    fontSize: theme.typography.htmlFontSize, //16
    color: 'rgba(0,0,0,0.6)',
  },
}))

export const useStylesPerson = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0px',
    marginTop: '20px',
  },
  cardMedia: {
    width: '235px',
    height: '235px',
  },
  cardContent: {
    flexGrow: 1,
    wordWrap: 'break-word',
  },
  caption: {
    fontSize: theme.typography.htmlFontSize, //16
    color: 'rgba(0,0,0,0.6)',
  },
}))

export const useStylesDisplay = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    minWidth: 300,
    marginLeft: 40,
  },
  media: {
    height: 450,
  },
}))
