import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { map, filter, includes, toLower, identity } from 'lodash'
import useOnClickOutside from '../../utils/useOnClickOutside'
import useDebounce from '../../utils/useDebounce'
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
  error,
  width,
  itemRenderer,
  displayProperty = 'value'
}) => {
  const [text, setText] = useState('')
  const [options, setOptions] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef()

  const debouncedText = useDebounce(text, initialOptions ? 0 : 500)
  const wrapperRef = useOnClickOutside(() => setExpanded(false))

  useEffect(() => {
    if (!expanded) return

    const setOptionsFromProps = () => {
      const filtered = filter(initialOptions, x =>
        includes(toLower(x[displayProperty]), toLower(debouncedText))
      )
      setOptions(filtered)
    }

    const setOptionsFromApi = async () => {
      setOptions([])
      const { url, params, formatter = identity } = fetchOptions

      setLoading(true)
      const { data } = await api.get(`${url}?text=${debouncedText}`, { params })
      setLoading(false)

      const formatted = map(data, formatter)
      setOptions(formatted)
    }

    if (initialOptions) setOptionsFromProps()
    else setOptionsFromApi()
  }, [debouncedText, initialOptions, expanded, fetchOptions, displayProperty])

  const toogle = () => {
    !expanded && inputRef && inputRef.current && inputRef.current.focus()
    setExpanded(prev => !prev)
  }

  const onTextChange = e => {
    setText(e.target.value)
  }

  const onItemSelected = item => {
    onChange(item)
    setText(item[displayProperty])
    toogle()
  }

  return (
    <Wrapper ref={wrapperRef} width={width}>
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
              {itemRenderer ? itemRenderer(x) : x[displayProperty]}
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
  error: PropTypes.string,
  width: PropTypes.string,
  itemRenderer: PropTypes.func,
  displayProperty: PropTypes.string
}

export default SearchableDropdown
