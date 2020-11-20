import { makeStyles } from '@material-ui/core/styles'

export const useStylesSm = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
    borderRadius: 5,
    marginTop: 20,
    width: 150,
    height: 387,
  },
  cardMedia: {
    width: 150,
    height: 225,
  },
  cardContent: {
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
    marginLeft: 20,
    borderRadius: 5,
    marginTop: 20,
    width: 206,
    height: 406,
  },
  cardMedia: {
    width: 206,
    height: 312,
  },
  cardContent: {},
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
    marginLeft: 20,
    borderRadius: 5,
    marginTop: 20,
    width: 206,
    height: 450,
  },
  cardMedia: {
    width: 206,
    height: 312,
  },
  cardContent: {
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
    marginTop: 20,
  },
  cardMedia: {
    width: 235,
    height: 235,
  },
  cardContent: {
    wordWrap: 'break-word',
  },
  caption: {
    fontSize: theme.typography.htmlFontSize, //16
    color: 'rgba(0,0,0,0.6)',
  },
}))

export const useStylesDisplay = makeStyles((theme) => ({
  root: {
    width: 300,
    marginLeft: 40,
    height: 450,
    minWidth: 280,
    flexShrink: 1,
  },
  media: {
    height: 450,
  },
}))
