import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './useStyles'
import { map, filter, includes, toLower } from 'lodash'
import TextField from '@material-ui/core/TextField'
import { useOnClickOutside } from '../../utils/useOnClickOutside'
import api from '../../services/httpService'

const SearchableDropdown = ({
  options: initialOptions,
  onChange,
  fetchOptions,
  error
}) => {
  const [text, setText] = useState('')
  const [options, setOptions] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef()

  useOnClickOutside(wrapperRef, () => setExpanded(false))

  useEffect(() => {
    if (!expanded) return

    const setOptionsFromProps = () => {
      const filtered = filter(initialOptions, x =>
        includes(toLower(x.value), toLower(text))
      )
      setOptions(filtered)
    }

    const setOptionsFromApi = async () => {
      setOptions([])
      const { url, params, formatter = x => x } = fetchOptions

      setLoading(true)
      const { data } = await api.get(`${url}?text=${text}`)
      setLoading(false)

      const formatted = map(data, formatter)
      setOptions(formatted)
    }

    if (initialOptions) setOptionsFromProps()
    else setOptionsFromApi()
  }, [text, initialOptions, expanded])

  const toogle = () => {
    setExpanded(prev => !prev)
  }

  const onTextChange = e => {
    setText(e.target.value)
    onChange(null)
  }

  const onItemSelected = item => {
    onChange(item)
    setText(item.value)
    toogle()
  }

  const classes = useStyles()

  return (
    <div ref={wrapperRef} className={classes.wrapper}>
      <div className={classes.header}>
        <TextField
          inputRef={input => expanded && input && input.focus()}
          root={classes.textField}
          label='Some Label'
          fullWidth={true}
          value={text}
          onChange={onTextChange}
          onClick={() => setExpanded(true)}
        />
        {expanded ? (
          <i className='fas fa-chevron-up' onClick={toogle} />
        ) : (
          <i className='fas fa-chevron-down' onClick={toogle} />
        )}
      </div>

      {error && !expanded && <p className={classes.error}>{error}</p>}

      {expanded && (
        <div className={classes.expander}>
          {loading && <p>Loading...</p>}
          {map(options, x => (
            <div
              className={classes.item}
              key={x.id}
              onClick={() => onItemSelected(x)}
            >
              {x.value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchableDropdown
