import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { map, filter, includes, toLower, identity } from 'lodash'
import { useOnClickOutside } from '../../utils/useOnClickOutside'
import api from '../../services/httpService'
import {
  Expander,
  Item,
  Error,
  Input,
  Wrapper,
  Header,
  ArrowWrapper,
  LoadingItem
} from './SearchableDropdown.styled'

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
  const inputRef = useRef()

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
      const { url, params, formatter = identity } = fetchOptions

      setLoading(true)
      const { data } = await api.get(`${url}?text=${text}`, { params })
      setLoading(false)

      const formatted = map(data, formatter)
      setOptions(formatted)
    }

    if (initialOptions) setOptionsFromProps()
    else setOptionsFromApi()
  }, [text, initialOptions, expanded, fetchOptions])

  const toogle = () => {
    !expanded && inputRef && inputRef.current && inputRef.current.focus()
    setExpanded(prev => !prev)
  }

  const onTextChange = e => {
    setText(e.target.value)
  }

  const onItemSelected = item => {
    onChange(item)
    setText(item.value)
    toogle()
  }

  return (
    <Wrapper ref={wrapperRef}>
      <Header>
        <Input
          ref={inputRef}
          value={text}
          onChange={onTextChange}
          onClick={() => setExpanded(true)}
        />
        {expanded ? (
          <ArrowWrapper className='fas fa-chevron-up' onClick={toogle} />
        ) : (
          <ArrowWrapper className='fas fa-chevron-down' onClick={toogle} />
        )}
      </Header>

      {error && !expanded && <Error>{error}</Error>}

      {expanded && (
        <Expander>
          {loading && <LoadingItem className='fas fa-spinner fa-3x fa-spin' />}
          {map(options, x => (
            <Item key={x.id} onClick={() => onItemSelected(x)}>
              {x.value}
            </Item>
          ))}
        </Expander>
      )}
    </Wrapper>
  )
}

SearchableDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  fetchOptions: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape(),
    formatter: PropTypes.func
  }),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

export default SearchableDropdown
