import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    width: 300
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    marginTop: 0,
    border: 'none'
  },
  expander: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 15,
    border: '2px solid green',
    borderRadius: 5,
    padding: 15,
    position: 'absolute',
    width: 300,
    backgroundColor: 'white',
    zIndex: 100
  },
  item: {
    height: 25,
    '&:hover': {
      backgroundColor: '#888'
    }
  },
  error: {
    color: 'red',
    margin: 0
  }
}))
